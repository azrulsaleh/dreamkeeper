interface TransportButtonProps {
	w?: number;
	h?: number;
	isActive?: number;
}

export const Play_Icon = ({
	w = 40, h = 40,
	isActive = 0
}: TransportButtonProps) => {
	return (
		<svg
			height={h}
			width={w}
			fill="none"
			viewBox="0 0 48 48"
			xmlns="http://www.w3.org/2000/svg"
			className="pointer-events-none overflow-visible"
			aria-hidden="true"
			focusable="false"
		>
			<rect
				height="40" width="40" rx="20"
				x="4" y="4"
				className={`
					${isActive ? "fill-primary-3" : "fill-primary-7"}
					stroke-primary-9 group-hover:stroke-primary-18 stroke-1 group-hover:stroke-2
					transition-colors duration-200
			`}/>
			<g transform="translate(-2, 0)">
				<path
					d="M21 28.4612V16.6995C21 15.937 21.8191 15.4551 22.4856 15.8254L34.2474 22.3596C34.9685 22.7603 34.9217 23.8126 34.1679 24.1476L22.4061 29.3751C21.7449 29.669 21 29.1849 21 28.4612Z"
					className={`
						${isActive ? "fill-primary-16" : "fill-primary-18"} group-hover:fill-primary-16
						transition-colors duration-200
				`}/>
			</g>
		</svg>
	);
};
