import { FunctionComponent, ReactNode, useState } from 'react';
import classes from './OrderContainer.module.css';
import { UserOrder } from '@_types/database/userInfo';
import OrderItemList from '@ui/Reusable/Order/OrderItemList';

interface OrderContainerProps {
	order: UserOrder;
	title: string;
	cartId: number;
	orderTotal: number;
	addToOrder?: (cartId: number) => void;
}

const OrderContainer: FunctionComponent<OrderContainerProps> = ({
	order,
	title,
	cartId,
	orderTotal,
	addToOrder,
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
			{showOrderDetails && (
				<OrderItemList
					cart={order.cart}
					cartId={order.cart_id}
					key={order.cart_id}
				/>
			)}
			<div className={classes.order_total}>
				<p>Order Total</p>
				<p>${orderTotal}</p>
			</div>
			{addToOrder && showOrderDetails && (
				<button
					className={classes.order_button}
					onClick={addToOrder.bind(this, cartId)}
				>
					Order Again
				</button>
			)}
		</li>
	);
};

export default OrderContainer;
