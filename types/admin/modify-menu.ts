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
