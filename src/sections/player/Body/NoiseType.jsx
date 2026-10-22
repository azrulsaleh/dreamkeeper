function NoiseType({activeNoise, handleNoiseChange}) {
	const types = [
		{
			id: 'white',
			label: 'White',
			bg_on: 'bg-[var(--color-accent-a)]',
			bg_on_hover: 'hover:bg-[var(--color-accent-a-hover)]',
			text: 'text-[var(--color-dark-a)]',
			text_hover: 'text-[var(--color-dark-a-hover)]',
			shadow: 'shadow-[5px_0px_10px_var(--color-shadow-b)]',
			border: 'border-[var(--color-accent-a)]'
		},
		{
			id: 'pink',
			label: 'Pink',
			bg_on: 'bg-[var(--color-pink)]',
			bg_on_hover: 'hover:bg-[var(--color-pink-hover)]',
			text: 'text-[var(--color-pink)]',
			text_hover: 'hover:text-[var(--color-pink-hover)]',
			shadow: 'shadow-[5px_0px_10px_var(--color-shadow-b)]',
			border: 'border-[var(--color-pink)]'
		},
		{
			id: 'brown',
			label: 'Brown',
			bg_on: 'bg-[var(--color-brown)]',
			bg_on_hover: 'hover:bg-[var(--color-brown-hover)]',
			text: 'text-[var(--color-brown)]',
			text_hover: 'hover:text-[var(--color-brown-hover)]',
			shadow: '',
			border: 'border-[var(--color-brown)]'
		}
	];

	return (
		<div className='flex flex-col'>
			<h3 className='pl-2.5 h-6.25 text-neutral-7'>Noise Type</h3>
			<div className='grid-container flex-1 max-w-75 h-6.25'>
				<div className='child z-10 _radio-buttons'>
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