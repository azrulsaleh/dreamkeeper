import { useState } from 'react';

function Loop({isLooping, handleLoopToggle}) {
	const OPTIONS = [
		{ label: 'Music All Night', value: true },
		{ label: 'Music Once', value: false },
	];

	return (
		<div className='_radio-buttons w-[350px] h-[25px] bg-[var(--color-light-a)]'>
			{OPTIONS.map((mode) => (
				<button
					key={String(mode.value)}
					onClick={() => handleLoopToggle(mode.value)}
					className={
						`_radio-button w-[175px]
						${
							isLooping === mode.value
							? '_radio-on bg-[var(--color-accent-a)] hover:bg-[var(--color-accent-a-hover)]'
							: '_radio-off text-[var(--color-dark-a)] hover:text-[var(--color-dark-a-hover)]'
						}`
					}
				>
					{mode.label}
				</button>
			))}
		</div>
    );
}

export default Loop;