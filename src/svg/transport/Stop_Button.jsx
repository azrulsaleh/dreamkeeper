export const Stop_Button = ({
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
				height="38" width="38" rx="19"
				x="7" y="3"
				className={`
					${isActive ? "fill-primary-3" : "fill-primary-7"}
					stroke-primary-9 group-hover:stroke-primary-18 stroke-1 group-hover:stroke-2
					transition-colors duration-200
			`}/>
			<rect
				height="15" width="15" rx="2"
				x="19" y="15"
				className={`
					${isActive ? "fill-primary-16" : "fill-primary-18"} group-hover:fill-primary-16
					transition-colors duration-200
			`}/>
		</svg>
	);
};