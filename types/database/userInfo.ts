import { DBCartItem } from './cart';

export type UserInfo = {
	infos: Info[] | null;
	favorite_id: number | null;
};

export type Info = {
	first_name: string;
	last_name: string;
	phone_number: string;
	email: string;
	id: number;
};

export type UpdatingInfo = {
	favorite: boolean;
} & Partial<Info>;

export type AddUserInfo = {
	first_name: string;
	last_name: string;
	phone_number: string;
	favorite: boolean;
};

export type FetchedInfo = {
	info: UserInfo | null;
	isSignedIn: boolean;
};

export type UserOrder = {
	cart_id: number;
	cart: DBCartItem[];
};
