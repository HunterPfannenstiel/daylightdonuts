import { Item } from '@_types/database/menu';
import Back from 'components/ui/svg/Back';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import classes from './ItemPage.module.css';
import ItemForm from './Form/ItemForm';
import { ExtraInfo } from '@_types/database/cart';

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
			<div className={classes.item_content}>
				{/* <div className={classes.back}>
					<Back backButtonHandler={backButtonHandler} />
				</div> */}
				<div className={classes.info}>
					<div className={classes.name_bg}>
						<h2>
							<p>{item.name}</p>
						</h2>
					</div>
					<p className={extraPrice ? classes.bold : ''}>{`$${(+price).toFixed(
						2
					)} / ea`}</p>
					{extraPrice ? (
						<p className={classes.extra_price}>{`+ $${extraPrice.toFixed(
							2
						)}`}</p>
					) : (
						''
					)}
				</div>
				<div className={classes.image_container}>
					<Image src={image} alt={item.name} width={500} height={500} />
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
	);
};

export default ItemPage;
