import { InitialSelections } from "@_hooks/admin/menu/modification/useSelections";

export type Item = {
  image_url: string;
} & DBEntity;

export type MulterImage = {
  buffer: Buffer;
  originalname: string;
  fieldname: string;
  encoding: string;
  mimetype: string;
  size: number;
};

export type DBEntity = {
  name: string;
  id: number;
};

export type DisplayOrderItem = { id: number; displayOrder?: number };

export type ExtraGroup = { category: string; groups: DBEntity[] };

export type NestedDBEntity = { name: string; id: number; entities: DBEntity[] };

export type ExtraCustomizations = {
  categories: DBEntity[];
  groups: NestedDBEntity[];
};

export type ExtraSelections = {
  initial_category_id: number;
  initial_groups: InitialSelections;
  initial_abbreviation: string | null;
  initial_price: string | null;
  initital_archive: boolean;
};

export type ExtraDetails = {
  name: string;
  price: string | undefined;
  abbreviation: string;
  isArchived?: boolean;
};

export type ExtraGroupCustomizations = {
  items: (DBEntity & { extra_group_ids: number[] })[];
  extras: NestedDBEntity[];
};

export type ExtraCategoryExtra = {
  [id: number]: string;
};

export type CategoryDetailedItem = {
  id: number;
  name: string;
  category: string;
};

export type ExtraCategorySelections = {
  initial_extras: ExtraCategoryExtra;
};

export type ExtraCategoryCustomizations = (DBEntity & { category: string })[];

export type CategoryExtra = { category_id: number; extras: DBEntity[] };

export type ExtraGroupSelections = {
  initial_extras: InitialSelections | null;
  initial_items: InitialSelections | null;
  initial_category_id: number;
};

export type SubcategoryCustomizations = {
  categories: DBEntity[];
};

export type SubcategorySelections = {
  initial_category: number;
  initial_items: InitialSelections;
};

export type CategoryCustomizations = {
  items: DBEntity[];
  subcategories: DBEntity[];
};

export type CategoryItems = { [id: number]: string };
export type SubcategoryItems = { [name: string]: number[] };

export type CategorySelections = {
  initial_subcategories: DBEntity[];
  initial_items: CategoryItems;
  subcategory_items: SubcategoryItems;
  is_active: boolean;
};

export type GroupingItem = DBEntity & { is_in_grouping: boolean };

export type GroupingSelections = {
  items: InitialSelections;
  price: string;
  size: number;
  image: string;
  is_active: boolean;
};

export type ExtraGroupInfo = {
  extraGroupId: number;
  displayOrder: number | null;
};

export type ExtraGroupExtraInfo = {
  extraId: number;
  displayOrder: number | null;
};

export type NewExtraCategoryExtra = {
  name: string;
  price: string | null;
  abbreviation: string | null;
};

export type NewCategorySubcategory = { name: string };

export type CategoryItemInfo = { itemId: number; subcategory: string };
