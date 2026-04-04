const Pause_Button = ({
	w = 70,
	h = 40,
}) => {
	return (
		<svg height={h} width={w} fill="none" viewBox="0 0 78 48" xmlns="http://www.w3.org/2000/svg">
			<g filter="url(#filter0_d_4_123)">
				<rect height="38" width="68" fill="#FBF7FD" rx="19" stroke="white" strokeWidth="2" x="7" y="3"/>
				<rect height="20" width="5" fill="#728093" rx="1" x="33" y="12"/>
				<rect height="20" width="5" fill="#728093" rx="1" x="44" y="12"/>
			</g>
			<defs>
				<filter height="48" id="filter0_d_4_123" width="78" x="0" y="0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
					<feFlood result="BackgroundImageFix" floodOpacity="0"/>
					<feGaussianBlur stdDeviation="2"/>
					<feBlend result="effect1_dropShadow_4_123" in2="BackgroundImageFix"/>
					<feBlend result="shape" in="SourceGraphic" in2="effect1_dropShadow_4_123"/>
				</filter>
			</defs>
		</svg>
	);
};

export default Pause_Button;