import { ItemDateRange } from "./admin/forms";
import { NewCartItemExtra } from "./cart";
import { CartItem, Extra } from "./database/cart";

export type DozenableDBResponse = {
  name: string;
  price: number;
  size: number;
};

export type DozenBoxItem = {
  id: number;
  name: string;
  amount: number;
  unitPrice: number;
  extras: NewCartItemExtra[];
  image: string;
  availability?: string[];
  rangeAvailability?: ItemDateRange;
};

export type DozenBoxItems = {
  [p: string]: DozenBoxItem;
};

export type DozenBox = {
  boxSize: number;
  currentCount: number;
  items: DozenBoxItems;
};

export type BoxContext = {
  box: DozenBox;
  dispatchBox: (action: BoxPayload) => void;
  isItemInBox: (itemId: string) => boolean;
  amountNeeded: number;
  addBoxToCart: (amount?: number) => void;
};

export type BoxPayload =
  | {
      type: "Update";
      itemId: string;
      amount: number;
    }
  | { type: "New"; itemId: string; item: DozenBoxItem }
  | { type: "Clear"; boxSize: number };

export type DozenBoxUpdateItem = {
  itemId: string;
  item: CartItem;
};
