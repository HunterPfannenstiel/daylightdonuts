import { DBCartItem } from './cart';

export type UserInfo = {
	infos: Info[] | undefined;
	favorite_id: number | undefined;
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
	should_update: boolean;
} & Partial<Info>;

export type FetchedInfo = {
	info: UserInfo | null;
	isSignedIn: boolean;
};

export type UserInfoContext = {
	editInfo: (info: UpdatingInfo) => Promise<boolean>;
	deleteInfo: (id: number) => Promise<boolean>;
} & UserInfo;

export type UserOrder = {
	cart_id: number;
	cart: DBCartItem[];
};
