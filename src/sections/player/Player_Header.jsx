import { useState, useRef, useEffect, forwardRef } from 'react';
import * as Tone from 'tone';
import Transport from './Header/Transport'
import Waveform from './Header/Waveform'

const Player_Header = ({
	wavesurferRef,
	handlePlay, handlePause, handleStop, handleSeek,
	duration, setDuration, currentTime, formatTime, elapsedTime1, elapsedTime2,
	transportState, title, masterPath
}) => {
    const isDragging = useRef(false);

	const onClickDown = (e) => {
		isDragging.current = true;
        const time = parseFloat(e.target.value);
        handleSeek(time, true);
		console.log("a");
    };
	const onClickDrag = (e) => {
		if (!isDragging.current)
            return;
        const time = parseFloat(e.target.value);
        handleSeek(time, true);
		console.log("b");
    };
    const onClickUp = (e) => {
		if (!isDragging.current)
            return;
        isDragging.current = false;
		const time = parseFloat(e.target.value);
        handleSeek(time, false);
		console.log("c");
    };

	return (
		<div className='flex h-[190px] p-[20px] border-b border-black/5'>
			<div className='rounded-md w-[150px] h-[150px] bg-slate-900'>
				<img
					src='artwork.jpg'
					alt='Album Cover'
					className='rounded-md'
				/>
			</div>
			<div className='w-[20px] h-full' />
			<div className='w-[640px] h-full'>
				<div className='w-full h-[60px] flex flex-row justify-between'>
					<div className='w-[450px] h-full'>
						<div className='h-[30px] flex items-center'>
							<h2>{title}</h2>
						</div>
						<div className='h-[30px] flex items-center'>
							<h4><span ref={elapsedTime1}>0:00</span> / {formatTime(duration)}</h4>
						</div>
					</div>
					<Transport
						transportState={transportState}
						handlePlay={handlePlay}
						handlePause={handlePause}
						handleStop={handleStop}
					/>
				</div>
				<div className='h-[60px] py-2'>
					<Waveform
						wavesurferRef={wavesurferRef}
						masterPath={masterPath}
						handleSeek={handleSeek}
						setDuration={setDuration}
					/>
				</div>
				<div className='h-[30px] flex gap-4 items-center'>
					<h4 ref={elapsedTime2}>0:00</h4>
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
		</div>
	)
};

export default Player_Header;