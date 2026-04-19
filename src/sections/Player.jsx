import { useState } from 'react';
// import * as Tone from 'tone';
// import WaveSurfer from 'wavesurfer.js';
import Player_Header from './player/Player_Header'

function Player() {
	const [loop, setLoop] = useState(true);
	const [filterType, setFilterType] = useState('gentle');
	const [noiseType, setNoiseType] = useState('white');
	
	const formatTime = (seconds) => {
		const min = Math.floor(seconds / 60);
		const sec = Math.floor(seconds % 60);
		return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
	}

	const handleFilter = (type) => {
		if (filterType !== type)
			setFilterType(type);
	}
	const handleNoise = (type) => {
		if (noiseType !== type)
			setNoiseType(type);
	}

	return (
		<div className='_bg-card w-[850px] h-[560px]'>
			<Player_Header />
			{/* body */}
			<div className='w-full h-[370px] flex flex-row'>
				{/* stems */}
				<div className='w-[640px] h-full flex flex-col'>
					{/* mode */}
					<div className='w-full h-[30px] relative flex'>
						<hr className='absolute top-1/2 translate-y-1/2 z-0 w-full text-black/5' />
						<div className='_radio-bg w-[300px] h-full flex mx-auto shadow-lg border border-white'>
							<button
								onClick={() => setLoop(true)}
								className={`
									_radio-button
									${loop ? '_radio-on' : '_radio-off'}
								`}
							>
								Music All Night
							</button>
							<button
								onClick={() => setLoop(false)}
								className={`
									_radio-button
									${!loop	? '_radio-on' : '_radio-off'}
								`}
							>
								Music Once
							</button>
						</div>
					</div>
					{/* sliders */}
					<div className='w-full h-[260px] flex space-x-[30px] px-[35px] py-[20px]'>
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
							<div className='_radio-tabs bg-white w-[100px] h-[30px] z-20'/>
							<div className='_radio-tabs bg-white/50  w-[200px] h-[30px] z-10'/>
							<div className='_radio-tabs bg-white/5  w-[300px] h-[30px] z-0'/>
							<div className='_radio-bg flex w-[300px] h-full items-center justify-center'>
								<button
									onClick={() => handleFilter('gentle')}
									className={`
										_radio-button
										${filterType === 'gentle'
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
										${filterType === 'warm'
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
										${filterType === 'deep'
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
				{/* noise */}
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
								<div className='_radio-tabs bg-red w-[50px] h-[30px] z-20'/>
								<div className='_radio-tabs bg-white/50  w-[100px] h-[30px] z-10'/>
								<div className='_radio-tabs bg-white/5  w-[150px] h-[30px] z-0'/>
								<div className='_radio-bg flex w-[150px] h-full items-center justify-center'>
									<button
										onClick={() => handleNoise('white')}
										className={`
											_radio-button
											${noiseType === 'white'
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
											${noiseType === 'pink'
												? '_radio-on bg-pink-700/50'
												: '_radio-off text-pink-500/70 hover:text-pink-500/50'
											}
										`}
									>
										Pink
									</button>
									<button
										onClick={() => handleNoise('brown')}
										className={`
											_radio-button
											${noiseType === 'brown'
												? '_radio-on bg-amber-700/50'
												: '_radio-off text-amber-700/70 hover:text-amber-500/50'
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
		</div>
	)
}

export default Player;