import { useState, useRef, useEffect, forwardRef } from 'react';
import * as Tone from 'tone';
import Transport from './Header/Transport'
import Waveform from './Header/Waveform'

const Player_Header = ({
	wavesurferRef, waveformPeaks,
	handlePlay, handlePause, handleStop, handleSeek,
	duration, currentTime, formatTime, elapsedTime1, elapsedTime2,
	transportState, title
}) => {
	const isDragging = useRef(false);

	const onClickDown = (e) => {
		isDragging.current = true;
		const time = parseFloat(e.target.value);
		handleSeek(time, true);
	};
	const onClickDrag = (e) => {
		if (!isDragging.current)
			return;
		const time = parseFloat(e.target.value);
		handleSeek(time, true);
	};
	const onClickUp = (e) => {
		if (!isDragging.current)
			return;
		isDragging.current = false;
		const time = parseFloat(e.target.value);
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
					flex flex-col gap-1
					w-full
				'>
					<h1 className="text-neutral-7">{title}</h1>
					<h4 className='text-primary-10'>
						<span ref={elapsedTime1}>0:00</span> / {formatTime(duration)}
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
					<h4 ref={elapsedTime2}>0:00</h4>
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