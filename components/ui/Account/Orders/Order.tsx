import { FunctionComponent, useState } from 'react';
import classes from './Order.module.css';
import { UserOrder } from '@_types/database/userInfo';
import Image from 'next/image';
import OrderItem from './OrderItem';
import CartBlock from './CartBlock';

interface OrderProps {
	order: UserOrder;
}

const Order: FunctionComponent<OrderProps> = ({ order }) => {
	const [showOrderDetails, setShowOrderDetails] = useState(false);

	const formattedDate = new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	}).format(new Date(order.order_date));
	return (
		<li className={classes.order}>
			<div className={classes.order_header}>
				<p>{formattedDate}</p>
				<button
					onClick={() => {
						setShowOrderDetails((oldState) => !oldState);
					}}
				>
					+
				</button>
			</div>
			<ul>
				{showOrderDetails &&
					order.cart.map((cartItem) => {
						return <OrderItem item={cartItem} />;
					})}
				<div className={classes.order_total}>
					<p>Order Total</p>
					<p>
						$
						{order.cart.reduce(
							(prevValue, curItem) =>
								prevValue + curItem.amount * +curItem.unit_price,
							0
						)}
					</p>
				</div>
				{showOrderDetails && (
					<button
						className={classes.order_button}
						onClick={() => {
							console.log('Add to cart: ' + order.cart_id);
						}}
					>
						Order Again
					</button>
				)}
			</ul>
		</li>
	);
};

export default Order;

{
	/* <p>
	{order.cart.reduce(
		(prevValue, curCartItem) => prevValue + curCartItem.amount,
		0
	)}
	Donuts
</p>; */
}
