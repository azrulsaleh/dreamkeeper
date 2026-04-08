import { useState } from 'react';
// import * as Tone from 'tone';
import { Pause_Button, Play_Button, Stop_Button } from './svg/Vector';

function App() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(1694);
	const [currentTrack, setCurrentTrack] = useState(0);
	const [currentMode, setCurrentMode] = useState('loop');
	const [currentFilter, setCurrentFilter] = useState('gentle');
	const [currentNoise, setCurrentNoise] = useState('white');
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

	const handleMode = (type) => {
		if (currentMode !== type)
			setCurrentMode(type);
	}
	const handleFilter = (type) => {
		if (currentFilter !== type)
			setCurrentFilter(type);
	}
	const handleNoise = (type) => {
		if (currentNoise !== type)
			setCurrentNoise(type);
	}

	return (
		<section className='h-screen flex justify-center items-center'>
			<div className='_bg-card w-[850px] h-[560px]'>
			{/* <div className='_bg-card flex flex-col gap-5'> */}
				{/* header */}
				<div className='flex h-[190px] p-[20px]'>
				{/* <div className='flex flex-row gap-8'> */}
					{/* artwork */}
					<img
						className='rounded-md w-[150px] h-[150px]'
						src='artwork.jpg'
						alt='Album Cover'
					/>
					{/* space */}
					<div className='w-[20px] h-full' />
					{/* info */}
					<div className='w-full h-full'>
					{/* <div className='flex-1 flex flex-col gap-2'> */}
						<div className='w-full h-[60px] flex flex-row justify-between'>
						{/* <div className='border border-slate-400 h-full'> */}
							{/* title */}
							<div className='w-[450px] h-full'>
								<div className='h-[30px] flex items-center'>
									<h2>{playlist[currentTrack].title}</h2>
								</div>
								<div className='h-[30px] flex items-center'>
									<h4>{formatTime(currentTime)} / {formatTime(duration)}</h4>
								</div>
							</div>
							{/* transport */}
							<div className='w-[190px] h-full flex justify-center gap-2'>
							{/* <div className='flex gap-1 justify-end'> */}
								<button onClick={handlePlay}>
									<Play_Button w={40} h={40} />
								</button>
								<button onClick={handlePause}>
									<Pause_Button w={70} h={40} />
								</button>
								<button onClick={handleStop} >
									<Stop_Button w={40} h={40} />
								</button>
							</div>
						</div>
						{/* waveform */}
						<div className='h-[60px] py-2'>
							<div className='border border-slate-400 rounded-sm h-full'></div>
						</div>
						{/* seek */}
						<div className='h-[30px] flex gap-4 items-center'>
							<h4>{formatTime(currentTime)}</h4>
							<input
								type="range"
								className="_slider-h w-full"
							/>
						</div>
					</div>
				</div>
				{/* body */}
				<div className='w-full h-[370px] flex flex-row'>
					<div className='w-[640px] h-full flex flex-col'>
						{/* mode */}
						<div className='w-full h-[30px]'>
						{/* <div className='flex h-8 items-center'> */}
							<div className='_radio-bg w-[300px] h-full flex mx-auto shadow-lg border border-white'>
							{/* <div className='_radio-bg flex w-100 justify-center'> */}
								<button
									onClick={() => handleMode('loop')}
									className={`
										_radio-button
										${currentMode === 'loop'
											? '_radio-on'
											: '_radio-off'
										}
									`}
								>
									Music All Night
								</button>
								<button
									onClick={() => handleMode('once')}
									className={`
										_radio-button
										${currentMode === 'once'
											? '_radio-on'
											: '_radio-off'
										}
									`}
								>
									Music Once
								</button>
							</div>
						</div>
						{/* sliders */}
						<div className='w-full h-[260px] flex space-x-[30px] px-[35px] py-[20px]'>
						{/* <div className='flex space-x-4 mx-auto text-center items-center justify-center'> */}
							<div className='_bg-volume'>
								<h3 className='text-center'>Piano</h3>
								<div className='_bg-slider'>
									<input
										type="range"
										className="_slider-v"
									/>
								</div>
							</div>
							<div className='_bg-volume'>
								<h3 className='text-center'>Cello</h3>
								<div className='_bg-slider'>
									<input
										type="range"
										className="_slider-v"
									/>
								</div>
							</div>
							<div className='_bg-volume'>
								<h3 className='text-center'>Vocals</h3>
								<div className='_bg-slider'>
									<input
										type="range"
										className="_slider-v"
									/>
								</div>
							</div>
							<div className='_bg-volume'>
								<h3 className='text-center'>Ambience</h3>
								<div className='_bg-slider'>
									<input
										type="range"
										className="_slider-v"
									/>
								</div>
							</div>
						</div>
						{/* filters */}
						<div className='w-full h-[80px] px-[20px] pb-[20px]'>
							<div className='w-full h-[30px] flex items-center'>
								<label>Filter</label>
							</div>
							<div className='h-[30px]'>
							{/* <div className='_radio-bg flex w-100 ml-0'> */}
								<div className='_radio-tabs bg-white w-[100px] h-[30px] z-20'/>
								<div className='_radio-tabs bg-white/50  w-[200px] h-[30px] z-10'/>
								<div className='_radio-tabs bg-white/5  w-[300px] h-[30px] z-0'/>
								<div className='_radio-bg flex w-[300px] h-full items-center justify-center'>
									<button
										onClick={() => handleFilter('gentle')}
										className={`
											_radio-button
											${currentFilter === 'gentle'
												? '_radio-on'
												: '_radio-off'
											}
										`}
									>
										Gentle
									</button>
									<button
										onClick={() => handleFilter('warm')}
										className={`
											_radio-button
											${currentFilter === 'warm'
												? '_radio-on'
												: '_radio-off'
											}
										`}
									>
										Warm
									</button>
									<button
										onClick={() => handleFilter('deep')}
										className={`
											_radio-button
											${currentFilter === 'deep'
												? '_radio-on'
												: '_radio-off'
											}
										`}
									>
										Deep
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className='w-[210px] h-full border-l border-black/5'>
						<div className='w-full h-[30px]'></div>
						<div className='w-full h-[260px] px-[45px] py-[20px] flex'>
							<div className='_bg-volume'>
								<h3 className='text-center'>Noise</h3>
								<div className='_bg-slider'>
									<input
										type="range"
										className="_slider-v"
									/>
								</div>
							</div>
						</div>
						<div className='w-full h-[80px]'>
							{/* noise */}
							<div className='w-full h-[80px] px-[30px] pb-[20px]'>
								<div className='w-full h-[30px] flex items-center'>
									<label>Noise Type</label>
								</div>
								<div className='h-[30px]'>
								{/* <div className='_radio-bg flex w-100 ml-0'> */}
									<div className='_radio-tabs bg-red w-[50px] h-[30px] z-20'/>
									<div className='_radio-tabs bg-white/50  w-[100px] h-[30px] z-10'/>
									<div className='_radio-tabs bg-white/5  w-[150px] h-[30px] z-0'/>
									<div className='_radio-bg flex w-[150px] h-full items-center justify-center'>
										<button
											onClick={() => handleNoise('white')}
											className={`
												_radio-button
												${currentNoise === 'white'
													? '_radio-on'
													: '_radio-off text-sky-600/70'
												}
											`}
										>
											White
										</button>
										<button
											onClick={() => handleNoise('pink')}
											className={`
												_radio-button
												${currentNoise === 'pink'
													? '_radio-on bg-pink-700/50'
													: '_radio-off text-pink-500/70'
												}
											`}
										>
											Pink
										</button>
										<button
											onClick={() => handleNoise('brown')}
											className={`
												_radio-button
												${currentNoise === 'brown'
													? '_radio-on bg-amber-700/50'
													: '_radio-off text-amber-700/70'
												}
											`}
										>
											Brown
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <div className='flex h-120'> */}
					{/* <div className='flex-1 h-full space-y-4'>
						<div className='flex flex-col space-y-2'>
						</div>
					</div> */}
					{/* noise */}
					{/* <div className='flex flex-col h-full'> */}
					{/* <div className='border w-[210px] h-[370px]'>
						<div className='h-8 bg-amber-400' />
						<div className='py-8 flex justify-center'>
							<div className='_bg-subcard text-center bg-red-400'>
								<h5>Noise</h5>
								<div className='_bg-slider'>
									<input
										type="range"
										className="_slider-v"
									/>
								</div>
							</div>
						</div>
						<div className='flex flex-col space-y-2 bg-blue-400 '>
							<label>Noise Type</label>
							<div className='_radio-bg flex w-50 ml-0'>
								<button className='_radio-button'>
									White
								</button>
								<button className='_radio-button'>
									Pink
								</button>
								<button className='_radio-button'>
									Brown
								</button>
							</div>
						</div>
					</div> */}
				{/* </div> */}
			</div>
		</section>
	)
}

export default App
