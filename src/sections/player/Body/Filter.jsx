import { useState } from 'react';
import { Bg_Filter } from '../../../svg/Vector'

function Filter({activeFilter, handleFilterChange}) {
	const filters = [
		{ id: 'gentle', label: 'Gentle', shadow: 'shadow-[10px_0px_10px_var(--color-shadow-b)]' },
		{ id: 'warm', label: 'Warm', shadow: 'shadow-[10px_0px_10px_var(--color-shadow-b)]' },
		{ id: 'deep', label: 'Deep', shadow: '' }
	];

	return (
		// <div className='_parent w-[300px] h-[25px]'>
		<div className='grid-container w-[300px] h-[25px]'>
			<div className='child z-10 _radio-buttons'>
				{filters.map((f) => (
					<button
						key={f.id}
						onClick={() => handleFilterChange(f.id)}
						className={`
							_radio-button w-[100px] ${f.shadow}
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
	)
}

export default Filter;