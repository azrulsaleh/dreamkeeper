export const Play_Button = ({
	w = 40, h = 40,
	isActive = 0,
	onClick
}) => {
	const bgColor = isActive === 1 ? '#FBF7FD' : '#93BCED';
	const iconColor = isActive === 1 ? '#728093' : '#FBF7FD';
	const hoverColor = isActive === 1 ? 'group-hover:fill-slate-400' : 'group-hover:fill-slate-200';

	return (
		<svg
			height={h}
			width={w}
			fill="none"
			viewBox="0 0 48 48"
			xmlns="http://www.w3.org/2000/svg"
			onClick={onClick}
			className="group cursor-pointer overflow-visible drop-shadow-lg"
			role="button"
		>
			<rect height="40" width="40" fill={bgColor} rx="20" x="6" y="2"/>
			<rect height="38" width="38" rx="19" stroke="white" strokeWidth="2" x="7" y="3"/>
			<path
				d="M21 28.4612V16.6995C21 15.937 21.8191 15.4551 22.4856 15.8254L34.2474 22.3596C34.9685 22.7603 34.9217 23.8126 34.1679 24.1476L22.4061 29.3751C21.7449 29.669 21 29.1849 21 28.4612Z"
				fill={iconColor}
				className={`transition-colors duration-200 ${hoverColor} ${iconColor}`}
			/>
		</svg>
	);
};