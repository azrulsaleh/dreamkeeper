export const Stop_Button = ({
	w = 40, h = 40,
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
			viewBox="0 0 48 48"
			xmlns="http://www.w3.org/2000/svg"
			onClick={onClick}
			className="group cursor-pointer overflow-visible drop-shadow-[-4px_4px_4px_var(--color-shadow-a)]"
			role="button"
		>
			<rect
				height="38" width="38"
				fill={bgColor} rx="19"
				stroke="var(--color-white)" strokeWidth="2"
				x="7" y="3"
				className={`transition-colors duration-200 ${bgColorHover} group-hover:stroke-[var(--color-accent-a)]`}
				/>
			<rect
				height="15" width="15"
				fill={iconColor} rx="2"
				x="19" y="15"
				className={`transition-colors duration-200 ${iconColorHover}`}
			/>
		</svg>
	);
};