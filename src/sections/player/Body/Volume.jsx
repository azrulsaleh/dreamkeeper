import { Bg_Stems, Bg_Noise } from '../../../svg/Vector'

export function Volume_Stems({
	volumes, handleVolumeChange
}) {
	const OPTIONS = [
		{ label: 'Piano' },
		{ label: 'Cello' },
		{ label: 'Vocals' },
		{ label: 'Ambience' },
	];

	return (
		// <div className='flex flex-col min-[660px]:flex-row gap-[5px]'>
		<div className='bento_stems'>
			{OPTIONS.map((stem, index) => {
				const min = -60;
				const max = 6;
				const percentage = ((volumes[index] - min) / (max - min)) * 100;

				return (
					<div key={stem.label} className='_parent _bg-volume my-auto'>
						<div className='_child z-10'>
							<h4 className='text-center pt-3'>{stem.label}</h4>
							<div className='_bg-slider'>
								<input
									type="range"
									min={min}
									max={max}
									step="1"
									value={volumes[index]}
									onChange={(e) => handleVolumeChange(index, parseFloat(e.target.value))}
									className="_slider-v"
									style={{ '--value': `${percentage}%` }}
								/>
							</div>
						</div>
						<div className="_child z-0">
							<Bg_Stems />
						</div>
					</div>
				);
			})}
		</div>
	)
}

export function Volume_Noise({
	noiseVolume, handleNoiseVolumeChange
}) {
	const min = -60;
	const max = 6;
	const percentage = ((noiseVolume - min) / (max - min)) * 100;
	return (
		<div className='_parent _bg-volume my-auto'>
			<div className='_child z-10'>
				<h4 className='text-center pt-3'>Noise</h4>
				<div className='_bg-slider'>
					<input
						type="range"
						min={min}
						max={max}
						step="1"
						value={noiseVolume}
						onChange={(e) => handleNoiseVolumeChange(parseFloat(e.target.value))}
						className="_slider-v"
						style={{ '--value': `${percentage}%` }}
					/>
				</div>
			</div>
			<div className="_child z-0">
				<Bg_Noise/>
			</div>
		</div>
	)
}