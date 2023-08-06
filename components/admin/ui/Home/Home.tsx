'use client';

import { FunctionComponent } from 'react';
import classes from './Home.module.css';
import AdminSelectPanel from './AdminSelectPanel';
import Profile from '@ui/svg/NavIcons/Profile';
import { concatClassNames } from '@_utils/client';
import LineChartIcon from '@ui/svg/LineChartIcon';
import PaintBrush from '@ui/svg/PaintBrush';

declare global {
	interface Window {
		dymo: any;
	}
}

//DYMO Connect Service must be running to use the SDK

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	return (
		<div className={classes.container}>
			<AdminSelectPanel href={'/admin/analytics'} label='Analytics'>
				<div className={classes.panel_container}>
					<LineChartIcon className={classes.icon} />
				</div>
			</AdminSelectPanel>
			<AdminSelectPanel href={'/admin/modify-menu/item'} label='Modify Menu'>
				<div className={classes.panel_container}>
					<PaintBrush className={classes.icon}/>
				</div>
			</AdminSelectPanel>
		</div>
	);
};

export default Home;
