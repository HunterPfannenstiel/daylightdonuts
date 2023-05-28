import { FunctionComponent } from 'react';
import classes from './OrderList.module.css';
import { useQuery } from '@tanstack/react-query';
import { UserOrder } from '@_types/database/userInfo';
import Order from './Order';

interface OrderListProps {}

const OrderList: FunctionComponent<OrderListProps> = () => {
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
		<>
			{status === 'loading' && <p>Loading...</p>}
			{data && data.length === 0 && <p>You have no orders!</p>}
			<ul className={classes.orders}>
				{data &&
					data.map((order) => <Order order={order} key={order.cart_id}/>)}
			</ul>
		</>
	);
};

export default OrderList;
