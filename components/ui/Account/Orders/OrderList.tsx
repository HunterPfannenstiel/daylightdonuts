import { FunctionComponent } from 'react';
import classes from './OrderList.module.css';
import { useQuery } from '@tanstack/react-query';
import { UserOrder } from '@_types/database/userInfo';
import OrderContainer from './OrderContainer';

const formatOrderDate = (orderDate: string) => {
	return new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	}).format(new Date(orderDate));
};

const getOrderTotal = (order: UserOrder) => {
	return order.cart.reduce(
		(prev, curItem) => +curItem.unit_price * curItem.amount + prev,
		0
	);
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
					<OrderContainer
						order={order}
						cartId={order.cart_id}
						title={formatOrderDate(order.order_date)}
						orderTotal={getOrderTotal(order)}
						addToOrder={(cartId) => console.log('Add to order: ' + cartId)}
					/>
				))}
			</ul>
		</>
	);
};

export default OrderList;
