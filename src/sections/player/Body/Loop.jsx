import { useState } from 'react';

function Loop({isLooping, handleLoopToggle}) {
	const OPTIONS = [
		{ label: 'Music All Night', value: true },
		{ label: 'Music Once', value: false },
	];

	return (
		<div className='_radio-bg w-[300px] h-full flex mx-auto shadow-lg border border-white role="group"'>
			{OPTIONS.map((mode) => (
				<button
					key={String(mode.value)}
					onClick={() => handleLoopToggle(mode.value)}
					className={`_radio-button ${isLooping === mode.value ? '_radio-on' : '_radio-off'}`}
					aria-pressed={isLooping === mode.value}
				>
					{mode.label}
				</button>
			))}
		</div>
    );
}

export default Loop;