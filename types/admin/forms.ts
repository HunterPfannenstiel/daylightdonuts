import { DateRange } from "react-day-picker";
import { DBEntity, NestedDBEntity } from "./modify-menu";
import { NestedSelections } from "@_hooks/admin/menu/modification/useNestedSelections";
import { InitialSelections } from "@_hooks/admin/menu/modification/useSelections";

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

export type ExtraGrouping = {
  extras: string[];
} & DBEntity;

export type AvailableExtraGrouping = {
  name: string;
  extra_groupings: ExtraGrouping[];
};

export type SelectedExtraGroupings = {
  [category: string]: number | undefined;
};

export type ItemDateRange = { from: string; to: string };

export type UpdateRangeAvailability = {
  index?: number;
  range?: DateRange;
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
  description: string;
  groupingId?: number | string;
  extraGroups?: string; //JSON array of ids
  categories?: string; //JSON array of ids;
  subcategories?: string; //JSON array of ids;
  availableWeekdays?: string; //JSON array of ids;
  availabilityRange?: string;
  newImageDisplayOrder?: string; //JSON object mapping image name to display order
};

export type Customizations = {
  groupings: DBEntity[];
  extra_groupings: AvailableExtraGrouping[];
  item_categories: NestedDBEntity[];
};

export type ImageUpload = {
  publicId: string;
  imageUrl: string;
  displayOrder?: number;
  name: string;
};

export type InitialItemSelections = {
  initial_details: MenuItemDetails;
  initial_group_id: number | null;
  initial_extra_groupings: InitialSelections<number | undefined> | null;
  initial_item_categories: NestedSelections | null;
  initial_weekdays: InitialSelections | null;
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
  removeExtraImages?: string; //JSON array of ids
  initialImages?: string; //JSON array of ItemImage
  newImageDisplayOrder?: string; //JSON object mapping image name to display order
};

export type ModifyItemDetails = {
  name?: string | null;
  price?: string | null;
  description?: string | null;
  groupingId?: number | null;
  displayImage?: ItemImage | null;
  isActive?: boolean | null;
  isArchived?: boolean | null;
  availabilityRange?: string | null;
};
