import { useState } from 'react';

function Filter() {
	const [filterType, setFilterType] = useState('gentle');
	const OPTIONS = [
		{ label: 'Gentle', type: 'gentle' },
		{ label: 'Warm', type: 'warm' },
		{ label: 'Deep', type: 'deep' },
	];

	const handleFilter = (type) => {
		if (filterType !== type)
			setFilterType(type);
	}

	return (
		<>
			<div className='_radio-tabs bg-white w-[100px] z-20 h-[30px]'/>
			<div className='_radio-tabs bg-white/50 w-[200px] z-10 h-[30px]'/>
			<div className='_radio-tabs bg-white/5 w-[300px] z-0 h-[30px]'/>
			<div className='_radio-bg flex w-[300px] h-full items-center justify-center'>
				{OPTIONS.map((filter) => (
					<button
						key={filter.label}
						onClick={() => handleFilter(filter.type)}
						className={`
							_radio-button
							${filterType === filter.type ? '_radio-on' : '_radio-off'}
						`}
					>
						{filter.label}
					</button>
				))}
			</div>
		</>
	)
}

export default Filter;