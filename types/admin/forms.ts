import { DateRange } from "react-day-picker";

export type ClientImage = {
  url: string;
  blob?: Blob;
};

export type MenuItemDetials = {
  image: ClientImage;
  name: string;
  price: string;
  description: string;
};

export type AvailableGrouping = {
  grouping_id: number;
  name: string;
};

export type ExtraGrouping = {
  name: string;
  extra_group_id: number;
  extras: string[];
};

export type AvailableExtraGrouping = {
  name: string;
  extra_groupings: ExtraGrouping[];
};

export type SelectedExtraGroupings = {
  [category: string]: number | undefined;
};

export type AvailableSubcategory = {
  name: string;
  item_subcategory_id: number;
};

export type AvailableItemCategory = {
  name: string;
  item_category_id: number;
  subcategories: AvailableSubcategory[];
};

/**
 * Shape: {1: {1: true, 2: true}} //The item belongs to the Category with 'id' 1 and belongs to the Subcategories that belong to 'id' 1 and 2
 */
export type SelectedItemCategories = {
  [categoryId: number]: { [subcategoryId: number]: boolean };
};

export type ItemDateRange = { from: string; to: string };

export type UpdateRangeAvailability = {
  index?: number;
  range?: DateRange;
};

export type SelectedWeekdays = {
  [weekdayId: number]: boolean;
};

export type NewMenuItemInfo = {
  details: MenuItemDetials;
  groupingId: number;
  extraGroupingIds: number[];
  itemCategories: number[];
  itemSubcategories: number[];
};

export type NewDBItem = {
  name: string;
  price: number;
  images: Blob[];
  description: string;
  groupingId?: number | string;
  extraGroups?: string; //JSON array of ids
  categories?: string; //JSON array of ids;
  subcategories?: string; //JSON array of ids;
  availableWeekdays?: string; //JSON array of ids;
  availabilityRange?: ItemDateRange | "undefined";
  imageDisplayOrders?: string; //JSON array of display orders
};

export type Customizations = {
  groupings: AvailableGrouping[];
  extra_groupings: AvailableExtraGrouping[];
  item_categories: AvailableItemCategory[];
};

export type ImageUpload = {
  publicId: string;
  imageUrl: string;
  displayOrder?: number;
};
