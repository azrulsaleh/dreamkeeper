const AudioLoader = () => {
	return (
		<div className="flex flex-col space-y-5">
			<div className="flex justify-center">
				<div className="_spinner" />
			</div>
			<h2 className="text-center animate-pulse">
				Synchronizing Player ...
			</h2>
		</div>
	);
};

export default AudioLoader;