interface AudioLoaderProps {
	error: string | null;
	onRetry: () => void;
}

const AudioLoader = ({ error, onRetry }: AudioLoaderProps) => {
	if (error) {
		return (
			<div className="flex flex-col items-center space-y-5">
				<h2 className="text-center text-neutral-10">Unable to load audio</h2>
				<p className="text-center text-neutral-7">{error}</p>
				<button
					type="button"
					onClick={onRetry}
					className="_radio-button _radio-on px-5 py-2"
				>
					Try again
				</button>
			</div>
		);
	}

	return (
		<div className="flex flex-col space-y-5">
			<div className="flex justify-center">
				<div className="_spinner" />
			</div>
			<h2 className="text-center animate-pulse text-neutral-10">
				Synchronizing Player ...
			</h2>
		</div>
	);
};

export default AudioLoader;
