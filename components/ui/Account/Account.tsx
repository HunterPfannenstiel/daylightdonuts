import { FunctionComponent, useContext } from 'react';
import UserInfoContext from '../../providers/UserInfo/UserInfo';
import classes from './Account.module.css';
import { useQuery } from '@tanstack/react-query';
import { UserOrder } from '@_types/database/userInfo';
import { signOut } from 'next-auth/react';
import OrderList from './Orders/OrderList';

interface AccountProps {
	name: string;
}

const Account: FunctionComponent<AccountProps> = ({ name }) => {

	return (
		<div className={classes.container}>
			<h1>Welcome, {name}!</h1>
			<button onClick={() => signOut()}>Sign out</button>
			<OrderList />
		</div>
	);
};

export default Account;
