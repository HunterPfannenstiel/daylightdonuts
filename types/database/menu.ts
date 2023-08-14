// export type Availability = {
//   availableRange: string[] | [null];
//   availableDays: string[] | [null];
// };

import { ItemDateRange } from "@_types/admin/forms";

export type MenuItem = {
  name: string;
  image_url: string;
  price: string;
  availableDays?: string[];
  availableRange?: ItemDateRange;
};

/*Specific Item*/
export type ItemExtra = {
  name: string;
  price: number | null;
  id: number;
};

export type ItemExtras = {
  category: string;
  extras: ItemExtra[];
};

export type Item = {
  id: number;
  name: string;
  price: string;
  image_urls: string[];
  description: string;
  group_price: string | null;
  group_name: string | null;
  group_size: number | null;
  extras: ItemExtras[] | null;
  available_days?: string[];
  available_range?: ItemDateRange;
};
/*Specific Item*/
