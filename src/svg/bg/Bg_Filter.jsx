import React from "react";
    
export const Bg_Filter = () => (
	<svg height="25" width="300" fill="none" viewBox="0 0 300 25" xmlns="http://www.w3.org/2000/svg">
		<rect
			height="24" width="299"
			fill="var(--color-light-b)" opacity="0.75" rx="11.5"
			stroke="white" strokeOpacity="1"
			x="0.5" y="0.5"
		/>
		<rect
			height="24" width="199"
			fill="var(--color-light-b)" opacity="0.25" rx="11.5"
			stroke="white" strokeOpacity="1"
			x="0.5" y="0.5"
		/>
		<rect
			height="24" width="99"
			fill="var(--color-light-a)" opacity="1" rx="11.5"
			stroke="white" strokeOpacity="1"
			x="0.5" y="0.5"
		/>
	</svg>
);