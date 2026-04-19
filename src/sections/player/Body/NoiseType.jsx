import { useState } from 'react';

function NoiseType() {
	const [noiseType, setNoiseType] = useState('white');
	const OPTIONS = [
		{ label: 'White', type: 'white', bg:'', text:'', text_hover:'' },
		{ label: 'Pink', type: 'pink', bg:'bg-pink-700/50', text:'text-pink-500/70', text_hover:'hover:text-pink-500/50' },
		{ label: 'Brown', type: 'brown', bg:'bg-amber-700/50', text:'text-amber-700/70', text_hover:'hover:text-amber-500/50' },
	];

	const handleNoise = (type) => {
		if (noiseType !== type)
			setNoiseType(type);
	}

	return (
		<>
			<div className='_radio-tabs bg-white w-[50px] z-20 h-[30px]'/>
			<div className='_radio-tabs bg-white/50 w-[100px] z-10 h-[30px]'/>
			<div className='_radio-tabs bg-white/5 w-[150px] z-0 h-[30px]'/>
			<div className='_radio-bg flex w-[150px] h-full items-center justify-center'>
				{OPTIONS.map((noise) => (
					<button
						key={noise.label}
						onClick={() => handleNoise(noise.type)}
						className={`
							_radio-button
							${noiseType === noise.type ? `_radio-on ${noise.bg}` : `_radio-off ${noise.text} ${noise.text_hover}`}
						`}
					>
						{noise.label}
					</button>
				))}
			</div>
		</>
	)
}

export default NoiseType;