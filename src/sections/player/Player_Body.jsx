import Loop from './Body/Loop'
import { Volume_Stems, Volume_Noise } from './Body/Volume'
import Filter from './Body/Filter'
import NoiseType from './Body/NoiseType'

function Player_Body({
	isLooping, handleLoopToggle,
	volumes, handleVolumeChange,
	activeFilter, handleFilterChange,
	activeNoise, handleNoiseChange,
	noiseVolume, handleNoiseVolumeChange
}) {
	return (
		<div className='bento_body'>
			<div className='
				[grid-area:box-loop] border-[var(--color-light-b)] min-[910px]:border-r
			'>
				<div className='grid-container px-[20px]'>
					<div className='child z-10 m-auto flex justify-center w-full'>
						<Loop
							isLooping={isLooping}
							handleLoopToggle={handleLoopToggle}
						/>
					</div>
					<hr className="child w-full text-[var(--color-light-b)] z-0"/>
				</div>
			</div>
			<div className='
				[grid-area:box-stemsVolume] flex gap-[5px] justify-center
				border-[var(--color-light-b)] min-[910px]:border-r
				px-[20px]
			'>
				<Volume_Stems
					volumes={volumes}
					handleVolumeChange={handleVolumeChange}
				/>
			</div>
			<div className='
				[grid-area:box-filters] min-[910px]:pl-[30px]
				border-[var(--color-light-b)] max-[909px]:border-b min-[910px]:border-r
			'>
				<div className='w-full flex justify-center min-[910px]:justify-start px-[20px]'>
					<Filter
						activeFilter={activeFilter}
						handleFilterChange={handleFilterChange}
					/>
				</div>
			</div>
			<div className='[grid-area:box-noiseSpace]' />
			<div className='[grid-area:box-noiseVolume] flex justify-center'>
				<Volume_Noise
					noiseVolume={noiseVolume}
					handleNoiseVolumeChange={handleNoiseVolumeChange}
				/>
			</div>
			<div className='
				[grid-area:box-noiseType] flex flex-col items-center
			'>
				<div>
					<label className='pl-[10px] h-[25px]'>Noise Type</label>
					<NoiseType
						activeNoise={activeNoise}
						handleNoiseChange={handleNoiseChange}
					/>
				</div>
			</div>
		</div>
	)
}

export default Player_Body;