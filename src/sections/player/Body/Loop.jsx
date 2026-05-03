import { useState } from 'react';

function Loop({isLooping, handleLoopToggle}) {
	const OPTIONS = [
		{ label: 'Music All Night', value: true },
		{ label: 'Music Once', value: false },
	];

	return (
		<div className='_radio-buttons w-full max-w-[350px] h-[25px] bg-[var(--color-light-a)]'>
			{OPTIONS.map((mode) => (
				<button
					key={String(mode.value)}
					onClick={() => handleLoopToggle(mode.value)}
					className={
						`_radio-button flex-1 max-w-[175px] hover:border-[var(--color-accent-a)]
						${
							isLooping === mode.value
							? '_radio-on bg-[var(--color-accent-a)] hover:bg-[var(--color-accent-a-hover)] border-2 border-[var(--color-white)]'
							: '_radio-off text-[var(--color-dark-a)] hover:text-[var(--color-dark-a-hover)] border-0 hover:border-2'
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