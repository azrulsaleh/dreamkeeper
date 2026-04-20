import { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import WaveSurfer from 'wavesurfer.js';

function Waveform({ mainStemUrl, onDurationReady, isPlaying, setIsPlaying, currentTime, setCurrentTime }) {
	const containerRef = useRef(null);
	const waveSurferRef = useRef(null);
	const isInteracting = useRef(false);

	const tp = Tone.getTransport();

	useEffect(() => {
		const ws = WaveSurfer.create({
			container: containerRef.current,
			height: 50,
			waveColor: '#93BCED',
			url: mainStemUrl,
			progressColor: '#728093',
			cursorColor: 'transparent',
			dragToSeek: true,
			interact: true,
			backend: 'WebAudio',
			audioContext: Tone.getContext().rawContext,
		});

		waveSurferRef.current = ws;
		waveSurferRef.current.setVolume(0);

		ws.on('ready', () => {
			onDurationReady(ws.getDuration());
		});
		ws.on('interaction', (newTime) => {
            tp.seconds = newTime;
			setCurrentTime(newTime);
        });
		ws.on('timeupdate', (newTime) => {
            if (isInteracting.current) {
                tp.seconds = newTime;
				setCurrentTime(newTime);
			}
        });
		
		const handlePointerDown = () => {
			isInteracting.current = true;
			if (tp.state === 'started') {
				tp.pause();
				setIsPlaying(false);
				Tone.getDestination().volume.rampTo(-Infinity, 0.05);
			}
		};
		const handleGlobalPointerUp = () => {
			if (isInteracting.current) {
				isInteracting.current = false;
				
				setCurrentTime(tp.seconds);

				if (tp.state === 'paused') {
					Tone.getDestination().volume.rampTo(0, 0.1);
					setIsPlaying(true);
					tp.start();
				}
			}
		};

		const container = containerRef.current;
		container.addEventListener('pointerdown', handlePointerDown, { passive: true });
		window.addEventListener('pointerup', handleGlobalPointerUp, { passive: true });

		return () => {
			container.removeEventListener('pointerdown', handlePointerDown);
			window.removeEventListener('pointerup', handleGlobalPointerUp);
			ws.destroy();
		};
	}, [mainStemUrl]);

	useEffect(() => {
		if (waveSurferRef.current && !isInteracting.current)
			waveSurferRef.current.setTime(tp.seconds);

		if (!isPlaying || isInteracting.current)
			return;

		let animationId;
		const syncWaveform = () => {
			if (waveSurferRef.current && isPlaying && !isInteracting.current) {
				const toneTime = tp.seconds;
				const wsTime = waveSurferRef.current.getCurrentTime();

				if (Math.abs(toneTime - wsTime) > 0.1)
					waveSurferRef.current.setTime(toneTime);
			}
			if (isPlaying)
				animationId = requestAnimationFrame(syncWaveform);
		};

		if (isPlaying)
			animationId = requestAnimationFrame(syncWaveform);
		return () => cancelAnimationFrame(animationId);
	}, [isPlaying, tp.seconds]);

	useEffect(() => {
		if (waveSurferRef.current && !isInteracting.current)
			waveSurferRef.current.setTime(currentTime);
	}, [currentTime]);

	return <div ref={containerRef} className="w-full h-[60px]" />;
}

export default Waveform;
