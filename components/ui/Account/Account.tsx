import { FunctionComponent, useContext } from 'react';
import UserInfoContext from '../../providers/UserInfo/UserInfo';
import classes from './Account.module.css';
import { useQuery } from '@tanstack/react-query';
import { UserOrder } from '@_types/database/userInfo';

interface AccountProps {
	name: string;
}

const Account: FunctionComponent<AccountProps> = ({ name }) => {
	const userInfoCtx = useContext(UserInfoContext);

	const fetchOrders = async () => {
		console.log('Fetching orders...');
		const res = await fetch('/api/account/fetch-orders');
		if (!res.ok) {
			throw new Error("Couldn't fetch orders");
		}
		console.log('Orders fetched!');
		return res.json();
	};

	const { data, status } = useQuery<UserOrder[]>({
		queryKey: ['accountOrders'],
		queryFn: fetchOrders,
	});

	return (
		<div className={classes.container}>
			<h1>Welcome, {name}!</h1>
			{status === 'loading' && <p>Loading...</p>}
			{data && data.length === 0 && <p>You have no orders!</p>}
			{data &&
				data.map((order) => (
					<li key={order.cart_id}>
						<p>{order.cart_id}</p>
					</li>
				))}
		</div>
	);
};

export default Account;
