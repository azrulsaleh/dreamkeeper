import { useState } from 'react';

function NoiseType({activeNoise, handleNoiseChange}) {
	const types = [
		{ label: 'White', id: 'white', bg:'', text:'', text_hover:'' },
		{ label: 'Pink', id: 'pink', bg:'bg-pink-700/50', text:'text-pink-500/70', text_hover:'hover:text-pink-500/50' },
		{ label: 'Brown', id: 'brown', bg:'bg-amber-700/50', text:'text-amber-700/70', text_hover:'hover:text-amber-500/50' },
	];

	return (
		<>
			<div className='_radio-tabs bg-white w-[50px] z-20 h-[30px]'/>
			<div className='_radio-tabs bg-white/50 w-[100px] z-10 h-[30px]'/>
			<div className='_radio-tabs bg-white/5 w-[150px] z-0 h-[30px]'/>
			<div className='_radio-bg flex w-[150px] h-full items-center justify-center'>
				{types.map((n) => (
					<button
						key={n.id}
						onClick={() => handleNoiseChange(n.id)}
						className={`_radio-button ${
							activeNoise === n.id
								? `_radio-on ${n.bg}`
								: `_radio-off ${n.text} ${n.text_hover}`
						}`}
					>
						{n.label}
					</button>
				))}
			</div>
		</>
	)
}

export default NoiseType;