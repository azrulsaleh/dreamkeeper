import React, { useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import Player_Header from './player/Player_Header'
import Player_Body from './player/Player_Body'

function Player() {
	const [player, setPlayer] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	
	const playersRef = useRef({});
	
	const stems = ['piano', 'cello', 'vocals', 'ambience'];

	useEffect(() => {
		const initAudio = async () => {
			setIsLoading(true);

			for (const stem of stems) {
				try {
					const player = new Tone.Player({
						url: `${stem}.opus`,
						loop: false,
						onload: () => {
							console.log(`${stem}.opus loaded successfully`);
						},
						onerror: (error) => {
							console.error(`Error loading ${stem}.opus:`, error);
						}
					}).toDestination();
					player.sync().start(0);
					playersRef.current[stem] = player;
				} catch (error) {
					console.error(`Error initializing ${stem}:`, error);
				}
			}

			setIsLoading(false);
		};

		initAudio();

		return () => {
			Tone.getTransport().stop();
			Object.values(playersRef.current).forEach(player => {
				if (player)
					player.dispose();
			});
		};
	}, []);

	return (
		<div className='_bg-card w-[850px] h-[560px]'>
			<Player_Header player={player} />
			<Player_Body player={player} />
			{/* <Player_Header /> */}
			{/* <Player_Body /> */}
		</div>
	)
}

export default Player;