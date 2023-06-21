export type Item = {
  name: string;
  image_url: string;
  menu_item_id: number;
};

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

export type InitialSelections = { [id: number]: boolean };

export type ExtraGroup = DBEntity & { extra_category_id: number };

export type CategoryExtras = {
  category: string;
  extras: DBEntity[];
};

export type ExtraCustomizations = {
  categories: DBEntity[];
  groups: ExtraGroup[];
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
  price: string;
  abbreviation: string;
  isArchived?: boolean;
};

export type ExtraGroupCustomizations = {
  categories: DBEntity[];
  items: DBEntity & { extra_group_ids: number[] }[];
  extras: { category: string; extras: DBEntity[] };
};

export type ExtraGroupSelections = {
  initial_extras: InitialSelections;
  initial_items: InitialSelections;
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

export type CategorySelections = {
  initial_subcategories: InitialSelections;
  initial_items: InitialSelections;
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
  price: number | null;
  abbreviation: number | null;
};

export type NewCategorySubcategory = { name: string };

export type CategoryItemInfo = { itemId: number; subcategory: string };
