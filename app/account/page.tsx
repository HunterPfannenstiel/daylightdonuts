'use client';

import { FunctionComponent, useContext, useEffect, useState } from 'react';
import InfoContext from '../../components/providers/UserInfo/UserInfo';
import classes from './AccountPage.module.css';
import { Session } from 'next-auth';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Account from 'components/ui/Account/Account';

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
			<Account name={data.user!.name!}/>
		);
	}
	return <p>Loading...</p>;
};

export default AccountPage;
