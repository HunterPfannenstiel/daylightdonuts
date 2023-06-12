import { FunctionComponent } from 'react';
import classes from './Order.module.css';
import { UserOrder } from '@_types/database/userInfo';
import Image from 'next/image';

interface OrderProps {
	order: UserOrder;
}

const Order: FunctionComponent<OrderProps> = ({ order }) => {
	return (
		<li className={classes.order}>
			<div className={classes.order_header}>
				<p>Date: 5/27/2023</p>
				<p>
					{order.cart.reduce(
						(prevValue, curCartItem) => prevValue + curCartItem.amount,
						0
					)}
					Donuts
				</p>
			</div>
			<ul className={classes.details}>
				{order.cart.map((cartItem) => {
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
			</ul>
		</li>
	);
};

export default Order;
