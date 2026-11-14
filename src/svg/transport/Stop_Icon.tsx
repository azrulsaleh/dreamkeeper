interface TransportButtonProps {
	w?: number;
	h?: number;
	isActive?: number;
}

export const Stop_Icon = ({
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
				height="38" width="38" rx="19"
				x="5" y="5"
				className={`
					${isActive ? "fill-primary-3" : "fill-primary-7"}
					stroke-primary-9 group-hover:stroke-primary-18 stroke-1 group-hover:stroke-2
					transition-colors duration-200
			`}/>
			<rect
				height="15" width="15" rx="2"
				x="17" y="17"
				className={`
					${isActive ? "fill-primary-16" : "fill-primary-18"} group-hover:fill-primary-16
					transition-colors duration-200
			`}/>
		</svg>
	);
};
