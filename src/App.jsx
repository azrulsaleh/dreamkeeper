import { useState } from 'react';
// import * as Tone from 'tone';
import { Pause_Button, Play_Button, Stop_Button } from './svg/Vector';

function App() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(1694);
	const [currentTrack, setCurrentTrack] = useState(0);
	const playlist = [
		{ id: 1, title: 'Night Bloom', duration: 1694 },
		{ id: 2, title: 'Track 2', duration: 1800 },
		{ id: 3, title: 'Track 3', duration: 1920 }
	];
	
	const formatTime = (seconds) => {
		const min = Math.floor(seconds / 60);
		const sec = seconds % 60;
		return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
	}

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
		<section className='h-screen flex justify-center items-center'>
			<div className='_bg-card flex flex-col gap-5'>
				{/* header */}
				<div className='flex flex-row gap-8'>
					{/* artwork */}
					<div className=''>
						<img
							src='artwork.jpg'
							alt='Album Cover'
						/>
					</div>
					<div className='flex-1 flex flex-col gap-2'>
						<div className='flex'>
							{/* title */}
							<div className='w-full'>
								<h2 className='text-3xl'>
									{playlist[currentTrack].title}
								</h2>
								<h5>
									{formatTime(currentTime)} / {formatTime(duration)}
								</h5>
							</div>
							{/* transport */}
							<div className='flex gap-1 justify-end'>
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
						<div className='border border-slate-400 h-full'>
						</div>
						<div className='flex gap-4 items-center'>
							{formatTime(currentTime)}
							<input
								type="range"
								className="_slider-h w-full"
							/>
						</div>
					</div>
				</div>
				{/* body */}
				<div className='flex h-100'>
					{/* stems */}
					<div className='flex-1 h-full space-y-4'>
						<div className='flex h-10 items-center'>
							<div className='_radio-bg'>
								<button className='_radio-button'>
									Music All Night
								</button>
								<button className='_radio-button'>
									Music Once
								</button>
							</div>
						</div>
						<div className='flex space-x-4 mx-auto text-center items-center justify-center'>
							<div className='_bg-subcard'>
								<h5>Piano</h5>
								<div className='_bg-slider'>
									<input
										type="range"
										className="_slider-v"
									/>
								</div>
							</div>
							<div className='_bg-subcard'>
								<h5>Cello</h5>
								<div className='_bg-slider'>
									<input
										type="range"
										className="_slider-v"
									/>
								</div>
							</div>
							<div className='_bg-subcard'>
								<h5>Vocals</h5>
								<div className='_bg-slider'>
									<input
										type="range"
										className="_slider-v"
									/>
								</div>
							</div>
							<div className='_bg-subcard'>
								<h5>Ambience</h5>
								<div className='_bg-slider'>
									<input
										type="range"
										className="_slider-v"
									/>
								</div>
							</div>
						</div>
					</div>
					{/* noise */}
					<div className='flex flex-col h-full'>
						<div className='_radio_bg h-40' />
						<div className='_bg-subcard text-center'>
							<h5>Noise</h5>
							<div className='_bg-slider'>
								<input
									type="range"
									className="_slider-v"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default App
