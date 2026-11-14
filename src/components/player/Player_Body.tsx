import Loop from './Body/Loop'
import { Volume_Stems, Volume_Noise } from './Body/Volume'
import Filter from './Body/Filter'
import NoiseType from './Body/NoiseType'

function Player_Body() {
	return (
		<div className='bento_body'>
			<div className='[grid-area:box-loop]'>
				<div className='grid-container px-5'>
					<div className='child z-10 m-auto flex justify-center w-full -translate-y-2'>
						<Loop />
					</div>
				</div>
			</div>
			<div className='
				[grid-area:box-stemsVolume]
				flex flex-col gap-5 place-content-center mx-auto
			'>
					<Volume_Stems />
			</div>
			<div className='
				[grid-area:box-filters]
				flex flex-col gap-5 place-content-center px-8
				max-[909px]:mx-auto
			'>
					<Filter />
			</div>
			<div className="
				[grid-area:box-split]
				w-px h-full
				bg-[linear-gradient(to_bottom,var(--color-primary-3)_0%,var(--color-primary-5)_20%,var(--color-primary-5)_80%,var(--color-primary-3)_100%)]
			"/>
			<div className='[grid-area:box-noiseSpace]'/>
			<div className='
				[grid-area:box-noiseVolume]
				flex mx-auto
			'>
					<Volume_Noise />
			</div>
			<div className='
				[grid-area:box-noiseType]
				flex flex-col gap-5 place-content-center place-items-center
			'>
					<NoiseType />
			</div>
		</div>
	)
}

export default Player_Body;
