interface TransportButtonProps {
	w?: number;
	h?: number;
	isActive?: number;
}

export const Pause_Icon = ({
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
				`}
			/>
 			<rect
 				height="13" width="3"
 				x="20" y="17" rx="1"
 				className={`
					${isActive ? "fill-primary-16" : "fill-primary-18"} group-hover:fill-primary-16
					transition-colors duration-200
				`}
 			/>
 			<rect
 				height="13" width="3"
 				x="26" y="17" rx="1"
 				className={`
					${isActive ? "fill-primary-16" : "fill-primary-18"} group-hover:fill-primary-16
					transition-colors duration-200
				`}
 			/>
		</svg>
	);
};
