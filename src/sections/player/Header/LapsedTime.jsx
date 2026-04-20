import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";

const TimeDisplay = () => {
	const [seconds, setSeconds] = useState(0);
	const requestRef = useRef();

	const animate = () => {
		setSeconds(Tone.getTransport().seconds);
		requestRef.current = requestAnimationFrame(animate);
	};

	useEffect(() => {
		requestRef.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(requestRef.current);
	}, []);

	const formatTime = (secs) => {
		const mins = Math.floor(secs / 60);
		const s = Math.floor(secs % 60);
		return `${mins}:${s < 10 ? "0" : ""}${s}`;
	};

	return (formatTime(seconds));
};

export default TimeDisplay;