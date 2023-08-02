import { FunctionComponent } from 'react';
import Rooster from '@ui/svg/Rooster';
import classes from './RoosterLayout.module.css';
import RoosterText from '@ui/svg/RoosterText';

const RoosterLayout: FunctionComponent = () => {
	return (
		<div className={classes.container}>
			<div>
				<Rooster className={classes.rooster + ' ' + classes.right} />
			</div>
			<div>
				<Rooster className={classes.rooster + ' ' + classes.left} />
			</div>
		</div>
	);
};

export default RoosterLayout;
