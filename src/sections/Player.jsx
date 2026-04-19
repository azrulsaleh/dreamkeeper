import Player_Header from './player/Player_Header'
import Player_Body from './player/Player_Body'

function Player() {
	return (
		<div className='_bg-card w-[850px] h-[560px]'>
			<Player_Header />
			<Player_Body />
		</div>
	)
}

export default Player;