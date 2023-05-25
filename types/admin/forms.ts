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

export type ExtraGrouping = {
  name: string;
  extra_group_id: number;
  extras: string[];
};

export type AvailableExtraGroupings = {
  category: string;
  extra_groupings: ExtraGrouping[];
}[];

export type SelectedExtraGroupings = {
  [category: string]: number | undefined;
};

export type Grouping = { grouping_id: number; name: string };

export type NewMenuItemInfo = {
  details: MenuItemDetials;
  groupingId: number;
};
