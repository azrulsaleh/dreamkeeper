import { useState } from 'react';
import { Bg_NoiseType } from '../../../svg/Vector'

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
		<div className='_parent w-[210px] h-[25px]'>
			<div className='_child z-10 _radio-buttons'>
				{types.map((n) => (
					<button
						key={n.id}
						onClick={() => handleNoiseChange(n.id)}
						className={`
							_radio-button w-[70px] ${n.shadow} ${n.border}
							${
								activeNoise === n.id
								? `_radio-on ${n.bg_on} ${n.bg_on_hover}`
								: `_radio-off ${n.text} ${n.text_hover}`
							}
						`}
					>
						{n.label}
					</button>
				))}
			</div>
			<div className='_child z-0'>
				<Bg_NoiseType/>
			</div>
		</div>
	)
}

export default NoiseType;