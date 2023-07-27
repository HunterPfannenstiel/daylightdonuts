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
	unitPrice?: number;
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
	unitPrice,
	price,
	deleteable,
	onDelete,
}) => {
	return (
		<li key={cartId}>
			<div className={classes.container}>
				<Image
					src={image}
					alt={name}
					width={100}
					height={100}
					className={classes.image}
				/>
				<div className={classes.item_details}>
					<div>
						<p className={classes.name}>{name}</p>
						<div className={classes.extras}>
							{extra_info?.info.map((extra) => (
								<p>{extra.extra}</p>
							))}
						</div>
					</div>
				</div>
				<p className={classes.price}>
					${/* (unitPrice ? +unitPrice * amount : price!).toFixed(2) */}
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
