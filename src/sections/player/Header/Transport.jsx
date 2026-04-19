import { useState } from 'react';
import { Pause_Button, Play_Button, Stop_Button } from '../../../svg/Vector';

function Transport({ currentTime, setCurrentTime }) {
	const [isPlaying, setIsPlaying] = useState(false);
	
	const handlePlay = async () => {
		setIsPlaying(true);
		console.log('isPlaying: ' + isPlaying + ' currentTime: ' + currentTime);
	};
	const handlePause = () => {
		setIsPlaying(false);
		setCurrentTime(0.1);
		console.log('isPlaying: ' + isPlaying + ' currentTime: ' + currentTime);
	};
	const handleStop = () => {
		setIsPlaying(false);
		setCurrentTime(0);
		console.log('isPlaying: ' + isPlaying + ' currentTime: ' + currentTime);
	};

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