import { Pause_Button, Play_Button, Stop_Button } from '../../../svg/Vector';
import type { TransportState } from '../../../types';

interface TransportProps {
	transportState: TransportState;
	handlePlay: () => void | Promise<void>;
	handlePause: () => void;
	handleStop: () => void;
}

function Transport({
	transportState,
	handlePlay, handlePause, handleStop
}: TransportProps) {
	const isPlaying = transportState === "started";
	const isPaused = transportState === "paused";
	const isStopped = transportState === "stopped";

	// Each button dims when its corresponding transport state is active.
	return (
		<div className='
			flex place-content-center place-items-center gap-2
			h-auto w-72
		'>
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
