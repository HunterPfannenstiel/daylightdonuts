import { FunctionComponent } from 'react';
import classes from './LineChartIcon.module.css';

interface LineChartIconProps {
	className?: string;
}

const LineChartIcon: FunctionComponent<LineChartIconProps> = ({
	className = '',
}) => {
	return (
		<svg
			className={className}
			viewBox="0 0 1024 1024"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M298.666667 682.666667a64 64 0 0 0 64-64 32.853333 32.853333 0 0 0 0-6.4l119.04-119.04h19.626666l68.693334 68.693333v3.413333a64 64 0 1 0 128 0v-3.413333L853.333333 405.333333A64 64 0 1 0 789.333333 341.333333a32.853333 32.853333 0 0 0 0 6.4l-154.026666 154.026667h-6.826667L554.666667 426.666667a63.573333 63.573333 0 0 0-128 0l-128 128a64 64 0 0 0 0 128z m576 170.666666h-725.333334V128a42.666667 42.666667 0 0 0-85.333333 0v768a42.666667 42.666667 0 0 0 42.666667 42.666667h768a42.666667 42.666667 0 0 0 0-85.333334z" />
		</svg>
	);
};

export default LineChartIcon;
