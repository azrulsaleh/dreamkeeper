export const Pause_Button = ({
	w = 70, h = 40,
	isActive = 0,
	onClick
}) => {
	const bgColor = isActive === 1 ? 'var(--color-light-a)' : 'var(--color-accent-a)';
	const bgColorHover = isActive === 1 ? 'group-hover:fill-[var(--color-light-a-hover)]' : 'group-hover:fill-[var(--color-accent-a-hover)]';
	const iconColor = isActive === 1 ? 'var(--color-dark-a)' : 'var(--color-light-a)';
	const iconColorHover = isActive === 1 ? 'group-hover:fill-[var(--color-dark-a-hover)]' : 'group-hover:fill-[var(--color-light-a-hover)]';

	return (
		<svg
			height={h}
			width={w}
			fill="none"
			viewBox="0 0 78 48"
			xmlns="http://www.w3.org/2000/svg"
			onClick={onClick}
			className="group cursor-pointer overflow-visible drop-shadow-md"
			role="button"
		>
			<rect
				height="38" width="68"
				fill={bgColor}
				stroke="white" strokeWidth="2"
				rx="19" x="7" y="3"
				className={`transition-colors duration-200 ${bgColorHover} group-hover:stroke-gray-100`}
				/>
			<rect
				height="20" width="5"
				fill={iconColor}
				rx="1" x="33" y="12"
				className={`transition-colors duration-200 ${iconColorHover}`}
			/>
			<rect
				height="20" width="5"
				fill={iconColor} 
				rx="1" x="44" y="12"
				className={`transition-colors duration-200 ${iconColorHover}`}
			/>
		</svg>
	);
};