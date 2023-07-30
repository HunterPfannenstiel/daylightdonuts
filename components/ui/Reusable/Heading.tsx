import { CSSProperties, FunctionComponent, ReactNode } from 'react';
import classes from './Heading.module.css';

interface HeadingProps {
	children: ReactNode;
	position?: 'left' | 'center' | 'right';
	tilt?: 'left' | 'none' | 'right';
}

const Heading: FunctionComponent<HeadingProps> = ({
	children,
	position,
	tilt,
}) => {
	const margin: CSSProperties =
		position === 'center'
			? { marginInline: 'auto' }
			: position === 'right'
			? { marginLeft: 'auto' }
			: {};

	let tiltVal = '-1.13deg';
	if (tilt) {
		if (tilt === 'none') tiltVal = '0deg';
		else if (tilt === 'right') tiltVal = '1.13deg';
	}

	return (
		<div className={classes.yellow_border} style={{...margin, "--tilt": tiltVal} as CSSProperties}>
			<div className={classes.blue_background}>{children}</div>
		</div>
	);
};

export default Heading;
