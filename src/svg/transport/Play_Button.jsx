const Play_Button = ({
	w = 40,
	h = 40
}) => {
	return (
		<svg height={h} width={w} fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
			<g filter="url(#filter0_d_4_118)">
				<rect height="40" width="40" fill="#93BCED" rx="20" x="6" y="2"/>
				<rect height="38" width="38" rx="19" stroke="white" strokeWidth="2" x="7" y="3"/>
			</g>
			<path d="M21 28.4612V16.6995C21 15.937 21.8191 15.4551 22.4856 15.8254L34.2474 22.3596C34.9685 22.7603 34.9217 23.8126 34.1679 24.1476L22.4061 29.3751C21.7449 29.669 21 29.1849 21 28.4612Z" fill="white"/>
			<defs>
				<filter height="48" id="filter0_d_4_118" width="48" x="0" y="0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
					<feFlood result="BackgroundImageFix" floodOpacity="0"/>
					<feGaussianBlur stdDeviation="2"/>
					<feBlend result="effect1_dropShadow_4_118" in2="BackgroundImageFix"/>
					<feBlend result="shape" in="SourceGraphic" in2="effect1_dropShadow_4_118"/>
				</filter>
			</defs>
		</svg>
	);
};

export default Play_Button;