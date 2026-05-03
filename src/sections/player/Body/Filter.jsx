import { useState } from 'react';
import { Bg_Filter } from '../../../svg/Vector'

function Filter({activeFilter, handleFilterChange}) {
	const filters = [
		{ id: 'gentle', label: 'Gentle', shadow: 'shadow-[10px_0px_10px_var(--color-shadow-b)]' },
		{ id: 'warm', label: 'Warm', shadow: 'shadow-[10px_0px_10px_var(--color-shadow-b)]' },
		{ id: 'deep', label: 'Deep', shadow: '' }
	];

	return (
		<div className='flex flex-col'>
			<label className='pl-[10px] h-[25px]'>Filters</label>
			<div className='grid-container flex-1 max-w-[300px] h-[25px]'>
				<div className='child z-10 _radio-buttons'>
					{filters.map((f) => (
						<button
							key={f.id}
							onClick={() => handleFilterChange(f.id)}
							className={`
								_radio-button flex-1 max-w-[100px] ${f.shadow} border-[var(--color-accent-a)]
								${
									activeFilter === f.id 
									? '_radio-on bg-[var(--color-accent-a)] hover:bg-[var(--color-accent-a-hover)]' 
									: '_radio-off text-[var(--color-dark-a)] hover:text-[var(--color-dark-a-hover)]'
								}
							`}
						>
							{f.label}
						</button>
					))}
				</div>
				<div className='child z-0'>
					<Bg_Filter/>
				</div>
			</div>
		</div>
	)
}

export default Filter;