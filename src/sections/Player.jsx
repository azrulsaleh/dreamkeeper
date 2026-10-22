import { useState, useRef, useEffect, useMemo } from "react";
import * as Tone from "tone";
import Player_Header from './player/Player_Header'
import Player_Body from './player/Player_Body'
import Loading from './player/Overlay/Loading'

function Player() {
	const songs = [
		{
			id: 1,
			title: 'Night Bloom',
			stemPaths: ["01.NightBloom/01. NightBloom_Piano.opus", "01.NightBloom/01. NightBloom_Cello.opus", "01.NightBloom/01. NightBloom_Vocals.opus", "01.NightBloom/01. NightBloom_Synths.opus"],
			duration: 365.008917,
			waveformPeaks: [0.0, 24.17, -27.71, 17.91, 21.4, 33.31, 33.63, -26.09, -23.74, 33.8, -23.42, -28.54, -27.99, 31.36, 16.03, 21.86, -31.0, -29.69, -30.38, -33.46, 30.33, -22.35, -25.9, 27.2, 30.08, -27.47, -28.49, -30.31, -22.46, -22.34, 29.09, -30.21, 19.93, 16.49, -26.21, 31.24, 18.4, 17.48, -29.61, 24.7, 21.45, -21.48, 27.5, 22.59, -23.02, 48.6, -49.48, 51.97, 55.23, 35.46, -42.86, 49.6, 58.19, -43.86, -46.35, -52.89, -61.21, 58.59, -59.17, -31.96, 27.74, 28.83, 17.68, -17.71, -12.85, 17.43, 25.32, -17.44, 20.5, 21.93, -21.58, -23.45, -20.34, 28.61, -22.68, 25.22, 23.53, -28.46, -24.18, -29.44, 28.7, -23.12, -28.02, -24.47, -24.21, -25.94, -33.72, -45.85, -55.2, -62.78, -51.24, 42.2, 40.32, -38.89, 48.59, -48.54, 41.02, 42.11, -53.76, -50.35, -44.99, 29.21, -21.97, -17.56, 32.84, -21.08, 12.08, 23.41, -22.9, 17.16, 37.19, -33.62, -24.42, -32.61, -32.16, 34.31, -30.29, -32.15, 38.19, 38.52, 39.18, -31.32, 44.01, 45.63, 55.73, 50.69, -49.02, -41.44, -37.21, 54.69, -54.51, -50.82, 47.13, 56.21, -47.34, 48.59, -28.24, -23.79, -16.6, -37.08, -16.36, -31.85, 27.47, -19.57, 26.85, -21.81, -26.15, -17.25, 23.86, -24.29, 15.84, 16.48, 20.89, -9.24, 9.54, -5.86, 6.2, 2.8, 1.3, 0.13]
		},
		{
			id: 2,
			title: 'Rolling Tides',
			stemPaths: ["02.RollingTides/02.RollingTides_Piano.opus", "02.RollingTides/02.RollingTides_Cello.opus", "02.RollingTides/02.RollingTides_Vocals.opus", "02.RollingTides/02.RollingTides_Synths.opus"],
			duration: 366.767292,
			waveformPeaks: [0.06, 3.03, 6.39, 5.47, 7.86, -40.17, 52.18, 30.48, -38.81, 42.27, 31.07, -30.95, -35.56, -35.72, 33.19, -46.79, -31.74, -46.12, -49.65, -32.2, 40.96, -43.67, -30.78, -48.26, 43.59, 29.99, 45.54, -43.02, 40.6, 44.53, -49.3, -41.69, 49.01, 49.07, 43.29, 47.26, -36.71, 42.88, -33.97, -35.59, 43.48, -35.73, 43.54, -40.65, -30.58, -45.94, 45.0, 47.26, -49.18, 34.17, 44.58, -51.69, 42.6, -38.06, -40.7, 41.23, 41.63, 48.3, -48.04, 48.09, -43.21, 43.02, 51.4, 44.54, 51.75, 49.34, -39.44, -36.43, -39.14, -36.99, 40.06, -34.06, -37.35, 39.65, 32.59, -36.41, -41.25, -29.79, 40.06, -39.33, -40.67, -37.71, 36.98, 43.96, 43.75, 34.59, -42.67, 42.29, 40.07, 41.62, -47.98, -44.43, 45.06, 36.95, 51.71, -46.57, -39.71, 32.16, 37.16, -44.08, 34.27, -34.73, 25.26, -39.6, 41.12, -30.52, 38.88, 43.67, 26.4, -39.84, 31.28, -46.22, 48.1, -38.7, -40.76, 39.12, -32.34, -46.26, 59.36, -44.75, 36.56, 52.98, -52.42, 62.52, 48.2, 46.48, 39.2, -49.56, 46.1, 48.11, -41.25, 37.72, 31.01, -37.65, -49.84, 36.2, 29.17, 37.5, 41.27, -52.27, -58.3, 34.93, -46.68, 50.9, 50.01, 42.63, -35.22, 34.29, -38.61, 33.54, -25.91, -24.08, 10.56, 5.05, -2.84, 1.38, 0.45, 0.06, 0.03, 0.02]
		},
		{
			id: 3,
			title: 'Beneath The Moon',
			stemPaths: ["03.BeneathTheMoon/03.BeneathTheMoon_Piano.opus", "03.BeneathTheMoon/03.BeneathTheMoon_Cello.opus", "03.BeneathTheMoon/03.BeneathTheMoon_Vocals.opus", "03.BeneathTheMoon/03.BeneathTheMoon_Synths.opus"],
			duration: 295.124021,
			waveformPeaks: [0.0, 0.53, 5.62, 9.33, 8.9, -6.84, 6.06, -19.91, -16.27, 16.16, 18.72, 15.89, 16.71, 15.62, -22.27, -16.19, 29.64, -19.0, -24.14, 24.95, 20.4, 16.32, -13.46, 16.46, 13.07, 32.15, 24.96, 34.38, -25.18, -19.57, 16.44, -24.46, -17.29, 13.3, 27.51, -24.77, -23.61, -25.0, 25.67, -23.26, -30.19, -11.8, -13.36, -22.81, 23.14, 25.29, 24.43, -30.71, 25.01, -30.25, 30.67, -25.8, -27.3, 29.29, -25.84, 33.55, -26.59, -32.02, 32.47, 26.51, 22.69, -33.74, -33.21, 23.98, 31.4, 29.89, 25.51, 28.62, 19.78, 16.38, 32.46, -32.85, -37.45, -38.83, 30.04, 25.14, 33.28, 30.44, 27.07, -28.98, -24.77, -15.7, 22.11, 22.77, 16.94, -14.6, 19.55, -15.81, -13.37, -22.61, -15.65, -19.25, -20.54, -12.28, 25.77, -16.6, 18.24, 15.96, -21.27, -16.81, -26.5, 16.2, 15.7, -23.07, -16.78, -15.55, 14.31, 31.83, 24.4, -28.73, -30.13, -30.4, 30.61, -28.28, 27.88, 29.4, -40.51, -25.86, 41.89, -35.27, 26.03, -25.98, 30.15, -28.67, -25.43, 32.69, -29.41, 41.29, -33.61, 26.27, -34.08, 31.15, -28.88, 28.93, -36.92, 31.46, 31.55, 38.06, 25.72, -32.82, -31.44, -27.02, 29.42, -23.1, -15.29, 9.79, -14.75, -15.02, 12.92, -7.32, -4.6, -3.76, -2.07, -0.49, 0.09, -0.02, 0.01, 0.0, 0.0, 0.0]
		},
		{
			id: 4,
			title: 'Driftwood Dreams',
			stemPaths: ["04.DriftwoodDreams/04.Driftwood Dreams_Piano.opus", "04.DriftwoodDreams/04.Driftwood Dreams_Cello.opus", "04.DriftwoodDreams/04.Driftwood Dreams_Vocals.opus", "04.DriftwoodDreams/04.Driftwood Dreams_Synths.opus"],
			duration: 298.043958,
			waveformPeaks: [0.05, -14.29, 7.45, 14.13, 17.92, 8.2, 16.32, -7.41, -16.26, 19.18, -20.06, 22.69, 20.35, 18.62, 23.31, 23.36, 24.14, 19.09, 20.01, -25.1, -31.52, -20.39, 15.13, 17.03, -23.44, -27.52, 29.63, 46.61, -21.1, 17.91, -14.08, -15.0, 14.88, -7.96, 16.84, 7.36, 16.82, -13.36, -22.18, -26.8, 19.68, 18.13, -21.3, 27.71, -27.2, 24.64, 27.67, -33.68, -35.17, 24.1, 23.51, 25.39, -36.69, 30.66, -23.46, -17.79, -34.04, 37.37, -25.62, -21.58, -24.13, 32.45, -27.48, -25.63, 22.59, 30.01, -42.36, -32.9, 26.41, 17.59, 39.07, -37.82, -30.56, 26.43, -13.45, 17.65, -12.1, 7.07, -12.81, -7.52, -12.78, 6.7, 15.6, -11.78, 7.08, -30.52, 21.95, 13.61, 17.78, -24.94, -35.13, -24.34, -24.28, 15.81, -20.64, -25.81, 31.45, 21.61, 21.47, 25.57, -31.57, -37.32, 16.25, -25.19, -28.03, 32.55, 19.88, -34.79, -43.62, -30.85, -33.33, 22.84, -32.2, -27.76, -49.01, -28.84, -26.92, 34.12, -26.18, 34.78, -36.34, 31.9, -33.08, -31.98, -24.73, -29.83, -39.25, -34.93, 24.1, 18.84, -25.83, 25.09, -9.02, -16.63, 11.04, 10.73, -14.87, 6.22, 14.95, 9.34, -12.43, 13.77, 5.38, -13.81, -7.32, -10.32, 9.88, -5.86, 10.22, -6.27, -5.02, -3.23, -1.57, -1.01, -0.38, 0.05, -0.02, 0.02, 0.0, 0.0]
		},
		{
			id: 5,
			title: 'Soft Wings',
			stemPaths: ["06.SoftWings/06.Soft Wings_Piano.opus", "06.SoftWings/06.Soft Wings_Cello.opus", "06.SoftWings/06.Soft Wings_Vocals.opus", "06.SoftWings/06.Soft Wings_Synths.opus"],
			duration: 363.556354,
			waveformPeaks: [-0.84, 2.1, 3.45, 6.57, -9.62, -7.75, 10.8, -8.48, 10.32, 8.21, -22.95, 17.88, -17.96, 19.55, -26.07, -22.86, 15.09, -16.16, 20.07, -16.22, -15.16, -22.37, -22.02, -18.83, 15.33, -26.17, 23.97, 14.92, 23.77, -32.05, -17.62, -22.91, -20.24, 22.07, -16.94, 15.54, -21.33, -18.87, -18.03, -16.39, -23.33, -16.3, -15.04, 25.64, -22.49, -17.54, 17.07, -24.57, -16.97, -21.51, -25.42, -23.42, 19.0, 23.19, -21.78, -14.78, -19.81, 21.95, -26.22, -16.44, 18.62, 22.64, -16.42, 19.12, 15.58, -22.53, 15.17, -20.28, -23.59, -23.66, 15.33, 18.97, 22.39, -21.81, 22.75, -22.85, -18.88, 23.33, -18.85, -25.6, 16.6, -18.77, 20.8, 23.19, -26.87, -19.26, -21.79, -19.11, -19.03, 19.49, -23.84, -16.23, -21.94, -22.54, -18.75, 20.94, 22.32, 25.16, 20.24, -23.2, -18.76, 19.58, 13.25, -22.95, -22.55, -24.52, -17.52, -17.62, 23.25, 15.25, -19.37, -20.13, -22.43, -18.52, 15.27, 25.18, 16.73, 17.44, -20.8, -22.73, 15.06, -12.55, -17.56, -19.56, 24.95, -16.15, -20.3, -17.75, 24.42, -23.55, 18.11, 17.61, 20.72, -21.87, -21.79, -19.49, -20.89, -21.62, -25.22, 21.19, -20.61, -24.05, -16.85, -18.83, 22.3, 18.45, 13.85, -16.96, -15.22, 15.14, 13.55, 11.24, -9.53, -6.61, 1.13, 0.42, 0.03, 0.01, 0.0, 0.0]
		},
		{
			id: 6,
			title: 'Garden of Sleep',
			stemPaths: ["07.GardenOfSleep/07.Garden of Sleep_Piano.opus", "07.GardenOfSleep/07.Garden of Sleep_Cello.opus", "07.GardenOfSleep/07.Garden of Sleep_Vocals.opus", "07.GardenOfSleep/07.Garden of Sleep_Synths.opus"],
			duration: 434.031250,
			waveformPeaks: [-7.22, -10.52, -12.39, 11.44, -8.81, 9.47, 29.34, 30.64, 34.49, -38.93, -26.82, 29.87, 33.96, -33.75, 27.65, 28.38, -26.87, 31.62, -29.14, -32.34, -38.9, 28.25, -35.95, 27.0, 24.67, -32.49, 27.14, 24.51, 29.84, 26.04, -28.22, -41.56, 36.47, 30.92, 35.03, 34.3, 25.13, -34.68, 38.9, 35.4, -33.44, 43.89, -28.33, -35.51, -37.7, -35.27, 39.32, -30.64, 36.03, 37.65, -35.73, 30.3, 34.52, -35.49, -32.66, -41.73, -40.74, 43.77, -52.26, -43.83, -50.15, -53.28, 57.3, -63.32, -52.34, -33.02, 38.78, -32.25, 37.84, 48.62, -59.75, 44.53, 47.4, 55.71, 68.34, 63.02, 54.26, 41.07, 40.35, 32.66, 50.49, -38.95, -37.27, 35.99, 32.51, -35.33, -44.36, 36.38, 31.12, 33.28, 27.3, -35.31, -32.19, 23.78, -18.74, -21.23, 31.65, -27.13, -31.25, 31.07, -17.24, 28.62, 35.26, 32.08, -25.03, 34.21, -27.38, 24.54, 43.65, 29.0, 31.67, 36.71, 21.87, -24.84, -32.61, 23.35, -30.64, 26.62, -29.44, -47.65, -48.78, 47.78, -38.8, -20.93, -42.07, -44.87, 42.34, -32.44, -31.41, -40.91, -39.5, 12.54, -10.06, -9.4, 7.09, 8.19, 6.92, -8.17, 8.81, -8.74, -7.08, -6.27, 6.72, 6.33, -7.78, 7.19, 6.44, 5.95, -4.74, -4.5, -2.79, -3.3, 2.19, 1.83, 1.19, -0.69, -0.23, 0.01, 0.0, 0.0]
		},
		{
			id: 7,
			title: 'Dreamkeeper',
			stemPaths: ["08.Dreamkeeper/08.Dreamkeeper_Piano.opus", "08.Dreamkeeper/08.Dreamkeeper_Cello.opus", "08.Dreamkeeper/08.Dreamkeeper_Vocals.opus", "08.Dreamkeeper/08.Dreamkeeper_Synths.opus"],
			duration: 324.744229,
			waveformPeaks: [0.0, 23.48, 12.95, 33.46, 31.71, 35.42, -20.23, 17.25, 11.91, 24.7, -20.75, -37.56, -35.93, 36.54, 18.53, 26.65, -20.23, -23.14, -24.61, 32.66, 35.24, -31.95, 17.44, -24.76, 44.77, -42.88, -31.37, 38.43, -38.73, -38.1, -27.26, 34.27, 33.37, -33.44, -22.17, -34.5, 40.9, 32.53, -26.72, -20.02, -14.42, 29.17, -25.44, 40.4, 40.36, -34.4, 26.71, -26.44, -18.61, 37.27, -37.23, -30.01, 38.27, -39.53, 29.96, -29.0, 31.9, 24.46, 21.31, 33.26, -43.61, 42.68, -39.32, 28.52, -19.15, 19.45, -21.32, -11.44, -37.82, -33.23, -22.46, -16.79, -20.49, 8.57, -22.62, -16.68, -34.35, -40.24, -29.75, 19.66, 28.14, -23.4, -32.98, 39.21, 40.55, -21.43, 24.32, -18.58, -33.09, 30.24, 24.96, 14.89, 19.78, -27.55, -46.77, 31.64, -37.99, -41.46, -27.41, 18.53, 28.59, -37.09, 35.13, 20.49, -27.78, 20.02, -26.31, -26.8, -25.07, 25.68, 22.22, 15.99, 28.41, 29.42, -20.08, -28.5, -15.7, 19.13, 25.52, 23.15, -25.16, 26.74, -18.7, 29.26, -41.5, -28.99, 19.42, -14.94, -26.48, -30.4, -19.52, -14.12, -33.82, 34.52, -21.86, -18.33, -16.85, -23.98, 15.51, -11.54, -12.93, -15.6, 12.43, -9.67, 8.75, -5.01, -6.75, -6.06, -2.97, -3.27, -2.43, -0.01, 0.0, -0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
		},
	];

	const buffersRef = useRef([[], []]);
	const playersRef = useRef(null);
	const wavesurferRef = useRef(null);
	const [isSongLoaded, setIsSongLoaded] = useState([false, false]);
	const [transportState, setTransportState] = useState("stopped");
	const [currentSongID, setCurrentSongID] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const elapsedTime1 = useRef(null);
	const elapsedTime2 = useRef(null);
	const [isLooping, setIsLooping] = useState(false);
	const wasPlayingBeforeDrag = useRef(false);
	const fadeTime = 0.05;
	const [volumes, setVolumes] = useState([0, 0, 0, 0]);
	const fadersRef = useRef([]);
	const [activeFilter, setActiveFilter] = useState("off");
	const filterRef = useRef(null);
	const noiseRef = useRef(null);
	const noiseFaderRef = useRef(null);
	const [activeNoise, setActiveNoise] = useState("pink");
	const [noiseVolume, setNoiseVolume] = useState(-60);

	const playOrder = useMemo(() => {
		const set = new Set();
		while (set.size < songs.length)
			set.add(Math.floor(Math.random() * songs.length));
		return Array.from(set);
	}, []);

	//pre-load all song stems into buffers sequentially
	useEffect(() => {
		const loadAllSongs = async () => {
			setCurrentSongID(playOrder[0]);
			for (let i = 0; i < playOrder.length; i++) {
				let j = playOrder[i];
				const stemPromises = songs[j].stemPaths.map(path => 
					new Tone.ToneAudioBuffer().load(path)
				);
				buffersRef.current[j] = await Promise.all(stemPromises);

				setIsSongLoaded(prev => {
					const newState = [...prev];
					newState[j] = true;
					return newState;
				});
				console.log(`\"${songs[j].id} - ${songs[j].title}\" buffers loaded`);
			}
		};
		loadAllSongs();
	}, []);

	//initialize audio routing, effects + stems synchronization for the current song
	useEffect(() => {
		if (!isSongLoaded[currentSongID])
			return;

		const duration = songs[currentSongID].duration;
		Tone.Transport.loopStart = 0;
		Tone.Transport.loopEnd = duration;

		playersRef.current?.forEach(p => p.dispose());
		fadersRef.current?.forEach(f => f.dispose());
		filterRef.current?.dispose();
		noiseRef.current?.dispose();
		noiseFaderRef.current?.dispose();

		const masterFilter = new Tone.Filter({
			type: "lowpass",
			frequency: 20000,
			rolloff: -24
		}).toDestination();
		filterRef.current = masterFilter;

		const newPlayers = [];
		const newFaders = [];
		const noiseFader = new Tone.Gain(0).connect(masterFilter);
		noiseFaderRef.current = noiseFader;

		songs[currentSongID].stemPaths.forEach((path, index) => {
			const gainNode = new Tone.Gain(Tone.dbToGain(volumes[index]));
			gainNode.connect(masterFilter);
			const player = new Tone.Player(buffersRef.current[currentSongID][index])
				.connect(gainNode)
				.sync()
				.start(0);
			newPlayers.push(player);
			newFaders.push(gainNode);
		});
		playersRef.current = newPlayers;
		fadersRef.current = newFaders;
		
		const noise = new Tone.Noise("brown").connect(noiseFader);
		noiseRef.current = noise;
		noise.start();

		let endEvent = null;
		if (duration > 0) {
			Tone.Transport.loopEnd = duration;
			endEvent = Tone.Transport.schedule(() => {
				handleNextTrack();
			}, duration);
		}

		if (transportState === "started")
			Tone.Transport.seconds = 0;

		console.log("Mixer Engine ready");
		return () => {
			newPlayers.forEach(p => p.dispose());
			newFaders.forEach(f => f.dispose());
			noise.dispose();
			noiseFader.dispose();
			masterFilter.dispose();
			if (endEvent !== null)
				Tone.Transport.clear(endEvent);
		};
	}, [currentSongID, isSongLoaded[currentSongID]]);

	//set react state with Tone.Transport events
	useEffect(() => {
		const syncState = () => setTransportState(Tone.Transport.state);

		const handleTransportEnd = () => {
			setTransportState("stopped");
		};

		Tone.Transport.on("start", syncState);
		Tone.Transport.on("pause", syncState);
		Tone.Transport.on("stop", handleTransportEnd);

		return () => {
			Tone.Transport.off("start", syncState);
			Tone.Transport.off("pause", syncState);
			Tone.Transport.off("stop", handleTransportEnd);
		};
	}, []);

	const handlePlay = async () => {
		await Tone.start();

		if (Tone.Transport.seconds >= songs[currentSongID].duration - 0.05) {
			Tone.Transport.stop();
			Tone.Transport.seconds = 0;
			setCurrentTime(0);
			wavesurferRef.current?.setTime(0);
		}

		if (Tone.Transport.state !== "started") {
			Tone.Destination.volume.value = -Infinity;
			Tone.Transport.start();
			Tone.Destination.volume.rampTo(0, fadeTime);
			if (activeNoise !== "off" && noiseFaderRef.current)
				noiseFaderRef.current.gain.rampTo(Tone.dbToGain(noiseVolume), fadeTime);
		}
	};
	const handlePause = () => {
		if (Tone.Transport.state === "started") {
			Tone.Destination.volume.rampTo(-Infinity, fadeTime);
			setTimeout(() => {
				if (Tone.Transport.state === "started")
					Tone.Transport.pause();
			}, 50);
			console.log("Transport paused at ", Tone.Transport.seconds.toFixed(2));
		} else {
			Tone.Transport.start();
			Tone.Destination.volume.rampTo(0, fadeTime);
		}
	};
	const handleStop = () => {
		Tone.Destination.volume.rampTo(-Infinity, fadeTime);
		setTimeout(() => {
			Tone.Transport.stop();
			Tone.Transport.seconds = 0;
			wavesurferRef.current?.setTime(0);
			setCurrentTime(0);
			console.log("Transport stopped and reset to 0:00");
		}, 50);
	};
	const handleSeek = (time, isDragging) => {
		if (isNaN(time) || time < 0)
			return;

		if (isDragging && Tone.Transport.state === "started") {
			wasPlayingBeforeDrag.current = true;
			Tone.Destination.volume.rampTo(-Infinity, fadeTime);
			setTimeout(() => Tone.Transport.pause(), 30);
		}

		Tone.Transport.seconds = time;
		setCurrentTime(time);

		if (!isDragging) {
			if (wasPlayingBeforeDrag.current) {
				Tone.Transport.start();
				Tone.Destination.volume.rampTo(0, fadeTime);
				wasPlayingBeforeDrag.current = false;
			}
		}

		if (wavesurferRef.current) {
			try {
				wavesurferRef.current.setTime(time);
			} catch (e) {
			}
		}

		if (elapsedTime1.current)
			elapsedTime1.current.innerText = formatTime(time);
		if (elapsedTime2.current)
			elapsedTime2.current.innerText = formatTime(time);
	};
	const handleLoopToggle = (shouldLoop) => {
		setIsLooping(shouldLoop);
		Tone.Transport.loop = shouldLoop;
		if (shouldLoop) {
			Tone.Transport.loopStart = 0;
			Tone.Transport.loopEnd = songs[currentSongID].duration; 
		}
	};
	const handleNextTrack = () => {
		if (noiseFaderRef.current)
			noiseFaderRef.current.gain.rampTo(0, fadeTime);
		Tone.Transport.stop();
		Tone.Transport.seconds = 0;
		setCurrentTime(0);
		wavesurferRef.current?.setTime(0);

		const currentOrderIndex = playOrder.indexOf(currentSongID);
		const nextOrderIndex = currentOrderIndex + 1;
		if (nextOrderIndex < playOrder.length) {
			setCurrentSongID(playOrder[nextOrderIndex]);
			handlePlay();
		} else if (isLooping) {
			setCurrentSongID(playOrder[0]);
			handlePlay();
		} else {
			setCurrentSongID(playOrder[0]);
			handleStop(); 
		}
	};

	const formatTime = (seconds) => {
		if (!seconds)
			return "0:00";

		const totalSeconds = Math.max(0, seconds);
		const min = Math.floor(totalSeconds / 60);
		const sec = Math.floor(totalSeconds % 60);

		return `${min}:${String(sec).padStart(2, "0")}`;
	};

	//update currentTime, elapsedTime + wavesurfer progress
	useEffect(() => {
		let animationFrame;

		const syncWaveform = () => {
			const transportTime = Tone.Transport.seconds;

			if (elapsedTime1.current)
				elapsedTime1.current.innerText = formatTime(transportTime);
			if (elapsedTime2.current)
				elapsedTime2.current.innerText = formatTime(transportTime);

			if (Tone.Transport.state === "started" && wavesurferRef.current) {
				setCurrentTime(Tone.Transport.seconds);
				if (wavesurferRef.current && !wavesurferRef.current.isInteracting)
					wavesurferRef.current.setTime(transportTime);
			}
			animationFrame = requestAnimationFrame(syncWaveform);
		}
		animationFrame = requestAnimationFrame(syncWaveform);
		return () => cancelAnimationFrame(animationFrame);
	}, []);

	const handleVolumeChange = (index, newVolume) => {
		const updatedVolumes = [...volumes];
		updatedVolumes[index] = newVolume;
		setVolumes(updatedVolumes);

		if (fadersRef.current[index])
			fadersRef.current[index].gain.rampTo(Tone.dbToGain(newVolume), fadeTime);
	};

	const handleFilterChange = (mode) => {
		if (!filterRef.current)
			return;

		const isTogglingOff = activeFilter === mode;
		const newMode = isTogglingOff ? "off" : mode;

		setActiveFilter(newMode);

		let frequency;
		switch (newMode) {
			case 'gentle': frequency = 3000; break;
			case 'warm': frequency = 1000; break;
			case 'deep': frequency = 400; break;
			default: frequency = 20000; break;
		}

		filterRef.current.frequency.rampTo(frequency, fadeTime);
		console.log("filter mode: ", newMode);
	};

	const handleNoiseChange = (type) => {
		if (!noiseRef.current || !noiseFaderRef.current)
			return;

		const isTogglingOff = activeNoise === type;
		const newType = isTogglingOff ? "off" : type;

		setActiveNoise(newType);

		if (newType === "off")
			noiseFaderRef.current.gain.rampTo(0, fadeTime);
		else {
			noiseRef.current.type = newType;
			if (transportState === "started")
				noiseFaderRef.current.gain.rampTo(Tone.dbToGain(noiseVolume), fadeTime);
		}
	};
	const handleNoiseVolumeChange = (newVolume) => {
		setNoiseVolume(newVolume);
		
		if (noiseFaderRef.current) {
			if (activeNoise !== "off") {
				noiseFaderRef.current.gain.rampTo(Tone.dbToGain(newVolume), fadeTime);
			}
		}
	};

	return (
		<div className='_parent _bg-player'>
			<div className="_child z-0">
				<Player_Header
					key={currentSongID}
					wavesurferRef={wavesurferRef}
					transportState={transportState}
					handlePlay={handlePlay}
					handlePause={handlePause}
					handleStop={handleStop}
					handleSeek={handleSeek}
					title={songs[currentSongID].title}
					currentTime={currentTime}
					elapsedTime1={elapsedTime1}
					elapsedTime2={elapsedTime2}
					formatTime={formatTime}
					duration={songs[currentSongID].duration}
					waveformPeaks={songs[currentSongID].waveformPeaks}
				/>
				<Player_Body
					isLooping={isLooping}
					handleLoopToggle={handleLoopToggle}
					volumes={volumes}
					handleVolumeChange={handleVolumeChange}
					activeFilter={activeFilter}
					handleFilterChange={handleFilterChange}
					activeNoise={activeNoise}
					handleNoiseChange={handleNoiseChange}
					noiseVolume={noiseVolume}
					handleNoiseVolumeChange={handleNoiseVolumeChange}
				/>
			</div>
			{(!isSongLoaded[currentSongID]) && (
				<div className="_child _loading z-10">
					<Loading />
				</div>
			)}
		</div>
	);
}

export default Player;
