function Filter({activeFilter, handleFilterChange}) {
	const filters = [
		{ id: 'gentle', label: 'Gentle' },
		{ id: 'warm', label: 'Warm' },
		{ id: 'deep', label: 'Deep' }
	];

	return (
		<div className='flex flex-col'>
			<h3 className='pl-2.5 h-6.25 text-neutral-7'>Filters</h3>
			<div className='grid-container flex-1 max-w-75 h-6.25'>
				<div className='child z-10 _radio-buttons'>
					{filters.map((f) => (
						<button
							key={f.id}
							onClick={() => handleFilterChange(f.id)}
							className={`
								_radio-button flex-1 w-22
								hover:border-2 hover:border-primary-18
								${
									activeFilter === f.id 
									? '_radio-on'
									: '_radio-off'
								}
							`}
						>
							<h4>{f.label}</h4>
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

export default Filter;