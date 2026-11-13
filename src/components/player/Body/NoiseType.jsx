function NoiseType({activeNoise, handleNoiseChange}) {
	const types = [
		{
			id: 'white',
			label: 'White',
		},
		{
			id: 'pink',
			label: 'Pink',
		},
		{
			id: 'brown',
			label: 'Brown',
		}
	];

	return (
		<div className='flex flex-col'>
			<h3 className='pl-2.5 h-6.25 text-neutral-7'>Noise Type</h3>
			<div className='grid-container flex-1 max-w-75 h-6.25'>
				<div className='child z-10 _radio-buttons w-54'>
					{types.map((n) => (
						<button
							key={n.id}
							onClick={() => handleNoiseChange(n.id)}
							className={`
								_radio-button flex-1 max-w-25
								hover:border-2 hover:border-primary-18
								${
									activeNoise === n.id
									? '_radio-on'
									: '_radio-off'
								}
							`}
						>
							<h4>{n.label}</h4>
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

export default NoiseType;