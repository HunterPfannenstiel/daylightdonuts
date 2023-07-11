import { FunctionComponent, useState } from 'react';
import classes from './Order.module.css';
import { UserOrder } from '@_types/database/userInfo';
import Image from 'next/image';

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
			<ul className={classes.details}>
				{showOrderDetails &&
					order.cart.map((cartItem) => {
						return (
							<li key={cartItem.cart_item_id}>
								<div className={classes.container}>
									<Image
										src={cartItem.image}
										alt={cartItem.name}
										width={100}
										height={100}
									/>
									<div className={classes.name_and_price}>
										<p>{cartItem.name}</p>
										<p>{cartItem.unit_price} / donut</p>
									</div>
									<p className={classes.name}>x{cartItem.amount}</p>
								</div>
							</li>
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
