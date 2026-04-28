import React from "react";

const Bg_Noise = (props) => (
	<svg height="220" width="120" fill="none" viewBox="0 0 120 220" xmlns="http://www.w3.org/2000/svg">
		<g filter="url(#filter0_i_106_55)">
			<rect height="220" width="120" fill="#FBF7FD" rx="10"/>
		</g>
		<g opacity="0.75">
			<mask height="220" id="mask0_106_55" style={{"maskType":"alpha"}} width="120" x="0" y="0" maskUnits="userSpaceOnUse">
				<rect height="220" width="120" fill="url(#paint0_radial_106_55)" rx="10"/>
			</mask>
			<g mask="url(#mask0_106_55)">
				<g filter="url(#filter1_n_106_55)">
					<rect height="220" width="120" fill="#FBF7FD" rx="10"/>
				</g>
			</g>
		</g>
		<defs>
			<filter id="filter1_n_106_55">
				<feTurbulence
					type="fractalNoise"
					baseFrequency="0.3"
					numOctaves="1"
					result="noise"
				/>
				<feColorMatrix 
					in="noise" 
					type="matrix" 
					values="0 0 0 0 0 
							0 0 0 0 0 
							0 0 0 0 0 
							0 0 0 2 -1" 
					result="spreadNoise"
				/>
				<feComponentTransfer in="spreadNoise" result="fadedNoise">
					<feFuncA type="table" tableValues="0 0.25" />
				</feComponentTransfer>
				<feComposite operator="in" in2="SourceGraphic" in="fadedNoise" />
			</filter>
			<filter height="220" id="filter1_n_106_55" width="120" x="0" y="0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
				<feFlood result="BackgroundImageFix" floodOpacity="0"/>
				<feFlood result="color1Flood"/>
				<feBlend result="shape" in="SourceGraphic" in2="BackgroundImageFix"/>
			</filter>
			<radialGradient id="paint0_radial_106_55" cx="0" cy="0" gradientTransform="translate(60 110) rotate(90) scale(110 60)" gradientUnits="userSpaceOnUse" r="1">
				<stop stopColor="#AA00FF"/>
				<stop offset="1" stopColor="#660099" stopOpacity="0"/>
			</radialGradient>
		</defs>
	</svg>
);

export default Bg_Noise;