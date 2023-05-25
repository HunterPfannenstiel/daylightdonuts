'use client';

import { FunctionComponent, useContext } from 'react';
import AuthCtx from '../../components/providers/Auth/Auth';
import classes from './AccountPage.module.css';

interface AccountPageProps {}

const AccountPage: FunctionComponent<AccountPageProps> = () => {
	const authCtx = useContext(AuthCtx);

	return (
		<>
			<div>
				{authCtx.session && (
					<div>
						<p>Welcome, {authCtx.session.user?.name}!</p>
						<button onClick={authCtx.signUserOut}>Log out</button>
					</div>
				)}
				{!authCtx.session && (
					<button onClick={authCtx.signUserIn.bind(this, 'google')}>
						Sign in!
					</button>
				)}
			</div>
		</>
	);
};

export default AccountPage;
