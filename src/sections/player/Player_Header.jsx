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
		<div className='bento_header p-[20px] border-b border-[var(--color-light-b)]'>
			<div className='[grid-area:box-img] flex justify-center'>
				<img
					src='artwork.jpg'
					alt='Album Cover'
					className='rounded-lg bg-[var(--color-light-b)]'
				/>
			</div>
			<div className='[grid-area:box-gap]' />
			<div className='[grid-area:box-title] max-[659px]:text-center'>
				<h2>{title}</h2>
				<label><span ref={elapsedTime1}>0:00</span> / {formatTime(duration)}</label>
			</div>
			<div className='[grid-area:box-transport] flex justify-center'>
				<Transport
					transportState={transportState}
					handlePlay={handlePlay}
					handlePause={handlePause}
					handleStop={handleStop}
				/>
			</div>
			<div className='[grid-area:box-waveform] pt-[20px] grid-container'>
				<div className='child h-[40px]'>
					<Waveform
						wavesurferRef={wavesurferRef}
						handleSeek={handleSeek}
						duration={duration}
						waveformPeaks={waveformPeaks}
					/>
				</div>
				<hr className='child text-[var(--color-accent-b)]'/>
			</div>
			<div className='[grid-area:box-lapsed] flex items-center'>
				<label ref={elapsedTime2}>0:00</label>
			</div>
			<div className='[grid-area:box-progress]'>
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
			<div className='[grid-area:box-space]' />
		</div>
	)
};

export default Player_Header;