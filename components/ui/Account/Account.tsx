import { FunctionComponent, useContext } from 'react';
import UserInfoContext from '../../providers/UserInfo/UserInfo';
import classes from './Account.module.css';
import { useQuery } from '@tanstack/react-query';
import { UserOrder } from '@_types/database/userInfo';
import { signOut } from 'next-auth/react';
import OrderList from './Orders/OrderList';
import UserInfoModal from './UserInfo/UserInfoModal';
import UserInfoList from './UserInfo/UserInfoList';
import { useRouter, useSearchParams } from 'next/navigation';

interface AccountProps {
	name: string;
}

const Account: FunctionComponent<AccountProps> = ({ name }) => {
	const router = useRouter();
	const params = useSearchParams();

	if (params?.has("UserInfo")) {
		return <UserInfoList />
	} else if (params?.has("Orders")) {
		return <OrderList />
	} else if (params?.has("Profile")) {
		return <p>Profile</p>
	} else {
		router.push('/account?Profile');
		return <p>Not an actual page</p>
	}
};

export default Account;

/* return (
	<div className={classes.container}>
		<h1>Welcome, {name}!</h1>
		<button onClick={() => signOut()}>Sign out</button>
		{params?.has('UserInfo') && <UserInfoList />}
		{params?.has('Orders') && <OrderList />}
	</div>
); */
