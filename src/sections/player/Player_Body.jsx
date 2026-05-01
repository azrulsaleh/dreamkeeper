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
		<div className='w-full h-[370px] flex flex-row'>
			<div className='w-[600px] h-full flex flex-col'>
				<div className='grid-container'>
					<div className='child z-10 m-auto'>
						<Loop
							isLooping={isLooping}
							handleLoopToggle={handleLoopToggle}
							/>
					</div>
					<hr className="child w-full text-[var(--color-accent-b)] z-0"/>
				</div>
				<div className='w-full h-[260px] flex gap-2 justify-center'>
					<Volume_Stems
						volumes={volumes}
						handleVolumeChange={handleVolumeChange}
					/>
				</div>
				<div className='w-full h-[80px] px-[20px] pb-[20px]'>
					<div className='w-full h-[30px] pl-[10px]'>
						<label>Filters</label>
					</div>
					<div className='w-[300px] h-[25px]'>
						<Filter
							activeFilter={activeFilter}
							handleFilterChange={handleFilterChange}
						/>
					</div>
				</div>
			</div>
			<div className='w-[250px] h-full border-l border-[var(--color-accent-b)]'>
				<div className='w-full h-[25px]'></div>
				<div className='w-full h-[260px] flex justify-center'>
					<Volume_Noise
						noiseVolume={noiseVolume}
						handleNoiseVolumeChange={handleNoiseVolumeChange}
					/>
				</div>
				<div className='w-full h-[80px] px-[20px] pb-[20px]'>
					<div className='w-full h-[30px] pl-[10px]'>
						<label>Noise Type</label>
					</div>
					<div className='h-[25px]'>
						<NoiseType
							activeNoise={activeNoise}
							handleNoiseChange={handleNoiseChange}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Player_Body;