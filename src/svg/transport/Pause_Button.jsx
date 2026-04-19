const Pause_Button = ({
	w = 70, h = 40,
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
			viewBox="0 0 78 48"
			xmlns="http://www.w3.org/2000/svg"
			onClick={onClick}
			className="group cursor-pointer overflow-visible drop-shadow-lg"
			role="button"
		>
			<rect height="38" width="68" fill={bgColor} rx="19" stroke="white" strokeWidth="2" x="7" y="3"/>
			<rect
				height="20" width="5"
				fill={iconColor}
				className={`transition-colors duration-200 ${hoverColor} ${iconColor}`}
				rx="1" x="33" y="12"
			/>
			<rect
				height="20" width="5"
				fill={iconColor} 
				className={`transition-colors duration-200 ${hoverColor} ${iconColor}`}
				rx="1" x="44" y="12"
			/>
		</svg>
	);
};

export default Pause_Button;