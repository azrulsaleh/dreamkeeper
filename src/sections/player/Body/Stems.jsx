export function Volume_Stems({volumes, handleVolumeChange}) {
	const OPTIONS = [
		{ label: 'Piano' },
		{ label: 'Cello' },
		{ label: 'Vocals' },
		{ label: 'Ambience' },
	];

	return (
		<>
			{OPTIONS.map((stem, index) => (
				<div key={stem.label} className='_bg-volume'>
					<h3 className='text-center'>{stem.label}</h3>
					<div className='_bg-slider'>
						<input
							type="range"
							min="-60"
							max="6"
							step="1"
							value={volumes[index]}
							onChange={(e) => handleVolumeChange(index, parseFloat(e.target.value))}
							className="_slider-v"
						/>
					</div>
				</div>
			))}
		</>
	)
}

export function Volume_Noise() {
	return (
		<div className='_bg-volume'>
			<h3 className='text-center'>Noise</h3>
			<div className='_bg-slider'>
				<input
					type="range"
					className="_slider-v"
				/>
			</div>
		</div>
	)
}