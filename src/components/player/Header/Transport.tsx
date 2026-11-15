import { useRef, type KeyboardEvent } from 'react';
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
	const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

	const isPlaying = transportState === "started";
	const isPaused = transportState === "paused";
	const isStopped = transportState === "stopped";

	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
		if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')
			return;

		event.preventDefault();
		const nextIndex = index + (event.key === 'ArrowRight' ? 1 : -1);
		if (nextIndex < 0 || nextIndex >= 3)
			return;

		buttonRefs.current[nextIndex]?.focus();
	}

	// Each button dims when its corresponding transport state is active.
	return (
		<div className='
			flex place-content-center place-items-center gap-2
			h-auto w-72
		'>
			<button
				type="button"
				ref={(element) => { buttonRefs.current[0] = element }}
				aria-label="Play"
				aria-pressed={isPlaying}
				onKeyDown={(event) => handleKeyDown(event, 0)}
				onClick={handlePlay}
				className="h-10 w-10 group _transport-button rounded-full p-0">
				<Play_Icon isActive={isPlaying ? 0 : 1} />
			</button>
			<button
				type="button"
				ref={(element) => { buttonRefs.current[1] = element }}
				aria-label="Pause"
				aria-pressed={isPaused}
				onKeyDown={(event) => handleKeyDown(event, 1)}
				onClick={handlePause}
				className="h-10 w-10 group _transport-button rounded-full p-0">
				<Pause_Icon isActive={isPaused ? 0 : 1} />
			</button>
			<button
				type="button"
				ref={(element) => { buttonRefs.current[2] = element }}
				aria-label="Stop"
				aria-pressed={isStopped}
				onKeyDown={(event) => handleKeyDown(event, 2)}
				onClick={handleStop}
				className="h-10 w-10 group _transport-button rounded-full p-0">
				<Stop_Icon isActive={isStopped ? 0 : 1} />
			</button>
		</div>
	)
}

export default Transport;
