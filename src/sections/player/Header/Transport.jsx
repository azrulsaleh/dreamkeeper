import { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import { Pause_Button, Play_Button, Stop_Button } from '../../../svg/Vector';

function Transport({ currentTime, setCurrentTime }) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const stems = ['piano', 'cello', 'vocals', 'ambience'];

	const playersRef = useRef({});
	// const intervalRef = useRef(null);
	
	const handlePlay = async () => {
		await Tone.start();
		if (Tone.getContext().state !== 'running')
			await Tone.getContext().resume();

		const transport = Tone.getTransport();
		transport.seconds = currentTime; 
        transport.start();
		
		setIsPlaying(true);
		console.log('isPlaying: ' + isPlaying + ' currentTime: ' + currentTime);
	};
	const handlePause = () => {
		Tone.getTransport().pause();
        setIsPlaying(false);
        setCurrentTime(Tone.getTransport().seconds);
		console.log('isPlaying: ' + isPlaying + ' currentTime: ' + currentTime);
	};
	const handleStop = () => {
		Tone.getTransport().stop();
        setIsPlaying(false);
        setCurrentTime(0);
		console.log('isPlaying: ' + isPlaying + ' currentTime: ' + currentTime);
	};

	useEffect(() => {
		const initAudio = async () => {
			setIsLoading(true);

			for (const stem of stems) {
				try {
					const player = new Tone.Player({
						url: `${stem}.opus`,
						loop: false,
						onload: () => {
							console.log(`${stem}.opus loaded successfully`);
						},
						onerror: (error) => {
							console.error(`Error loading ${stem}.opus:`, error);
						}
					}).toDestination();
					player.sync().start(0);
					playersRef.current[stem] = player;
				} catch (error) {
					console.error(`Error initializing ${stem}:`, error);
				}
			}

			setIsLoading(false);
		};

		initAudio();

		return () => {
			Tone.getTransport().stop();
			Object.values(playersRef.current).forEach(player => {
				if (player)
					player.dispose();
			});
			// if (intervalRef.current)
				// clearInterval(intervalRef.current);
		};
	}, []);

	return (
		<div className='w-[190px] h-full flex justify-center items-center gap-2'>
			<Play_Button
				isActive={isPlaying ? 0 : 1}
				onClick={handlePlay}
			/>
			<Pause_Button
				isActive={(!isPlaying && currentTime) ? 0 : 1}
				onClick={handlePause}
			/>
			<Stop_Button
				isActive={(!isPlaying && !currentTime) ? 0 : 1}
				onClick={handleStop}
			/>
		</div>
	)
}

export default Transport;