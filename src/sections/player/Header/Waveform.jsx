import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = forwardRef(({wavesurferRef, masterPath, handleSeek, setDuration}, ref) => {
    const containerRef = useRef();
    const ws = useRef();
    const isDragging = useRef(false);

    useImperativeHandle(wavesurferRef || ref, () => ws.current);

    const getTimeFromEvent = (e) => {
        if (!ws.current) return 0;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const percentage = Math.max(0, Math.min(1, x / width));
        return percentage * ws.current.getDuration();
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

    useEffect(() => {
        if (!masterPath)
			return;

        const wavesurfer = WaveSurfer.create({
            container: containerRef.current,
            waveColor: '#93BCED',
            progressColor: '#728093',
            cursorColor: 'transparent',
            height: 50,
            responsive: true,
            dragToSeek: false,
            interact: false,
        });

        ws.current = wavesurfer;
		const loadPromise = wavesurfer.load(masterPath);

        wavesurfer.on('ready', () => setDuration(wavesurfer.getDuration()));

        return () => {
			wavesurfer.unAll();
			loadPromise.catch((err) => {
				if (err.name === 'AbortError') {
					return;
				}
				console.warn("WaveSurfer load aborted or failed:", err.message);
			});
			try {
				wavesurfer.destroy();
			} catch (e) {
				console.warn("WaveSurfer destroyed during active load, safely ignored.");
			}
		};
    }, [masterPath, setDuration]);

    return (
        <div 
            ref={containerRef} 
            className='w-full h-[60px] cursor-pointer touch-none'
            onPointerDown={onClickDown}
            onPointerMove={onClickDrag}
            onPointerUp={onClickUp}
        />
    )
});

export default Waveform;