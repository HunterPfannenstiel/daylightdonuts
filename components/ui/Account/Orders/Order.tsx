import { FunctionComponent, useState } from 'react';
import classes from './Order.module.css';
import { UserOrder } from '@_types/database/userInfo';
import Image from 'next/image';
import OrderItem from './OrderItem';

interface OrderProps {
	order: UserOrder;
	title: string;
	canOrderAgain?: boolean;
}

const Order: FunctionComponent<OrderProps> = ({
	order,
	title,
	canOrderAgain,
}) => {
	const [showOrderDetails, setShowOrderDetails] = useState(false);

	return (
		<li className={classes.order}>
			<div className={classes.order_header}>
				<p>{title}</p>
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
						return (
							<OrderItem
								item={cartItem}
								onDelete={(id) => console.log(id)}
							/>
						);
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
				{canOrderAgain && showOrderDetails && (
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
