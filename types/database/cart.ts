import { MutableRefObject } from "react";
import { Availability } from "./menu";

export type DBCartItem = {
  //modify the cart initialization to calculate the subtotal instead of the DB
  unit_price: string;
  cart_item_id: number;
  menu_item_id: number;
  amount: number;
  name: string;
  image: string;
  group_name: string | null;
  group_size: number | null;
  group_price: string | null;
  extra_info: ExtraDetails | null;
  availability: Availability;
};

export type ExtraDetails = {
  info: Extra[];
  ids: number[];
  price: string;
};

export type Extra = {
  category: string;
  extra: string;
};

export type CartItem = {
  name: string;
  amount: number;
  unitPrice: number;
  cartItemId: number;
  extras: Extra[] | [null];
  image: string;
  availability: Availability;
};

export type UpdateItem = { itemId: string; amount: number };

export type Items = {
  [p: string]: CartItem;
};

/*Dozen Types*/
export type CartDozenItem = {
  id: string;
  item: CartItem;
};

export type CartDozen = {
  amount: number;
  items: CartDozenItem[];
};

export type CartDozens = {
  [p: string]: CartDozen;
};

export type DozenableItem = {
  id: string;
  item: CartItem;
};
/*Dozen Types*/

export type CartGroup = {
  totalItems: number;
  subtotal: number;
  groupSize: number;
  groupPrice: number;
  items: Items;
  dozens: CartDozens;
  totalDozens: number;
};

export type CartGroups = {
  [p: string]: CartGroup;
};

export type CartDictionary = {
  groups: CartGroups;
  totalItems: number;
  totalPrice: number;
};

export type CartModifier = (cart: CartDictionary) => void;

export type ModifyCart = (
  modifier: CartModifier,
  dbModifier: DBModifier | null,
  timeoutTime: number
) => void;

export type CartState = {
  cart: CartDictionary | undefined;
  modifyCart: ModifyCart;
  nextItemId: number;
  incrementId: () => void;
  setNextItemId: (newId: number) => void;
  isLoading: boolean;
};

export type CartToken = {
  cartId: string;
};

export type NewCartItem = {
  cart_item_id: number;
  menu_item_id: number;
  amount: number;
  extra_ids: number[];
};

export type UpdatedCartItem = {
  cart_item_id: number;
  amount: number;
};

export type UpdateCartItem = NewCartItem | UpdatedCartItem;

export type DBModifier = (updates: UpdateCartItem[]) => void;

export type MutateCart = {
  updates: UpdateCartItem[];
  timer: MutableRefObject<NodeJS.Timeout>;
  timeoutTime: number;
  cartModifier: CartModifier;
};

export type CartExtraInfo = {
  [p: string]: ExtraInfo;
};

export type ExtraInfo = {
  extra: string;
  id: number;
  price: number | null;
};

export type NewItemsDB = [
  number,
  string,
  number,
  number,
  number,
  number | null
];

export type NewExtrasDB = [number, string, number];

type PendingDBUpdate = {
  updateAmount: number;
};

// 'p' will be the cart_item_id
export type PendingDBUpdates = {
  [p: string]: PendingDBUpdate;
};

export type ExistingItemUpdates = {
  [p: string]: UpdateItem[];
};

export type DozenUpdate = {
  dozenId: string;
  amount: number;
};

export type DozenUpdates = {
  [p: string]: DozenUpdate;
};

type DozenItemUpdate = {
  [p: string]: UpdateItem[];
};

export type DozenItemUpdates = {
  [p: string]: DozenItemUpdate;
};

export type DozenDBItem = {
  cartItemId: string;
  modifyPrice: number;
  modifyItems: number;
};

export type ManyDBUpdates = {
  newItems: NewCartItem[];
  exisitingItems: UpdatedCartItem[];
};

export type AddItem = {
  id: number;
  name: string;
  amount: number;
  unitPrice: number;
  image: string;
  extras: Extra[];
  availability: Availability;
};

export type AddItems = {
  itemId: string;
  item: AddItem;
}[];
