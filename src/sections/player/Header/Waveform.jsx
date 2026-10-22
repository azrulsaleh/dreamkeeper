import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = forwardRef(({wavesurferRef, handleSeek, duration, waveformPeaks}, ref) => {
	const containerRef = useRef();
	const ws = useRef();
	const isDragging = useRef(false);

	useImperativeHandle(wavesurferRef || ref, () => ws.current);

	const getTimeFromEvent = (e) => {
		if (!ws.current)
			return 0;
		const rect = containerRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const width = rect.width;
		const percentage = Math.max(0, Math.min(1, x / width));
		return percentage * duration;
	};
	const onClickDown = (e) => {
		isDragging.current = true;
		containerRef.current.setPointerCapture(e.pointerId);
		const time = getTimeFromEvent(e);
		handleSeek(time, true);
	};
	const onClickDrag = (e) => {
		if (!isDragging.current)
			return;
		const time = getTimeFromEvent(e);
		handleSeek(time, true);
	};
	const onClickUp = (e) => {
		if (!isDragging.current)
			return;
		isDragging.current = false;
		containerRef.current.releasePointerCapture(e.pointerId);
		const time = getTimeFromEvent(e);
		handleSeek(time, false);
	};

	const styles = getComputedStyle(document.documentElement);
	const accentHex = styles.getPropertyValue('--color-primary-10').trim();
	const progressHex = styles.getPropertyValue('--color-primary-7').trim();
	useEffect(() => {
		const wavesurfer = WaveSurfer.create({
			container: containerRef.current,
			waveColor: accentHex,
			progressColor: progressHex,
			cursorColor: 'transparent',
			height: 40,
			barWidth: 4,
			barGap: 4,
			barRadius: 4,
			peaks: waveformPeaks,
			duration: duration,
			responsive: true,
			dragToSeek: false,
			interact: false,
		});

		ws.current = wavesurfer;
		console.log("Waveform drawn");
		return () => {
			wavesurfer.unAll();
			try {
				wavesurfer.destroy();
				console.log("Waveform destroyed");
			} catch (e) {
				console.warn("WaveSurfer destroyed during active load, safely ignored.");
			}
		};
	}, []);

	return (
		<div 
			ref={containerRef} 
			className='w-full h-15 cursor-pointer touch-none'
			onPointerDown={onClickDown}
			onPointerMove={onClickDrag}
			onPointerUp={onClickUp}
		/>
	)
});

export default Waveform;