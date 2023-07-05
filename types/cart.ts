import { ItemDateRange } from "./admin/forms";
import { Availability } from "./database/menu";

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
  name: string;
  category: string;
  price?: number | null;
};

export type CartSectionDetails = {
  name: string;
  price: string;
  imageUrl: string;
  availableDays: string[];
  availableRange: ItemDateRange;
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
  itemId: number;
  amount: number;
  extraIds: number[];
};

export type ExistingCartItem = {
  itemId?: number;
  amount: number;
  extraIds?: number[];
};

export type CartDatabaseUpdate = NewDBCartItem | ExistingCartItem;

export type CartDatabaseUpdates = {
  [cartItemId: number]: CartDatabaseUpdate;
};
