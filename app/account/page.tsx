'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import { getSession, signIn, signOut } from 'next-auth/react';
import classes from './AccountPage.module.css';
import { Session } from 'next-auth';

interface AccountPageProps {}

const AccountPage: FunctionComponent<AccountPageProps> = () => {
	const [session, setSession] = useState({} as Session | null);
	useEffect(() => {
		const getClientSession = async () => {
			const res = await getSession();
			if (res) setSession(res);
			else setSession(null);
		};
		getClientSession();
	}, []);

	const onSignInHandler = async () => {
		await signIn('google');
	};

	const onSignOutHandler = async () => {
		await signOut();
		setSession(null);
	}

	return (
		<>
			{!session && <button onClick={onSignInHandler}>Sign in with Google</button>}
			{session && (
				<div>
					<p>Welcome, {session.user?.name}</p>
					<button onClick={onSignOutHandler}>Log out</button>
				</div>
			)}
		</>
	);
};

export default AccountPage;
