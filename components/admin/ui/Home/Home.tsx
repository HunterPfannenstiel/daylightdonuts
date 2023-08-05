'use client';

import { FunctionComponent } from 'react';
import classes from './Home.module.css';
import AdminSelectPanel from './AdminSelectPanel';
import Profile from '@ui/svg/NavIcons/Profile';
import { concatClassNames } from '@_utils/client';

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
			<AdminSelectPanel
				display={
					<Profile
						className={concatClassNames(classes.display, classes.profile_icon)}
            fill={'blue'}
					/>
				}
			/>
			<AdminSelectPanel
				display={<p className={classes.display}>Redirect to analytics</p>}
			/>
			<AdminSelectPanel
				display={<p className={classes.display}>Redirect to analytics</p>}
			/>
			<AdminSelectPanel
				display={<p className={classes.display}>Redirect to analytics</p>}
			/>
		</div>
	);
};

export default Home;
