export const Play_Button = ({
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
				height="40" width="40" rx="20"
				fill={bgColor}
				stroke="var(--color-white)" strokeWidth="2"
				x="6" y="2"
				className={`transition-colors duration-200 ${bgColorHover} group-hover:stroke-[var(--color-accent-a)]`}
			/>
			<path
				d="M21 28.4612V16.6995C21 15.937 21.8191 15.4551 22.4856 15.8254L34.2474 22.3596C34.9685 22.7603 34.9217 23.8126 34.1679 24.1476L22.4061 29.3751C21.7449 29.669 21 29.1849 21 28.4612Z"
				fill={iconColor}
				className={`transition-colors duration-200 ${iconColorHover}`}
			/>
		</svg>
	);
};