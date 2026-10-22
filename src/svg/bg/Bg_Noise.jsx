export const Bg_Noise = (props) => (
    <svg height="220" width="130" fill="none" viewBox="0 0 130 220" xmlns="http://www.w3.org/2000/svg">
        <rect height="218" width="128" rx="11" stroke="var(--color-primary-5)" strokeWidth="1" x="1" y="1"/>
        
        <g opacity="0.85">
            <mask height="220" id="mask0_126_108" style={{"maskType":"alpha"}} width="130" x="0" y="0" maskUnits="userSpaceOnUse">
                <rect height="220" width="130" fill="url(#paint0_radial_126_108)" rx="10"/>
            </mask>
            
            <g mask="url(#mask0_126_108)">
                <rect 
                    height="220" 
                    width="130" 
                    fill="var(--color-primary-5)" 
                    rx="10" 
                    filter="url(#noiseFilter)"
                />
            </g>
        </g>

        <defs>
            <filter id="noiseFilter" x="0" y="0" width="130" height="220" filterUnits="userSpaceOnUse">
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
                    result="coloredNoise"
                />
                <feBlend mode="overlay" in="SourceGraphic" in2="coloredNoise" />
            </filter>

            <radialGradient id="paint0_radial_126_108" cx="0" cy="0" gradientTransform="translate(65 110) rotate(90) scale(80 40)" gradientUnits="userSpaceOnUse" r="1">
                <stop stopColor="var(--color-primary-20)"/>
                <stop offset="1" stopColor="var(--color-primary-20)" stopOpacity="0"/>
            </radialGradient>
        </defs>
    </svg>
);