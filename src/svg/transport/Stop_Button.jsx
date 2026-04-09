const Stop_Button = ({
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
			<g filter="url(#filter0_d_4_122)">
				<rect height="38" width="38" fill={bgColor} rx="19" stroke="white" strokeWidth="2" x="7" y="3"/>
				<rect
					height="15" width="15"
					fill={iconColor}
					className={`transition-colors duration-200 ${hoverColor} ${iconColor}`}
					rx="2" x="19" y="15"
				/>
			</g>
			<defs>
				<filter height="48" id="filter0_d_4_122" width="48" x="0" y="0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
					<feFlood result="BackgroundImageFix" floodOpacity="0"/>
					<feGaussianBlur stdDeviation="2"/>
					<feBlend result="effect1_dropShadow_4_122" in2="BackgroundImageFix"/>
					<feBlend result="shape" in="SourceGraphic" in2="effect1_dropShadow_4_122"/>
				</filter>
			</defs>
		</svg>
	);
};

export default Stop_Button;