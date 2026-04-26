import { useState } from 'react';

function Filter({activeFilter, handleFilterChange}) {
	const filters = [
		{ id: 'deep',  label: 'Deep' },
        { id: 'warm',  label: 'Warm' },
        { id: 'clear', label: 'Clear' }
    ];

	return (
		<>
			<div className='_radio-tabs bg-white w-[100px] z-20 h-[30px]'/>
			<div className='_radio-tabs bg-white/50 w-[200px] z-10 h-[30px]'/>
			<div className='_radio-tabs bg-white/5 w-[300px] z-0 h-[30px]'/>
			<div className='_radio-bg flex w-[300px] h-full items-center justify-center'>
				{filters.map((f) => (
					<button
						key={f.id}
						onClick={() => handleFilterChange(f.id)}
						className={`
							_radio-button
							${activeFilter === f.id ? '_radio-on' : '_radio-off'}
						`}
					>
						{f.label}
					</button>
				))}
			</div>
		</>
	)
}

export default Filter;