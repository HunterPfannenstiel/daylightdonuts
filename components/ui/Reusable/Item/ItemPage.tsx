import { Item } from '@_types/database/menu';
import Back from 'components/ui/svg/Back';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import classes from './ItemPage.module.css';
import ItemForm from './Form/ItemForm';
import { ExtraInfo } from '@_types/database/cart';
import Heading from '../Heading';

interface ItemPageProps {
	item: Item;
	extraPrice: number;
	price: number;
	className?: string;
	backButtonHandler: () => void;
	updateExtras: (category: string, extraInfo: ExtraInfo) => void;
	buttonName?: string;
	maxAmount?: number;
	addItemToCart: (amount: number) => void;
}

const ItemPage: FunctionComponent<ItemPageProps> = ({
	item,
	extraPrice,
	price,
	className,
	backButtonHandler,
	updateExtras,
	addItemToCart,
	buttonName,
	maxAmount,
}) => {
	const image =
		item.image_urls[0] === 'imageURL'
			? '/Images/DAYLIGHTDONUTS.png'
			: item.image_urls[0];

	return (
		<div className={classes.item + ' ' + className}>
			<Heading position="center" tilt="none">
				<h2>{item.name}</h2>
			</Heading>
			<div className={classes.item_content}>
				<div className={classes.image_container}>
					<Image src={image} alt={item.name} width={500} height={500} />
				</div>
				<div className={classes.details}>
					<div className={classes.info}>
						<p className={extraPrice ? classes.bold : ''}>{`$${(+price).toFixed(
							2
						)}`}</p>
						{extraPrice ? (
							<p className={classes.extra_price}>{`+ $${extraPrice.toFixed(
								2
							)}`}</p>
						) : (
							''
						)}
					</div>
					<p className={classes.description}>{item.description}</p>
					<ItemForm
						extras={item.extras}
						updateExtras={updateExtras}
						addItemToCart={addItemToCart}
						buttonName={buttonName}
						maxAmount={maxAmount}
					/>
				</div>
			</div>
		</div>
	);
};

export default ItemPage;

{
	//Old item name header setup
	/* <div className={classes.name_bg}>
						<div>
							<p>{item.name}</p>
						</div>
					</div> */
}
