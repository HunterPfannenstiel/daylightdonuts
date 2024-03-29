import { FunctionComponent } from 'react';
import OrderList from './Orders/OrderList';
import { useRouter, useSearchParams } from 'next/navigation';
import Logout from './Login/Logout';
import UserInfoContainer from './UserInfo/UserInfoContainer';

interface AccountProps {}

const Account: FunctionComponent<AccountProps> = () => {
	const router = useRouter();
	const params = useSearchParams();

	if (params?.has("UserInfo")) {
		return <UserInfoContainer />
	} else if (params?.has("Orders")) {
		return <OrderList />
	} else if (params?.has("Profile")) {
		return <Logout />
	} else {
		router.push('/account?Profile');
		return <p>Not an actual page</p>
	}
};

export default Account;
