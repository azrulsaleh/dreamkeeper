import Player_Header from './player/Player_Header';
import Player_Body from './player/Player_Body';
import Loading from './player/Overlay/Loading';
import { usePlayerEngine } from '../hooks/usePlayerEngine';

function formatTime(seconds: number) {
	if (!seconds)
		return '0:00';

	const totalSeconds = Math.max(0, seconds);
	const minutes = Math.floor(totalSeconds / 60);
	const remainder = Math.floor(totalSeconds % 60);
	return `${minutes}:${String(remainder).padStart(2, '0')}`;
}

function Player() {
	const {
		currentSong,
		currentSongIndex,
		currentSongLoaded,
		currentTime,
		transportState,
		loadingError,
		wavesurferRef,
		handlePlay,
		handlePause,
		handleStop,
		handleSeek,
		retryLoading,
	} = usePlayerEngine();

	return (
		<div className='_parent _bg-player'>
			<div className="_child z-0">
				<Player_Header
					key={currentSongIndex}
					wavesurferRef={wavesurferRef}
					transportState={transportState}
					handlePlay={handlePlay}
					handlePause={handlePause}
					handleStop={handleStop}
					handleSeek={handleSeek}
					title={currentSong.title}
					currentTime={currentTime}
					formatTime={formatTime}
					duration={currentSong.duration}
					waveformPeaks={currentSong.waveformPeaks}
				/>
				<Player_Body />
			</div>
			{!currentSongLoaded && (
				<div className="_child _loading z-10">
					<Loading error={loadingError} onRetry={retryLoading} />
				</div>
			)}
		</div>
	);
}

export default Player;
