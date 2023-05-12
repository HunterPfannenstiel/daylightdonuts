export type Availability = {
  availableRange: string[] | [null];
  availableDays: string[] | [null];
};

export type MenuItem = {
  name: string;
  image: string;
  price: string;
  availability: Availability;
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
  //MODIFIED
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  group_price: string | null;
  group_name: string | null;
  group_size: number | null;
  extras: ItemExtras[] | null;
  availability: Availability;
};
/*Specific Item*/
