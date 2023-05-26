'use client';
import { FunctionComponent } from 'react';
import classes from './LoginPage.module.css';
import { signIn } from 'next-auth/react';

interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
	return (
		<button
			onClick={() => {
				signIn('google');
			}}
		>
			Sign In/Up!
		</button>
	);
};

export default LoginPage;
