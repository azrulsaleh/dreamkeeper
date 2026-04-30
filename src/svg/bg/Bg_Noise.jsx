import React from "react";
    
export const Bg_Noise = (props) => (
	<svg height="220" width="130" fill="none" viewBox="0 0 130 220" xmlns="http://www.w3.org/2000/svg">
		<rect height="218" width="128" rx="11" stroke="#FFFFFF" strokeWidth="2" x="1" y="1"/>
		<g opacity="0.85">
			<mask height="220" id="mask0_126_108" style={{"maskType":"alpha"}} width="130" x="0" y="0" maskUnits="userSpaceOnUse">
				<rect height="220" width="130" fill="url(#paint0_radial_126_108)" rx="10"/>
			</mask>
			<g mask="url(#mask0_126_108)">
				<g filter="url(#filter0_n_126_108)">
					<rect height="220" width="130" fill="#FAFAFF" rx="10"/>
				</g>
			</g>
		</g>
		<defs>
 			<filter id="filter0_n_126_108">
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
 			<filter height="220" id="filter0_n_126_108" width="130" x="0" y="0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
 				<feFlood result="BackgroundImageFix" floodOpacity="0"/>
 				<feFlood result="color1Flood"/>
 				<feBlend result="shape" in="SourceGraphic" in2="BackgroundImageFix"/>
 			</filter>
 			<radialGradient id="paint0_radial_126_108" cx="0" cy="0" gradientTransform="translate(65 110) rotate(90) scale(110 65)" gradientUnits="userSpaceOnUse" r="1">
 				<stop stopColor="#AA00FF"/>
 				<stop offset="1" stopColor="#660099" stopOpacity="0"/>
 			</radialGradient>
 		</defs>
	</svg>
);
