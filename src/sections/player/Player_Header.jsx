import { useState } from 'react';
import Transport from './Header/Transport'
import Waveform from './Header/Waveform'

function Player_Header() {
	const [tbd, setTbd] = useState(0);
	const [currentTrack, setCurrentTrack] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(1694);

	const playlist = [
		{ id: 1, title: 'Night Bloom', duration: 1694 },
		{ id: 2, title: 'Track 2', duration: 1800 },
		{ id: 3, title: 'Track 3', duration: 1920 }
	];

	const formatTime = (seconds) => {
		const min = Math.floor(seconds / 60);
		const sec = Math.floor(seconds % 60);
		return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
	}

	return (
		<div className='flex h-[190px] p-[20px] border-b border-black/5'>
			<img
				src='artwork.jpg'
				alt='Album Cover'
				className='rounded-md w-[150px] h-[150px]'
			/>
			<div className='w-[20px] h-full' />
			<div className='w-full h-full'>
				<div className='w-full h-[60px] flex flex-row justify-between'>
					<div className='w-[450px] h-full'>
						<div className='h-[30px] flex items-center'>
							<h2>{playlist[currentTrack].title}</h2>
						</div>
						<div className='h-[30px] flex items-center'>
							<h4>{formatTime(currentTime)} / {formatTime(duration)}</h4>
						</div>
					</div>
					<Transport 
						currentTime={currentTime}
						setCurrentTime={setCurrentTime}
					/>
				</div>
				<div className='h-[60px] py-2'>
					<Waveform />
				</div>
				<div className='h-[30px] flex gap-4 items-center'>
					<h4>{formatTime(currentTime)}</h4>
					<input
						type="range"
						value={tbd}
						onChange={(e) => setTbd(e.target.value)}
						className="_slider-h w-full"
					/>
				</div>
			</div>
		</div>
	)
}

export default Player_Header;