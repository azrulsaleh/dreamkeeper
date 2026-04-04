import { useState } from 'react';

function App() {
	const [currentTrack, setCurrentTrack] = useState(0);
	const playlist = [
		{ id: 1, title: 'Track 1', duration: 1694 },
		{ id: 2, title: 'Track 2', duration: 1800 },
		{ id: 3, title: 'Track 3', duration: 1920 }
	];
	
	return (
		<section className="h-screen flex justify-center items-center">
			<div className="_bg-card">
				<div className="flex gap-8">
					<img
						src="artwork.jpg"
						alt="Album Cover"
					/>
					<h1 className="text-5xl">
						{playlist[currentTrack].title}
					</h1>
				</div>
				{/* <h1 className="text-center">
					<span className="text-sky-800">DREAM</span>
					<span className="font-extralight text-cyan-700">KEEPER</span>
				</h1> */}
				{/* Header Section */}
				{/* Header Section */}

			</div>
		</section>
	)
}

export default App
