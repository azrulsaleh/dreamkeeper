import Loop from './Body/Loop'
import { Volume_Stems, Volume_Noise } from './Body/Stems'
import Filter from './Body/Filter'
import NoiseType from './Body/NoiseType'

function Player_Body( {volumes, handleVolumeChange} ) {
	return (
		<div className='w-full h-[370px] flex flex-row'>
			<div className='w-[640px] h-full flex flex-col'>
				<div className='w-full h-[30px] relative flex'>
					<hr className='absolute top-1/2 translate-y-1/2 z-0 w-full text-black/5' />
					<Loop />
				</div>
				<div className='w-full h-[260px] flex space-x-[30px] px-[35px] py-[20px]'>
					<Volume_Stems
						volumes={volumes}
						handleVolumeChange={handleVolumeChange}
					/>
				</div>
				<div className='w-full h-[80px] px-[20px] pb-[20px]'>
					<div className='w-full h-[30px] flex items-center'>
						<label>Filter</label>
					</div>
					<div className='h-[30px]'>
						<Filter />
					</div>
				</div>
			</div>
			<div className='w-[210px] h-full border-l border-black/5'>
				<div className='w-full h-[30px]'></div>
				<div className='w-full h-[260px] px-[45px] py-[20px] flex'>
					<Volume_Noise />
				</div>
				<div className='w-full h-[80px]'>
					<div className='w-full h-[80px] px-[30px] pb-[20px]'>
						<div className='w-full h-[30px] flex items-center'>
							<label>Noise Type</label>
						</div>
						<div className='h-[30px]'>
							<NoiseType />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Player_Body;