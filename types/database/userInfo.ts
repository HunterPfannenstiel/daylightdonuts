import { DBCartItem } from "./cart";

export type FetchedUserInfo = {
  infos: UserInfo[] | null;
  favorite_id: number | null;
  isSignedIn: boolean;
  email?: string;
};

export type UserInfo = {
  first_name: string;
  last_name: string;
  phone_number: string;
  favorite: boolean;
  id: number;
};

export type AddUserInfo = {
  first_name: string;
  last_name: string;
  phone_number: string;
  favorite: boolean;
};

export type UserOrder = {
  cart_id: number;
  cart: DBCartItem[];
};
