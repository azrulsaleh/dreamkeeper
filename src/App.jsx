import { useState } from 'react';
// import * as Tone from 'tone';
import { Pause_Button, Play_Button, Stop_Button } from './svg/Vector';

function App() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(1000);
	const [currentTrack, setCurrentTrack] = useState(0);
	const playlist = [
		{ id: 1, title: 'Track 1', duration: 1694 },
		{ id: 2, title: 'Track 2', duration: 1800 },
		{ id: 3, title: 'Track 3', duration: 1920 }
	];
	
	const handlePlay = async () => {
		// await Tone.start();
		setIsPlaying(true);
		console.log('isPlaying: ' + isPlaying + ' currentTime: ' + currentTime);
	};
	const handlePause = () => {
		setIsPlaying(false);
		console.log('isPlaying: ' + isPlaying + ' currentTime: ' + currentTime);
	};
	const handleStop = () => {
		setIsPlaying(false);
		setCurrentTime(0);
		console.log('isPlaying: ' + isPlaying + ' currentTime: ' + currentTime);
	};

	return (
		<section className="h-screen flex justify-center items-center">
			<div className="_bg-card">
				<div className="flex gap-8">
					<img
						src="artwork.jpg"
						alt="Album Cover"
					/>
					<div>
						<h1 className="text-5xl">
							{playlist[currentTrack].title}
						</h1>
						<h5>
							{currentTime} / {playlist[currentTrack].duration}
						</h5>
					</div>
					<div className="flex gap-4">
						<button
							onClick={handlePlay}
						>
							<Play_Button
								w={40}
								h={40}
							/>
						</button>
						<button
							onClick={handlePause}
						>
							<Pause_Button
								w={70}
								h={40}
							/>
						</button>
						<button
							onClick={handleStop}
						>
							<Stop_Button
								w={40}
								h={40}
							/>
						</button>
					</div>
				</div>
				{/* <h1 className="text-center">
					<span className="text-sky-800">DREAM</span>
					<span className="font-extralight text-cyan-700">KEEPER</span>
				</h1> */}
				{/* Header Section */}
				{/* Header Section */}

			</div>
		</section>
	)
}

export default App
