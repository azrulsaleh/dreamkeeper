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
        });
		ws.on('timeupdate', (newTime) => {
            if (isInteracting.current)
                tp.seconds = newTime;
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
				if (tp.state === 'paused') {
					Tone.getDestination().volume.rampTo(0, 0.1);
					setIsPlaying(true);
					tp.start();
				}
			}
		};

		const container = containerRef.current;
		container.addEventListener('pointerdown', handlePointerDown);
		window.addEventListener('pointerup', handleGlobalPointerUp);

		return () => {
			container.removeEventListener('pointerdown', handlePointerDown);
			window.removeEventListener('pointerup', handleGlobalPointerUp);
			ws.destroy();
		};
	}, [mainStemUrl]);

	useEffect(() => {
		let animationId;

		const syncWaveform = () => {
			if (waveSurferRef.current && isPlaying && !isInteracting.current) {
				const toneTime = tp.seconds;
				const wsTime = waveSurferRef.current.getCurrentTime();

				if (Math.abs(toneTime - wsTime) > 0.01)
					waveSurferRef.current.setTime(toneTime);
			}
			animationId = requestAnimationFrame(syncWaveform);
		};

		animationId = requestAnimationFrame(syncWaveform);
		return () => cancelAnimationFrame(animationId);
	}, [isPlaying]);

	return <div ref={containerRef} className="w-full h-[60px]" />;
}

export default Waveform;
