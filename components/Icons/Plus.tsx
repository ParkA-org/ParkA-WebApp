export default function PlusIcon() {
    return (
        <svg width={58} height={64} viewBox="0 0 58 64" fill="none">
            <g filter="url(#prefix__filter0_d)">
                <path
                    d="M29 0C15.2 0 4 11.2 4 25s11.2 25 25 25 25-11.2 25-25S42.8 0 29 0zm12.5 27.5h-10v10h-5v-10h-10v-5h10v-10h5v10h10v5z"
                    fill="#0B768C"
                />
            </g>
            <defs>
                <filter
                    id="prefix__filter0_d"
                    x={0}
                    y={0}
                    width={58}
                    height={64}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy={10} />
                    <feGaussianBlur stdDeviation={2} />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                </filter>
            </defs>
        </svg>
    )
}

