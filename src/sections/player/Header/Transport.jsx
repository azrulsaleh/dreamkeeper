import { useEffect } from 'react';
import * as Tone from 'tone';
import { Pause_Button, Play_Button, Stop_Button } from '../../../svg/Vector';

function Transport({
	transportState,
	handlePlay, handlePause, handleStop
}) {
	const isPlaying = transportState === "started";
	const isPaused = transportState === "paused";
	const isStopped = transportState === "stopped";

	return (
		<div className='w-[190px] h-full flex justify-center items-center gap-2'>
			<Play_Button
				isActive={isPlaying ? 0 : 1}
				onClick={handlePlay}
			/>
			<Pause_Button
				isActive={isPaused ? 0 : 1}
				onClick={handlePause}
			/>
			<Stop_Button
				isActive={isStopped ? 0 : 1}
				onClick={handleStop}
			/>
		</div>
	)
}

export default Transport;