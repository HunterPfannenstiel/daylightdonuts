import { FunctionComponent } from 'react';
import classes from './PaintBrush.module.css';

const PaintBrush: FunctionComponent<{ className?: string }> = ({
	className = '',
}) => {
	return (
		<svg
			version="1.0"
			xmlns="http://www.w3.org/2000/svg"
			width="931.000000pt"
			height="1280.000000pt"
			viewBox="0 0 931.000000 1280.000000"
			preserveAspectRatio="xMidYMid meet"
			className={className}
		>
			<metadata>
				Created by potrace 1.15, written by Peter Selinger 2001-2017
			</metadata>
			<g
				transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
				fill="#003472"
				stroke="none"
			>
				<path
					d="M9186 12779 c-28 -22 -678 -928 -1438 -2004 -1702 -2411 -2879 -4144
-3515 -5175 -91 -148 -263 -442 -263 -450 0 -4 48 -24 108 -46 59 -21 190 -80
292 -131 267 -134 433 -241 688 -446 68 -54 125 -97 126 -95 9 10 107 177 193
328 656 1146 2013 3874 3700 7440 124 261 227 492 230 512 4 30 1 41 -20 62
-32 31 -65 33 -101 5z"
				/>
				<path
					d="M3796 4802 c-154 -368 -309 -713 -623 -1387 -264 -566 -410 -893
-401 -900 2 -1 32 -8 68 -14 195 -38 431 -178 561 -335 28 -33 55 -62 60 -64
12 -5 199 242 580 768 400 552 642 878 839 1130 176 225 171 216 144 238 -12
9 -66 53 -120 98 -304 248 -652 449 -963 555 -47 16 -87 29 -90 29 -3 0 -28
-53 -55 -118z"
				/>
				<path
					d="M2358 2395 c-270 -44 -509 -190 -680 -415 -62 -81 -140 -241 -167
-340 -92 -340 -138 -476 -220 -644 -77 -157 -164 -279 -276 -392 -210 -211
-460 -336 -850 -423 -99 -23 -134 -35 -147 -51 -26 -32 -23 -76 8 -107 l26
-26 482 6 c264 4 560 11 656 17 1117 63 1758 256 2118 635 177 186 259 384
269 650 11 288 -65 511 -248 733 -126 153 -342 287 -544 338 -127 31 -303 40
-427 19z"
				/>
			</g>
		</svg>
	);
};

export default PaintBrush;