import { usePlayerSettingsStore } from '../../../store/playerSettingsStore';

function Loop() {
	const isLooping = usePlayerSettingsStore(state => state.isLooping);
	const setLooping = usePlayerSettingsStore(state => state.setLooping);
	const OPTIONS = [
		{ label: 'Music All Night', value: true },
		{ label: 'Music Once', value: false },
	];

	// The selected option sets whether playback wraps after the final track.
	return (
		<div className='_radio-buttons w-full max-w-87.5 h-6.25 bg-primary-2'>
			{OPTIONS.map((mode) => (
				<button
					type="button"
					key={String(mode.value)}
					aria-pressed={isLooping === mode.value}
					onClick={() => setLooping(mode.value)}
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
