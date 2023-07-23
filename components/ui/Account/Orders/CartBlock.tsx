import { FunctionComponent } from 'react';
import classes from './CartBlock.module.css';
import { DBCartItem, ExtraDetails } from '@_types/database/cart';
import Image from 'next/image';

interface CartBlockProps {
	cart: DBCartItem[];
}

const CartBlock: FunctionComponent<CartBlockProps> = ({ cart }) => {
	const imageItemDetails: {
		image: string;
		name: string;
		extra_info: ExtraDetails | null;
	}[] = [];
	const prices: string[] = [];
	const amounts: number[] = [];
	cart?.forEach((item) => {
		imageItemDetails.push({
			image: item.image,
			name: item.name,
			extra_info: item.extra_info,
		});
		prices.push('$' + (+item.unit_price * item.amount).toFixed(2));
		amounts.push(item.amount);
	});

	return (
		<div className={classes.block}>
			<div className={classes.image_item_details}>
				{imageItemDetails.map((details) => (
					<div className={classes.image_block}>
						<Image
							src={details.image}
							alt={details.name}
							width={100}
							height={100}
						/>
						<div>
							<p>{details.name}</p>
							<div className={classes.extras}>
								{details.extra_info?.info.map((info) => (
									<p>{info.extra}</p>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
			<div className={classes.prices}>
				{prices.map((price) => (
					<p>{price}</p>
				))}
			</div>
			<div className={classes.amounts}>
				{amounts.map((amount) => (
					<p>x{amount}</p>
				))}
			</div>
		</div>
	);
};

export default CartBlock;
