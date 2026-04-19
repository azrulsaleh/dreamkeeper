import { useState } from 'react';

function Loop() {
	const [loop, setLoop] = useState(true);
	const OPTIONS = [
		{ label: 'Music All Night', value: true },
		{ label: 'Music Once', value: false },
	];

	return (
		<div className='_radio-bg w-[300px] h-full flex mx-auto shadow-lg border border-white role="group"'>
			{OPTIONS.map((mode) => (
				<button
					key={String(mode.value)}
					onClick={() => setLoop(mode.value)}
					className={`_radio-button ${loop === mode.value ? '_radio-on' : '_radio-off'}`}
					aria-pressed={loop === mode.value}
				>
					{mode.label}
				</button>
			))}
		</div>
	)
}

export default Loop;