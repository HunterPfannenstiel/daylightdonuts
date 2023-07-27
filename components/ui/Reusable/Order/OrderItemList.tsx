import { FunctionComponent } from 'react';
import { UserOrder } from '@_types/database/userInfo';
import OrderItem from './OrderItem';
import { ExtraDetails } from '@_types/database/cart';

type CartItemDisplay = {
	image: any;
	name: string;
	extra_info: ExtraDetails | null;
	amount: number;
	price?: number;
	unit_price?: string;
};

interface OrderItemListProps {
	cart: CartItemDisplay[];
	cartId: number;
	onDelete?: (cartId: number) => void;
}

const OrderItemList: FunctionComponent<OrderItemListProps> = ({
	cart,
	cartId,
	onDelete,
}) => {
	return (
		<ul>
			{cart.map((cartItem) => {
				return <OrderItem {...cartItem} cartId={cartId} onDelete={onDelete} />;
			})}
		</ul>
	);
};

export default OrderItemList;
