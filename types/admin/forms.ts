import { DateRange } from "react-day-picker";

export type ItemImage = {
  imageId?: number;
  imageUrl: string;
  publicId?: string | null;
  displayOrder?: number;
  blob?: Blob;
  name?: string;
};

export type MenuItemDetails = {
  // 'image: ItemImage;'
  name: string;
  price: string;
  description: string;
  isActive: boolean;
  isArchived: boolean;
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
  details: MenuItemDetails;
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

export type InitialItemSelections = {
  initial_details: MenuItemDetails;
  initial_group_id: number | null;
  initial_extra_groupings: SelectedExtraGroupings | null;
  initial_item_categories: SelectedItemCategories | null;
  initial_weekdays: SelectedWeekdays | null;
  initial_range: ItemDateRange | null;
  initial_images: ItemImage[];
};

export type ModifyItem = {
  itemId: number;
  itemDetails?: string; //JSON of ModifyItemDetails;
  addExtraGroups?: string; //JSON array of ids
  removeExtraGroups?: string; //JSON array of ids
  addCategories?: string; //JSON array of ids
  removeCategories?: string; //JSON array of ids
  addSubcategories?: string; //JSON array of ids,
  removeSubcategories?: string; //JSON array of ids,
  addWeekdays?: string; //JSON array of ids,
  removeWeekdays?: string; //JSON array of ids,
  addExtraImages?: ItemImage[];
  removeExtraImages?: string; //JSON array of ids
};

export type ModifyItemDetails = {
  name: string | null;
  price: string | null;
  description: string | null;
  groupingId: number | null;
  displayImage: ItemImage | null;
  isActive: boolean | null;
  isArchived: boolean | null;
  availabilityRange: string | null;
};
