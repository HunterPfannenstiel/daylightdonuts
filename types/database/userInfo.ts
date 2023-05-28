import { DBCartItem } from "./cart";

export type UserInfo = {
    infos: Info[] | undefined;
    favorite_id: number | undefined;
}

export type Info = {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    id: number;
}

export type FetchedInfo = {
    info: UserInfo | null;
    isSignedIn: boolean;
}

export type UserInfoContext = {
} & UserInfo;

export type UserOrder = {
    cart_id: number;
    cart: DBCartItem[];
}