export const Play_Button = ({
	w = 40, h = 40,
	isActive = 0,
	onClick
}) => {
	return (
		<svg
			height={h}
			width={w}
			fill="none"
			viewBox="0 0 48 48"
			xmlns="http://www.w3.org/2000/svg"
			onClick={onClick}
			className="group cursor-pointer overflow-visible drop-shadow-[-2px_2px_4px]/20"
			role="button"
		>
			<rect
				height="40" width="40" rx="20"
				x="6" y="2"
				className={`
					${isActive ? "fill-primary-3" : "fill-primary-7"}
					stroke-primary-9 group-hover:stroke-primary-18 stroke-1 group-hover:stroke-2
					transition-colors duration-200
			`}/>
			<path
				d="M21 28.4612V16.6995C21 15.937 21.8191 15.4551 22.4856 15.8254L34.2474 22.3596C34.9685 22.7603 34.9217 23.8126 34.1679 24.1476L22.4061 29.3751C21.7449 29.669 21 29.1849 21 28.4612Z"
				className={`
					${isActive ? "fill-primary-16" : "fill-primary-18"} group-hover:fill-primary-16
					transition-colors duration-200
			`}/>
		</svg>
	);
};