'use client';
import { FunctionComponent } from 'react';
import classes from './LoginPage.module.css';
import { signIn } from 'next-auth/react';
import GoogleIcon from '../../svg/GoogleIcon';
import GoogleGIcon from 'components/ui/svg/GoogleGIcon';

interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
	return (
		<div className={classes.container}>
			<h1 className={classes.header}>Login</h1>
			<div className={classes.button_section}>
				<button
					onClick={() => {
						signIn('google');
					}}
				>
					<div className={classes.button_content}>
						<GoogleGIcon className={classes.icon}/>
						<p>Login with Google</p>
					</div>
				</button>
			</div>
		</div>
	);
};

export default LoginPage;
