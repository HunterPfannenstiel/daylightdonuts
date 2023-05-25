'use client';

import { FunctionComponent, useContext, useEffect, useState } from 'react';
import InfoContext from '../../components/providers/UserInfo/UserInfo';
import classes from './AccountPage.module.css';
import { Session } from 'next-auth';
import { getSession, signIn, signOut } from 'next-auth/react';

interface AccountPageProps {}

const AccountPage: FunctionComponent<AccountPageProps> = () => {
	const [session, setSession] = useState<Session | null>(null);
	const infoCtx = useContext(InfoContext);

	useEffect(() => {
		getSession().then((res) => setSession(res));
	}, []);

	return (
		<>
			{session && (
				<div>
					<p>Welcome, {session.user!.name}!</p>
					<p>{infoCtx.favorite_id ? infoCtx.favorite_id : 'null'}</p>
					<button onClick={() => signOut()}>Sign out</button>
				</div>
			)}

			{!session && 
				<div>
					<button onClick={() => signIn('google')}>Sign in!</button>
				</div>
			}
		</>
	);
};

export default AccountPage;
