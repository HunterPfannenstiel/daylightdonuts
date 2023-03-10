import { MutableRefObject } from "react";
import { Availability } from "./menu";

export type DBCartItem = {
  subtotal: string;
  unitprice: string;
  cartitemid: number;
  menuitemid: number;
  amount: number;
  name: string;
  image: string;
  groupname: string | null;
  groupsize: number | null;
  groupprice: string | null;
  extras: Extra[];
  extraids: number[];
  extraprice: number | null;
  availability: Availability;
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
  dbModifier: DBModifier,
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
  cartItemId: number;
  menuItemId: number;
  amount: number;
  subtotal: number;
  extraIds: number[];
  extraPrice: number | null;
};

export type UpdatedCartItem = {
  cartItemId: number;
  updateAmount: number;
  subtotal: number;
};

export type UpdateDB = {
  newItems: NewCartItem[];
  updateItems: UpdatedCartItem[];
};

export type DBModifier = (updates: UpdateDB) => void;

export type MutateCart = {
  updates: UpdateDB;
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
  subtotal: number;
};

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
