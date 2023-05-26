'use client';

import { FunctionComponent, useContext, useEffect, useState } from 'react';
import InfoContext from '../../components/providers/UserInfo/UserInfo';
import classes from './AccountPage.module.css';
import { Session } from 'next-auth';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface AccountPageProps {}

const AccountPage: FunctionComponent<AccountPageProps> = () => {
	const router = useRouter();
	const { data, status } = useSession();
	const infoCtx = useContext(InfoContext);

	useEffect(() => {
		if (status === 'unauthenticated') router.push('/login');
	}, [status]);

	if (status === 'authenticated') {
		return (
			<>
				{status && data && (
					<div>
						<p>Welcome, {data.user!.name}!</p>
						<p>{infoCtx.favorite_id ? infoCtx.favorite_id : 'null'}</p>
						<button onClick={() => signOut()}>Sign out</button>
					</div>
				)}
			</>
		);
	}
	return <p>Loading...</p>;
};

export default AccountPage;
