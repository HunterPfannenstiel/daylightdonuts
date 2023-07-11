import { ItemDateRange } from "./admin/forms";

export type NewCartItemExtra = {
  id: number;
} & CartItemExtra;

export type NewCartItem = {
  id: number;
  amount: number;
  extras?: NewCartItemExtra[];
  extraPrice?: number;
};

export type CartItem = {
  amount: number;
  extras?: CartItemExtra[];
  extraPrice?: number;
};

export type CartItemExtra = {
  text: string;
  price?: number | null;
};

export type CartSectionDetails = {
  name: string;
  price: string;
  imageUrl: string;
  availableDays?: string[];
  availableRange?: ItemDateRange;
};

export type CartSection = {
  items: { [cartItemId: number]: CartItem };
  details: CartSectionDetails;
};

export type CartItems = { [itemId: number]: CartSection };

export type Cart = {
  items: CartItems;
  price: string;
  totalItems: number;
  nextId: number;
  status: CartStatus;
};

export type CartStatus = "Pending" | "Complete" | "New" | "Open";

export type CartDBResponse = {
  items: { [itemId: number]: CartSection };
  status: CartStatus;
};

export type NewDBCartItem = {
  menu_item_id: number;
  amount: number;
  extra_ids: number[];
};

export type ExistingCartItem = {
  menu_item_id?: number;
  amount: number;
  extra_ids?: number[];
};

export type CartDatabaseUpdate = NewDBCartItem | ExistingCartItem;

export type CartDatabaseUpdates = {
  [cartItemId: number]: CartDatabaseUpdate;
};

export type CheckoutSection = {
  details: CartSectionDetails & { itemId: number };
  items: (CartItem & { cartItemId: number })[];
};
