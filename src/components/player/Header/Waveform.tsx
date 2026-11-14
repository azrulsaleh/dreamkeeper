import { useEffect, useRef } from 'react';
import type { PointerEvent, RefObject } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface WaveformProps {
	wavesurferRef: RefObject<WaveSurfer | null>;
	handleSeek: (time: number, isDragging: boolean) => void;
	duration: number;
	waveformPeaks: number[];
}

const Waveform = ({wavesurferRef, handleSeek, duration, waveformPeaks}: WaveformProps) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const ws = useRef<WaveSurfer | null>(null);
	const isDragging = useRef(false);

	const getTimeFromEvent = (e: PointerEvent<HTMLDivElement>) => {
		if (!ws.current || !containerRef.current)
			return 0;
		const rect = containerRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const width = rect.width;
		// Clamp pointer positions so dragging beyond the waveform stays within the track.
		const percentage = Math.max(0, Math.min(1, x / width));
		return percentage * duration;
	};
	const onClickDown = (e: PointerEvent<HTMLDivElement>) => {
		isDragging.current = true;
		// Pointer capture keeps the drag active if the pointer leaves the waveform.
		containerRef.current?.setPointerCapture(e.pointerId);
		const time = getTimeFromEvent(e);
		handleSeek(time, true);
	};
	const onClickDrag = (e: PointerEvent<HTMLDivElement>) => {
		if (!isDragging.current)
			return;
		const time = getTimeFromEvent(e);
		handleSeek(time, true);
	};
	const onClickUp = (e: PointerEvent<HTMLDivElement>) => {
		if (!isDragging.current)
			return;
		isDragging.current = false;
		containerRef.current?.releasePointerCapture(e.pointerId);
		const time = getTimeFromEvent(e);
		handleSeek(time, false);
	};

	const styles = getComputedStyle(document.documentElement);
	const accentHex = styles.getPropertyValue('--color-primary-10').trim();
	const progressHex = styles.getPropertyValue('--color-primary-7').trim();
	useEffect(() => {
		if (!containerRef.current)
			return;

		const wavesurfer = WaveSurfer.create({
			container: containerRef.current,
			waveColor: accentHex,
			progressColor: progressHex,
			cursorColor: 'transparent',
			height: 40,
			barWidth: 4,
			barGap: 4,
			barRadius: 4,
			peaks: [waveformPeaks],
			duration: duration,
			dragToSeek: false,
			interact: false,
		});

		ws.current = wavesurfer;
		wavesurferRef.current = wavesurfer;
		return () => {
			if (wavesurferRef.current === wavesurfer)
				wavesurferRef.current = null;
			ws.current = null;
			wavesurfer.unAll();
			try {
				wavesurfer.destroy();
			} catch {
				console.warn("WaveSurfer destroyed during active load, safely ignored.");
			}
		};
		// The parent keys this component by track, so the options remain fixed for its lifetime.
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
};

export default Waveform;
