import { useRef, type KeyboardEvent } from 'react';
import { usePlayerSettingsStore } from '../../../store/playerSettingsStore';

function Filter() {
	const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
	const activeFilter = usePlayerSettingsStore(state => state.activeFilter);
	const setActiveFilter = usePlayerSettingsStore(state => state.setActiveFilter);
	const filters = [
		{ id: 'gentle', label: 'Gentle' },
		{ id: 'warm', label: 'Warm' },
		{ id: 'deep', label: 'Deep' },
	] as const;
	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
		if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')
			return;

		event.preventDefault();
		const nextIndex = index + (event.key === 'ArrowRight' ? 1 : -1);
		if (nextIndex < 0 || nextIndex >= filters.length)
			return;

		buttonRefs.current[nextIndex]?.focus();
	};

	// Clicking an active filter turns it off; otherwise it selects that filter.
	return (
		<div className='flex flex-col'>
			<h3 id="filter-options-label" className='pl-2.5 h-6.25 text-neutral-7'>Filters</h3>
			<div className='grid-container flex-1 max-w-75 h-6.25'>
				<div className='child z-10 _radio-buttons' role="group" aria-labelledby="filter-options-label">
					{filters.map((f, index) => (
						<button
							type="button"
							key={f.id}
							ref={element => { buttonRefs.current[index] = element }}
							aria-pressed={activeFilter === f.id}
							onKeyDown={event => handleKeyDown(event, index)}
							onClick={() => setActiveFilter(activeFilter === f.id ? 'off' : f.id)}
							className={`
								_radio-button flex-1 w-22
								hover:border-2 hover:border-primary-18
								${
									activeFilter === f.id 
									? '_radio-on'
									: '_radio-off'
								}
								focus:relative focus:z-10
							`}
						>
							<h4>{f.label}</h4>
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

export default Filter;
