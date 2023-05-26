'use client';
import { FunctionComponent } from 'react';
import classes from './LoginPage.module.css';
import { signIn } from 'next-auth/react';
import GoogleIcon from '../../svg/GoogleIcon';

interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
	return (
		<button
			onClick={() => {
				signIn('google');
			}}
			className={classes.sign_in_button}
		>
			<GoogleIcon />
		</button>
	);
};

export default LoginPage;
