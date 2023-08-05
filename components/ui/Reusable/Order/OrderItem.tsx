import { FunctionComponent } from 'react';
import classes from './OrderItem.module.css';
import { DBCartItem, Extra, ExtraDetails } from '@_types/database/cart';
import Image from 'next/image';
import { concatClassNames } from '@_utils/client';

interface OrderItemProps {
	name: string;
	image: any;
	cartId: number;
	amount: number;
	extra_info?: ExtraDetails | null;
	unit_price?: string;
	price?: number;
	deleteable?: boolean;
	onDelete?: (cart_item_id: number) => void;
}

const OrderItem: FunctionComponent<OrderItemProps> = ({
	name,
	image,
	cartId,
	amount,
	extra_info,
	unit_price,
	price,
	deleteable,
	onDelete,
}) => {
	return (
		<li>
			<div className={classes.container}>
				<div className={classes.image_div}>
					<Image
						src={image}
						alt={name}
						width={100}
						height={100}
						className={classes.image}
					/>
				</div>
				<div className={classes.item_details}>
					<p className={classes.name}>{name}</p>
					<div className={classes.extras}>
						{extra_info?.info.map((extra) => (
							<p>{extra.extra}</p>
						))}
					</div>
				</div>
				<p className={classes.price}>
					${(unit_price ? +unit_price * amount : price!).toFixed(2)}
				</p>
				<p
					className={concatClassNames(
						classes.amount,
						deleteable ? '' : classes.last
					)}
				>
					x{amount}
				</p>
				{deleteable && (
					<button
						onClick={onDelete?.bind(this, cartId)}
						className={classes.deleteable}
					>
						X
					</button>
				)}
			</div>
		</li>
	);
};

export default OrderItem;
