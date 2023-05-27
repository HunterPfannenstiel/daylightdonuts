import { ImageUpload, NewDBItem } from "@_types/admin/forms";
import { createNewMenuItem } from "@_utils/database/admin/update-queries";
import { parseManyImages } from "@_utils/image";
import { deleteManyImages, uploadManyImages } from "@_utils/image/cloudinary";
import { NextApiHandler } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  let images: ImageUpload[] = [];
  try {
    if (req.method === "POST") {
      const files = await parseManyImages(req, res, "images", 4); //Note: Don't combine parsing images and uploading into one function because you have to parse the images to be able to get access to req.body to verify item
      const newItem = req.body as NewDBItem;
      const validity = verifyNewItem(newItem);
      if (validity.isValid) {
        images = await uploadManyImages(files);
        console.log(newItem);
        const itemId = await createNewMenuItem(newItem, images[0].imageUrl); //PASS IN 'images'
        return res.status(200).json({ itemId });
      } else {
        return res.status(400).json({ message: validity.message });
      }
    } else if (req.method === "PATCH") {
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    if (images.length > 0) deleteManyImages(images.map((img) => img.publicId));
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export default handler;

const verifyNewItem = (
  item: NewDBItem
): { isValid: true } | { isValid: false; message: string } => {
  return { isValid: true };
};
