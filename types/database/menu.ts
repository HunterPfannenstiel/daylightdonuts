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
  price: string | null;
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
  image: string;
  description: string;
  dozenprice: string | null; //groupprice
  groupname: string | null;
  groupsize: number | null;
  extras: ItemExtras[] | null;
  availability: Availability;
};
/*Specific Item*/
