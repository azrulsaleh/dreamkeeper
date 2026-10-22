export const Pause_Button = ({
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
				`}
			/>
 			<rect
 				height="13" width="3"
 				rx="1" x="22" y="16"
 				className={`
					${isActive ? "fill-primary-16" : "fill-primary-18"} group-hover:fill-primary-16
					transition-colors duration-200
				`}
 			/>
 			<rect
 				height="13" width="3"
 				rx="1" x="28" y="16"
 				className={`
					${isActive ? "fill-primary-16" : "fill-primary-18"} group-hover:fill-primary-16
					transition-colors duration-200
				`}
 			/>
		</svg>
	);
};