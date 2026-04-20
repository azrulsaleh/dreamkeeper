import { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import WaveSurfer from 'wavesurfer.js';

function Waveform({ mainStemUrl, isPlaying, onDurationReady }) {
	const containerRef = useRef(null);
	const waveSurferRef = useRef(null);

	useEffect(() => {
		let isMounted = true;
		const ws = WaveSurfer.create({
			container: containerRef.current,
			height: 50,
			waveColor: '#93BCED',
			url: mainStemUrl,
			progressColor: '#728093',
			cursorColor: 'transparent',
			interact: true,
			backend: 'WebAudio',
			audioContext: Tone.getContext().rawContext,
		});

		waveSurferRef.current = ws;
		waveSurferRef.current.setVolume(0);
		waveSurferRef.current.on('interaction', (newTime) => {
			Tone.getTransport().seconds = newTime;
		});
		waveSurferRef.current.on('ready', () => {
			const totalSeconds = waveSurferRef.current.getDuration();
			onDurationReady(totalSeconds);
			console.log('mix.opus loaded successfully');
		});

		return () => {
			isMounted = false;
			if (waveSurferRef.current) {
				waveSurferRef.current.destroy();
				waveSurferRef.current = null;
			}
		};
	}, [mainStemUrl]);

	useEffect(() => {
		let animationId;

		const syncWaveform = () => {
			if (waveSurferRef.current && isPlaying) {
				const currentTime = Tone.getTransport().seconds;
				const duration = waveSurferRef.current.getDuration();
				
				if (duration > 0)
					waveSurferRef.current.setTime(currentTime);
			}
			animationId = requestAnimationFrame(syncWaveform);
		};

		if (isPlaying)
			syncWaveform();
		else
			cancelAnimationFrame(animationId);

		return () => cancelAnimationFrame(animationId);
	}, [isPlaying]);

	return <div ref={containerRef} className="w-full h-[60px]" />;
}

export default Waveform;
