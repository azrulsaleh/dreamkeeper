import { useRef } from 'react';
import type { RefObject, SyntheticEvent } from 'react';
import WaveSurfer from 'wavesurfer.js';
import Transport from './Header/Transport'
import Waveform from './Header/Waveform'
import type { TransportState } from '../../types'

interface PlayerHeaderProps {
	wavesurferRef: RefObject<WaveSurfer | null>;
	waveformPeaks: number[];
	handlePlay: () => void | Promise<void>;
	handlePause: () => void;
	handleStop: () => void;
	handleSeek: (time: number, isDragging: boolean) => void;
	duration: number;
	currentTime: number;
	formatTime: (seconds: number) => string;
	transportState: TransportState;
	title: string;
}

const Player_Header = ({
	wavesurferRef, waveformPeaks,
	handlePlay, handlePause, handleStop, handleSeek,
	duration, currentTime, formatTime,
	transportState, title
}: PlayerHeaderProps) => {
	const isDragging = useRef(false);

	// Keep the slider's preview responsive while dragging, then finalize the seek on release.
	const onClickDown = (e: SyntheticEvent<HTMLInputElement>) => {
		isDragging.current = true;
		const time = parseFloat(e.currentTarget.value);
		handleSeek(time, true);
	};
	const onClickDrag = (e: SyntheticEvent<HTMLInputElement>) => {
		if (!isDragging.current)
			return;
		const time = parseFloat(e.currentTarget.value);
		handleSeek(time, true);
	};
	const onClickUp = (e: SyntheticEvent<HTMLInputElement>) => {
		if (!isDragging.current)
			return;
		isDragging.current = false;
		const time = parseFloat(e.currentTarget.value);
		handleSeek(time, false);
	};

	return (
		<div className='
			flex flex-col gap-1
			p-5
			relative
		'>
			<div className='flex gap-5'>
				<div className='
					flex flex-col place-content-center place-items-center gap-1
					px-3 leading-tight
					text-neutral-7
				'>
					<h2>Dreamkeeper</h2>
					<h4>Player</h4>
				</div>
				<div className="
					w-px h-auto
					bg-[linear-gradient(to_bottom,var(--color-primary-3)_0%,var(--color-primary-5)_20%,var(--color-primary-5)_80%,var(--color-primary-3)_100%)]
				"/>
				<div className='
					flex flex-col gap-1 pl-3
					w-full place-content-center place-items-start
				'>
					<h1 className="text-neutral-7">{title}</h1>
					<h4 className='text-primary-10'>
						{formatTime(currentTime)} / {formatTime(duration)}
					</h4>
				</div>
				<Transport
					transportState={transportState}
					handlePlay={handlePlay}
					handlePause={handlePause}
					handleStop={handleStop}
				/>
			</div>
			<div className='mt-5'>
				<Waveform
					wavesurferRef={wavesurferRef}
					handleSeek={handleSeek}
					duration={duration}
					waveformPeaks={waveformPeaks}
				/>
			</div>
			<div className='
				flex place-content-center place-items-center gap-1
				w-full
			'>
				<div className='w-10 text-neutral-6'>
					<h4>{formatTime(currentTime)}</h4>
				</div>
				<div className='w-full flex place-items-center'>
					<input
						type="range"
						min={0}
						max={duration || 0}
						step={0.1}
						value={currentTime}
						onMouseDown={onClickDown}
						onKeyDown={onClickDown}
						onChange={onClickDrag}
						onMouseUp={onClickUp}
						onKeyUp={onClickUp}
						className="_slider-h w-full"
					/>
				</div>
			</div>
			<div className="
				w-full h-px
				bg-[linear-gradient(to_right,var(--color-primary-3)_0%,var(--color-primary-5)_20%,var(--color-primary-5)_80%,var(--color-primary-3)_100%)]
				absolute bottom-0 left-0
			"/>
		</div>
	)
};

export default Player_Header;
