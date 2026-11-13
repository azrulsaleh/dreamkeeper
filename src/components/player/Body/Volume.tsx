import type { CSSProperties } from 'react';
import { Bg_Stems } from '../../../svg/Vector'

interface StemVolumeProps {
	volumes: number[];
	handleVolumeChange: (index: number, volume: number) => void;
}

interface NoiseVolumeProps {
	noiseVolume: number;
	handleNoiseVolumeChange: (volume: number) => void;
}

export function Volume_Stems({
	volumes, handleVolumeChange
}: StemVolumeProps) {
	const OPTIONS = [
		{ label: 'Piano' },
		{ label: 'Cello' },
		{ label: 'Vocals' },
		{ label: 'Ambience' },
	];

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
									onChange={(e) => handleVolumeChange(index, parseFloat(e.target.value))}
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

export function Volume_Noise({
	noiseVolume, handleNoiseVolumeChange
}: NoiseVolumeProps) {
	const min = -60;
	const max = 6;
	const percentage = ((noiseVolume - min) / (max - min)) * 100;
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
						onChange={(e) => handleNoiseVolumeChange(parseFloat(e.target.value))}
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
