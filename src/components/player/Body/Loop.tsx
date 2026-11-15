import { useRef, type KeyboardEvent } from 'react';
import { usePlayerSettingsStore } from '../../../store/playerSettingsStore';

function Loop() {
	const isLooping = usePlayerSettingsStore(state => state.isLooping);
	const setLooping = usePlayerSettingsStore(state => state.setLooping);

	const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

	const OPTIONS = [
		{ label: 'Music All Night', value: true },
		{ label: 'Music Once', value: false },
	];

	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
		if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')
			return;

		event.preventDefault();
		const nextIndex = index + (event.key === 'ArrowRight' ? 1 : -1);
		if (nextIndex < 0 || nextIndex > OPTIONS.length)
			return;

		buttonRefs.current[nextIndex]?.focus();
	};

	// The selected option sets whether playback wraps after the final track.
	return (
		<div className='_radio-buttons w-full max-w-87.5 h-6.25 bg-primary-2'>
			{OPTIONS.map((mode, index) => (
				<button
					type="button"
					key={String(mode.value)}
					ref={(element) => { buttonRefs.current[index] = element }}
					aria-pressed={isLooping === mode.value}
					onKeyDown={(event) => handleKeyDown(event, index)}
					onClick={() => setLooping(mode.value)}
					className={`
						_radio-button flex-1 max-w-43.75
						hover:border-2 hover:border-primary-18
						${isLooping === mode.value
							? '_radio-on'
							: '_radio-off'
						}
						text-xs
						focus:relative focus:z-10
					`}
				>
					{mode.label}
				</button>
			))}
		</div>
	);
}

export default Loop;
