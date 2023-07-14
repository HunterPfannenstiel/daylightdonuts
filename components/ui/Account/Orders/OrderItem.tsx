import { FunctionComponent } from 'react';
import classes from './OrderItem.module.css';
import { DBCartItem } from '@_types/database/cart';
import Image from 'next/image';

interface OrderItemProps {
	item: DBCartItem;
}

const OrderItem: FunctionComponent<OrderItemProps> = ({ item }) => {
	return (
		<li key={item.cart_item_id}>
			<div className={classes.container}>
				<Image src={item.image} alt={item.name} width={100} height={100} className={classes.image}/>
				<div className={classes.item_details}>
					<div>
						<p className={classes.name}>{item.name}</p>
						<div className={classes.extras}>
							{item.extra_info?.info.map((info) => (
								<p>{info.extra}</p>
							))}
						</div>
					</div>
				</div>
				<p className={classes.price}>${(+item.unit_price * item.amount).toFixed(2)}</p>
				<p className={classes.amount}>x{item.amount}</p>
			</div>
		</li>
	);
};

export default OrderItem;
