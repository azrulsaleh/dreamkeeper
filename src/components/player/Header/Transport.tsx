import { Pause_Icon, Play_Icon, Stop_Icon } from '../../../svg/Vector';
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
			<button
				type="button"
				aria-label="Play"
				aria-pressed={isPlaying}
				onClick={handlePlay}
				className="
					h-10 w-10
					group rounded-full bg-transparent p-0
					focus-visible:outline-2 outline-offset-2 outline-secondary-14
			">
				<Play_Icon isActive={isPlaying ? 0 : 1} />
			</button>
			<button
				type="button"
				aria-label="Pause"
				aria-pressed={isPaused}
				onClick={handlePause}
				className="
					h-10 w-10
					group rounded-full bg-transparent p-0
					focus-visible:outline-2 outline-offset-2 outline-secondary-14
			">
				<Pause_Icon isActive={isPaused ? 0 : 1} />
			</button>
			<button
				type="button"
				aria-label="Stop"
				aria-pressed={isStopped}
				onClick={handleStop}
				className="
					h-10 w-10
					group rounded-full bg-transparent p-0
					focus-visible:outline-2 outline-offset-2 outline-secondary-14
			">
				<Stop_Icon isActive={isStopped ? 0 : 1} />
			</button>
		</div>
	)
}

export default Transport;
