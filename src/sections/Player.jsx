import { useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import Player_Header from './player/Player_Header'
import Player_Body from './player/Player_Body'

function Player() {
	const songs = [
		{
			id: 1,
			title: 'Demo',
			stemPaths:["a_piano.opus", "a_cello.opus", "a_vocals.opus", "a_ambience.opus"],
			masterPath:"a_mix.opus"
		},
		{
			id: 2,
			title:
			'Night Bloom',
			stemPaths:["b_piano.opus", "b_cello.opus", "b_vocals.opus", "b_ambience.opus"],
			masterPath:"b_mix.opus"
		}
	];
	const buffersRef = useRef([[], []]);
	const playersRef = useRef(null);
	const wavesurferRef = useRef(null);
	const [isSongLoaded, setIsSongLoaded] = useState([false, false]);
	const [transportState, setTransportState] = useState("stopped");
	const [currentSongID, setCurrentSongID] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [volumes, setVolumes] = useState([0, 0, 0, 0]);
	const fadersRef = useRef([]);
	const elapsedTime1 = useRef(null);
	const elapsedTime2 = useRef(null);
	const wasPlayingBeforeDrag = useRef(false);
	const fadeTime = 0.05;

	useEffect(() => {
		const loadAllSongs = async () => {
			for (let i = 0; i < songs.length; i++) {
				const stemPromises = songs[i].stemPaths.map(path => 
					new Tone.ToneAudioBuffer().load(path)
				);
				buffersRef.current[i] = await Promise.all(stemPromises);

				setIsSongLoaded(prev => {
					const newState = [...prev];
					newState[i] = true;
					return newState;
				});
				console.log(`Song ${i + 1} buffers loaded`);
			}
		};
		loadAllSongs();
	}, []);

	useEffect(() => {
		if (!isSongLoaded[currentSongID])
			return;

		playersRef.current?.forEach(p => p.dispose());
		fadersRef.current?.forEach(f => f.dispose());

		const newPlayers = [];
		const newFaders = [];

		songs[currentSongID].stemPaths.forEach((path, index) => {
			const gainNode = new Tone.Gain(Tone.dbToGain(volumes[index])).toDestination();
			const player = new Tone.Player(buffersRef.current[currentSongID][index])
				.connect(gainNode)
				.sync()
				.start(0);
			newPlayers.push(player);
			newFaders.push(gainNode);
		});

		playersRef.current = newPlayers;
		fadersRef.current = newFaders;
		console.log("Mixer Engine ready");

		return () => {
			newPlayers.forEach(p => p.dispose());
			newFaders.forEach(f => f.dispose());
		};
	}, [currentSongID, isSongLoaded]);

	useEffect(() => {
		const syncState = () => setTransportState(Tone.Transport.state);

		Tone.Transport.on("start", syncState);
		Tone.Transport.on("pause", syncState);
		Tone.Transport.on("stop", syncState);

		return () => {
			Tone.Transport.off("start", syncState);
			Tone.Transport.off("pause", syncState);
			Tone.Transport.off("stop", syncState);
		};
	}, []);

	const handlePlay = async () => {
		await Tone.start();
		
		if (Tone.Transport.state !== "started") {
			Tone.Destination.volume.value = -Infinity;
			Tone.Transport.start();
			Tone.Destination.volume.rampTo(0, fadeTime);
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

	const formatTime = (seconds) => {
		if (!seconds)
			return "0:00";

		const totalSeconds = Math.max(0, seconds);
		const min = Math.floor(totalSeconds / 60);
		const sec = Math.floor(totalSeconds % 60);

		return `${min}:${String(sec).padStart(2, "0")}`;
	};

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

	return (
		<div className='_bg-card w-[850px] h-[560px]'>
			<Player_Header
				wavesurferRef={wavesurferRef}
				transportState={transportState}
				handlePlay={handlePlay}
				handlePause={handlePause}
				handleStop={handleStop}
				handleSeek={handleSeek}
				title={songs[currentSongID].title}
				masterPath={songs[currentSongID].masterPath}
				currentTime={currentTime}
				elapsedTime1={elapsedTime1}
				elapsedTime2={elapsedTime2}
				formatTime={formatTime}
			/>
			<Player_Body
				volumes={volumes} 
				handleVolumeChange={handleVolumeChange}
			/>
		</div>
	);
}

export default Player;