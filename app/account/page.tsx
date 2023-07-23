'use client';

import { FunctionComponent, useContext, useEffect, useState } from 'react';
import InfoContext from '../../components/providers/UserInfo/UserInfo';
import classes from './AccountPage.module.css';
import { Session } from 'next-auth';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Account from 'components/ui/Account/Account';
import PageNavBar from 'components/ui/Reusable/PageNavBar/PageNavBar';
import PageHeader from 'components/ui/Reusable/PageHeader';

interface AccountPageProps {}

const AccountPage: FunctionComponent<AccountPageProps> = () => {
	const router = useRouter();
	const { status } = useSession();

	useEffect(() => {
		if (status === 'unauthenticated') router.push('/login');
	}, [status]);

	if (status === 'authenticated') {
		return (
			<>
				<PageHeader title="My Account" />
				<PageNavBar
					categories={['Profile', 'UserInfo', 'Orders']}
					baseRoute="account"
				/>
				<Account />
			</>
		);
	}
	return <p>Loading...</p>;
};

export default AccountPage;
