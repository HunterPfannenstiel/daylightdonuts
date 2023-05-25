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
