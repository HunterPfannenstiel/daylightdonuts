'use client';
import { FunctionComponent, useEffect } from 'react';
import classes from './Login.module.css';
import LoginPage from '../../components/ui/Account/LoginPage';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const router = useRouter();
	const { data, status } = useSession();

	useEffect(() => {
		if (status === 'authenticated') router.push('/account');
	}, [status]);

	if (status === 'unauthenticated') return <LoginPage />;

	return <p>Loading...</p>;
};

export default Login;
