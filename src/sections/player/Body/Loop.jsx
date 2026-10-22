import { useState } from 'react';

function Loop({isLooping, handleLoopToggle}) {
	const OPTIONS = [
		{ label: 'Music All Night', value: true },
		{ label: 'Music Once', value: false },
	];

	return (
		<div className='_radio-buttons w-full max-w-87.5 h-6.25 bg-primary-2'>
			{OPTIONS.map((mode) => (
				<button
					key={String(mode.value)}
					onClick={() => handleLoopToggle(mode.value)}
					className={`
						_radio-button flex-1 max-w-43.75
						hover:border-2 hover:border-primary-18
						${isLooping === mode.value
							? '_radio-on'
							: '_radio-off'
						}
						text-xs
					`}
				>
					{mode.label}
				</button>
			))}
		</div>
	);
}

export default Loop;