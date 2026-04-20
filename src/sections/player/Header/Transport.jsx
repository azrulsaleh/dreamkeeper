import { useEffect } from 'react';
import * as Tone from 'tone';
import { Pause_Button, Play_Button, Stop_Button } from '../../../svg/Vector';

function Transport({ isPlaying, setIsPlaying, currentTime, setCurrentTime }) {	
	const tp = Tone.getTransport();

	const handlePlay = async () => {
		if (Tone.getContext().state !== 'running')
			await Tone.start();

		tp.seconds = currentTime;
		tp.start();
		setIsPlaying(true);
	};
	const handlePause = () => {
		tp.pause();
		setIsPlaying(false);
	};
	const handleStop = () => {
		tp.stop();
		setCurrentTime(0);
		setIsPlaying(false);
	};
	
	useEffect(() => {
		let animationFrame;
		
		const syncUI = () => {
			setCurrentTime(tp.seconds);
			animationFrame = requestAnimationFrame(syncUI);
		};

		if (isPlaying)
			animationFrame = requestAnimationFrame(syncUI);

		return () => cancelAnimationFrame(animationFrame);
	}, [isPlaying, setCurrentTime]);

	return (
		<div className='w-[190px] h-full flex justify-center items-center gap-2'>
			<Play_Button
				isActive={isPlaying ? 0 : 1}
				onClick={handlePlay}
			/>
			<Pause_Button
				isActive={!isPlaying && tp.state === 'paused' ? 0 : 1}
				onClick={handlePause}
			/>
			<Stop_Button
				isActive={tp.state === 'stopped' ? 0 : 1}
				onClick={handleStop}
			/>
		</div>
	)
}

export default Transport;