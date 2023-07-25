import { FunctionComponent } from 'react';
import classes from './OrderList.module.css';
import { useQuery } from '@tanstack/react-query';
import { UserOrder } from '@_types/database/userInfo';
import Order from './Order';

const formatOrderDate = (orderDate: string) => {
	return new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	}).format(new Date(orderDate));
};

interface OrderListProps {}

const OrderList: FunctionComponent<OrderListProps> = () => {
	const fetchOrders = async () => {
		const res = await fetch('/api/account/fetch-orders');
		if (!res.ok) {
			throw new Error("Couldn't fetch orders");
		}
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
				{data?.map((order) => (
					<Order
						order={order}
						key={order.cart_id}
						title={formatOrderDate(order.order_date)}
						canOrderAgain
					/>
				))}
			</ul>
		</>
	);
};

export default OrderList;
