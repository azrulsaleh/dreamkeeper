import { useCallback, useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import WaveSurfer from 'wavesurfer.js';
import { songs } from '../data/songs';
import { usePlayerSettingsStore } from '../store/playerSettingsStore';
import type { TransportState } from '../types';

function shuffleTrackIndexes() {
	// Shuffle indexes once so the track list stays intact while playback follows a random order.
	const indexes = songs.map((_, index) => index);
	for (let index = indexes.length - 1; index > 0; index--) {
		const swapIndex = Math.floor(Math.random() * (index + 1));
		[indexes[index], indexes[swapIndex]] = [indexes[swapIndex], indexes[index]];
	}
	return indexes;
}

export function usePlayerEngine() {
	const [playOrder] = useState<number[]>(shuffleTrackIndexes);
	const [currentSongIndex, setCurrentSongIndex] = useState(playOrder[0] ?? 0);
	const currentSongIndexRef = useRef(currentSongIndex);
	const [currentTime, setCurrentTime] = useState(0);
	const [transportState, setTransportState] = useState<TransportState>('stopped');
	const [loadedSongs, setLoadedSongs] = useState<boolean[]>(() => songs.map(() => false));
	const [loadingError, setLoadingError] = useState<string | null>(null);
	const [loadRetryCount, setLoadRetryCount] = useState(0);

	const volumes = usePlayerSettingsStore(state => state.volumes);
	const isLooping = usePlayerSettingsStore(state => state.isLooping);
	const activeFilter = usePlayerSettingsStore(state => state.activeFilter);
	const activeNoise = usePlayerSettingsStore(state => state.activeNoise);
	const noiseVolume = usePlayerSettingsStore(state => state.noiseVolume);

	const buffersRef = useRef<Array<Tone.ToneAudioBuffer[] | undefined>>([]);
	const pendingBufferLoadsRef = useRef(new Map<number, Promise<Tone.ToneAudioBuffer[]>>());
	const playersRef = useRef<Tone.Player[]>([]);
	const fadersRef = useRef<Tone.Gain[]>([]);
	const filterRef = useRef<Tone.Filter | null>(null);
	const noiseRef = useRef<Tone.Noise | null>(null);
	const noiseFaderRef = useRef<Tone.Gain | null>(null);
	const wavesurferRef = useRef<WaveSurfer | null>(null);
	const wasPlayingBeforeDrag = useRef(false);
	const seekPauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const stopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const fadeTime = 0.05;
	const currentSongLoaded = loadedSongs[currentSongIndex] ?? false;
	const currentSong = songs[currentSongIndex];

	const setSongIndex = useCallback((index: number) => {
		currentSongIndexRef.current = index;
		setCurrentSongIndex(index);
	}, []);

	const handlePlay = useCallback(async () => {
		await Tone.start();

		const song = songs[currentSongIndexRef.current];
		if (Tone.Transport.seconds >= song.duration - 0.05) {
			Tone.Transport.stop();
			Tone.Transport.seconds = 0;
			setCurrentTime(0);
			wavesurferRef.current?.setTime(0);
		}

		if (Tone.Transport.state !== 'started') {
			// Fade the master output in to avoid an abrupt start.
			Tone.Destination.volume.value = -Infinity;
			Tone.Transport.start();
			Tone.Destination.volume.rampTo(0, fadeTime);

			const settings = usePlayerSettingsStore.getState();
			const noiseFader = noiseFaderRef.current;
			if (settings.activeNoise !== 'off' && noiseFader)
				noiseFader.gain.rampTo(Tone.dbToGain(settings.noiseVolume), fadeTime);
		}
	}, []);

	const handleStop = useCallback(() => {
		// Let the fade finish before resetting the transport position.
		Tone.Destination.volume.rampTo(-Infinity, fadeTime);
		if (stopTimeoutRef.current)
			clearTimeout(stopTimeoutRef.current);

		stopTimeoutRef.current = setTimeout(() => {
			Tone.Transport.stop();
			Tone.Transport.seconds = 0;
			wavesurferRef.current?.setTime(0);
			setCurrentTime(0);
			stopTimeoutRef.current = null;
		}, 50);
	}, []);

	const handleNextTrack = useCallback(() => {
		noiseFaderRef.current?.gain.rampTo(0, fadeTime);
		Tone.Transport.stop();
		Tone.Transport.seconds = 0;
		setCurrentTime(0);
		wavesurferRef.current?.setTime(0);

		const currentOrderIndex = playOrder.indexOf(currentSongIndexRef.current);
		const nextOrderIndex = currentOrderIndex + 1;
		if (nextOrderIndex < playOrder.length) {
			setSongIndex(playOrder[nextOrderIndex]);
			void handlePlay();
		} else if (usePlayerSettingsStore.getState().isLooping) {
			setSongIndex(playOrder[0]);
			void handlePlay();
		} else {
			setSongIndex(playOrder[0]);
			handleStop();
		}
	}, [handlePlay, handleStop, playOrder, setSongIndex]);

	const handlePause = useCallback(() => {
		if (Tone.Transport.state === 'started') {
			Tone.Destination.volume.rampTo(-Infinity, fadeTime);
			setTimeout(() => {
				if (Tone.Transport.state === 'started')
					Tone.Transport.pause();
			}, 50);
		} else if (Tone.Transport.state === 'paused') {
			void handlePlay();
		}
	}, [handlePlay]);

	const handleSeek = useCallback((time: number, isDragging: boolean) => {
		if (Number.isNaN(time) || time < 0)
			return;

		const duration = songs[currentSongIndexRef.current].duration;
		const seekTime = Math.min(time, duration);

		if (isDragging && Tone.Transport.state === 'started' && !wasPlayingBeforeDrag.current) {
			// Pause during a live seek, then resume from the chosen position on release.
			wasPlayingBeforeDrag.current = true;
			Tone.Destination.volume.rampTo(-Infinity, fadeTime);
			seekPauseTimeoutRef.current = setTimeout(() => {
				if (Tone.Transport.state === 'started')
					Tone.Transport.pause();
				seekPauseTimeoutRef.current = null;
			}, 30);
		}

		if (!isDragging) {
			if (seekPauseTimeoutRef.current) {
				clearTimeout(seekPauseTimeoutRef.current);
				seekPauseTimeoutRef.current = null;
			}

			if (wasPlayingBeforeDrag.current) {
				if (seekTime >= duration - 0.05) {
					wasPlayingBeforeDrag.current = false;
					handleNextTrack();
					return;
				}
				Tone.Transport.seconds = seekTime;
				setCurrentTime(seekTime);
				Tone.Transport.start();
				Tone.Destination.volume.rampTo(0, fadeTime);
				wasPlayingBeforeDrag.current = false;
			} else {
				Tone.Transport.seconds = seekTime;
				setCurrentTime(seekTime);
			}
		} else {
			const dragTime = wasPlayingBeforeDrag.current
				? Math.min(seekTime, duration - 0.05)
				: seekTime;
			Tone.Transport.seconds = dragTime;
			setCurrentTime(dragTime);
		}

		const waveformTime = isDragging && wasPlayingBeforeDrag.current
			? Math.min(seekTime, duration - 0.05)
			: seekTime;
		wavesurferRef.current?.setTime(waveformTime);
	}, [handleNextTrack]);

	useEffect(() => {
		if (playOrder.length === 0)
			return;

		let isActive = true;

		const getBuffers = (songIndex: number) => {
			const cached = buffersRef.current[songIndex];
			if (cached)
				return Promise.resolve(cached);

			const pending = pendingBufferLoadsRef.current.get(songIndex);
			if (pending)
				return pending;

			// Reuse in-flight loads so preload and track setup cannot fetch the same stems twice.
			const request = Promise.all(songs[songIndex].stemPaths.map(path =>
				new Tone.ToneAudioBuffer().load(path)
			)).then(buffers => {
				buffersRef.current[songIndex] = buffers;
				return buffers;
			}).finally(() => {
				pendingBufferLoadsRef.current.delete(songIndex);
			});
			pendingBufferLoadsRef.current.set(songIndex, request);
			return request;
		};

		const preloadSongs = async () => {
			try {
				for (const songIndex of playOrder) {
					await getBuffers(songIndex);
					if (isActive) {
						setLoadedSongs(previous => {
							const next = [...previous];
							next[songIndex] = true;
							return next;
						});
					}
				}
			} catch (error) {
				console.error('Audio preload failed:', error);
				if (isActive)
					setLoadingError('Audio could not be loaded. Check your connection and try again.');
			}
		};

		void preloadSongs();
		return () => {
			isActive = false;
		};
	}, [playOrder, loadRetryCount]);

	useEffect(() => {
		if (!currentSongLoaded)
			return;

		const duration = currentSong.duration;
		Tone.Transport.loopStart = 0;
		Tone.Transport.loopEnd = duration;
		const songBuffers = buffersRef.current[currentSongIndex];
		if (!songBuffers)
			return;

		const masterFilter = new Tone.Filter({
			type: 'lowpass',
			frequency: 20000,
			rolloff: -24,
		}).toDestination();
		filterRef.current = masterFilter;

		const newPlayers: Tone.Player[] = [];
		const newFaders: Tone.Gain[] = [];
		const noiseFader = new Tone.Gain(0).connect(masterFilter);
		noiseFaderRef.current = noiseFader;

		currentSong.stemPaths.forEach((_, index) => {
			// Route each synchronized stem through its own gain, then the shared filter.
			const gainNode = new Tone.Gain(Tone.dbToGain(usePlayerSettingsStore.getState().volumes[index]));
			gainNode.connect(masterFilter);
			const player = new Tone.Player(songBuffers[index])
				.connect(gainNode)
				.sync()
				.start(0);
			newPlayers.push(player);
			newFaders.push(gainNode);
		});
		playersRef.current = newPlayers;
		fadersRef.current = newFaders;

		const noise = new Tone.Noise('pink').connect(noiseFader);
		noiseRef.current = noise;
		noise.start();

		const endEvent = Tone.Transport.schedule(handleNextTrack, duration);
		return () => {
			newPlayers.forEach(player => player.dispose());
			newFaders.forEach(fader => fader.dispose());
			noise.dispose();
			noiseFader.dispose();
			masterFilter.dispose();
			Tone.Transport.clear(endEvent);
			if (playersRef.current === newPlayers)
				playersRef.current = [];
			if (fadersRef.current === newFaders)
				fadersRef.current = [];
			if (filterRef.current === masterFilter)
				filterRef.current = null;
			if (noiseRef.current === noise)
				noiseRef.current = null;
			if (noiseFaderRef.current === noiseFader)
				noiseFaderRef.current = null;
		};
	}, [currentSong, currentSongIndex, currentSongLoaded, handleNextTrack]);

	useEffect(() => {
		const syncState = () => setTransportState(Tone.Transport.state);
		const handleTransportStop = () => setTransportState('stopped');

		Tone.Transport.on('start', syncState);
		Tone.Transport.on('pause', syncState);
		Tone.Transport.on('stop', handleTransportStop);
		return () => {
			Tone.Transport.off('start', syncState);
			Tone.Transport.off('pause', syncState);
			Tone.Transport.off('stop', handleTransportStop);
		};
	}, []);

	useEffect(() => {
		Tone.Transport.loop = isLooping;
		Tone.Transport.loopStart = 0;
		Tone.Transport.loopEnd = currentSong.duration;
	}, [currentSong.duration, isLooping]);

	useEffect(() => {
		const filter = filterRef.current;
		if (!filter)
			return;

		const frequencyByMode = {
			gentle: 3000,
			warm: 1000,
			deep: 400,
			off: 20000,
		} satisfies Record<typeof activeFilter, number>;
		filter.frequency.rampTo(frequencyByMode[activeFilter], fadeTime);
	}, [activeFilter, currentSongLoaded, currentSongIndex]);

	useEffect(() => {
		fadersRef.current.forEach((fader, index) => {
			const volume = volumes[index];
			if (volume !== undefined)
				fader.gain.rampTo(Tone.dbToGain(volume), fadeTime);
		});
	}, [currentSongLoaded, currentSongIndex, volumes]);

	useEffect(() => {
		const noise = noiseRef.current;
		if (!noise || activeNoise === 'off')
			return;
		noise.type = activeNoise;
	}, [activeNoise, currentSongLoaded, currentSongIndex]);

	useEffect(() => {
		const noiseFader = noiseFaderRef.current;
		if (!noiseFader)
			return;

		const targetGain = transportState === 'started' && activeNoise !== 'off'
			? Tone.dbToGain(noiseVolume)
			: 0;
		noiseFader.gain.rampTo(targetGain, fadeTime);
	}, [activeNoise, currentSongIndex, currentSongLoaded, noiseVolume, transportState]);

	useEffect(() => {
		let animationFrame = 0;
		const syncWaveform = () => {
			// Poll the transport so the time label and waveform follow playback smoothly.
			if (Tone.Transport.state === 'started') {
				const transportTime = Tone.Transport.seconds;
				setCurrentTime(transportTime);
				if (!wasPlayingBeforeDrag.current)
					wavesurferRef.current?.setTime(transportTime);
			}
			animationFrame = requestAnimationFrame(syncWaveform);
		};

		animationFrame = requestAnimationFrame(syncWaveform);
		return () => cancelAnimationFrame(animationFrame);
	}, []);

	useEffect(() => () => {
		if (seekPauseTimeoutRef.current)
			clearTimeout(seekPauseTimeoutRef.current);
		if (stopTimeoutRef.current)
			clearTimeout(stopTimeoutRef.current);
	}, []);

	const retryLoading = useCallback(() => {
		setLoadingError(null);
		setLoadRetryCount(count => count + 1);
	}, []);

	return {
		currentSong,
		currentSongIndex,
		currentSongLoaded,
		currentTime,
		transportState,
		loadingError,
		wavesurferRef,
		handlePlay,
		handlePause,
		handleStop,
		handleSeek,
		retryLoading,
	};
}
