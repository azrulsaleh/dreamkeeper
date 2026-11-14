import type { CSSProperties } from 'react';
import { usePlayerSettingsStore } from '../../../store/playerSettingsStore';
import { Bg_Stems } from '../../../svg/Vector'

export function Volume_Stems() {
	const volumes = usePlayerSettingsStore(state => state.volumes);
	const setStemVolume = usePlayerSettingsStore(state => state.setStemVolume);
	const OPTIONS = [
		{ label: 'Piano' },
		{ label: 'Cello' },
		{ label: 'Vocals' },
		{ label: 'Ambience' },
	];

	// Stem order matches the audio paths: piano, cello, vocals, then ambience.
	return (
		<div className='bento_stems'>
			{OPTIONS.map((stem, index) => {
				const min = -60;
				const max = 6;
				const percentage = ((volumes[index] - min) / (max - min)) * 100;

				return (
					<div key={stem.label} className='_parent _bg-volume my-auto'>
						<div className='_child z-10 flex flex-col gap-2'>
							<h3 className='text-center pt-3 text-primary-12'>{stem.label}</h3>
							<div className='_bg-slider'>
								<input
									type="range"
									min={min}
									max={max}
									step="1"
									value={volumes[index]}
									aria-label={`${stem.label} volume`}
									aria-valuetext={`${volumes[index]} dB`}
									onChange={(e) => setStemVolume(index, parseFloat(e.target.value))}
									className="_slider-v"
								style={{ '--value': `${percentage}%` } as CSSProperties}
								/>
							</div>
						</div>
						<div className="_child z-0">
							<Bg_Stems />
						</div>
					</div>
				);
			})}
		</div>
	)
}

export function Volume_Noise() {
	const noiseVolume = usePlayerSettingsStore(state => state.noiseVolume);
	const setNoiseVolume = usePlayerSettingsStore(state => state.setNoiseVolume);
	const min = -60;
	const max = 6;
	const percentage = ((noiseVolume - min) / (max - min)) * 100;
	// Noise uses the same decibel range as the music stems.
	return (
		<div className='_parent _bg-volume my-auto'>
			<div className='_child z-10 flex flex-col gap-2'>
				<h3 className='text-center pt-3 text-primary-12'>Noise</h3>
				<div className='_bg-slider'>
					<input
						type="range"
						min={min}
						max={max}
						step="1"
						value={noiseVolume}
						aria-label="Noise volume"
						aria-valuetext={`${noiseVolume} dB`}
						onChange={(e) => setNoiseVolume(parseFloat(e.target.value))}
						className="_slider-v-secondary"
						style={{ '--value': `${percentage}%` } as CSSProperties}
					/>
				</div>
			</div>
			<div className="_child z-0">
				<Bg_Stems/>
			</div>
		</div>
	)
}
