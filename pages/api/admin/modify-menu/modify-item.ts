import { ImageUpload, ModifyItem, NewDBItem } from "@_types/admin/forms";
import { sendErrorResponse, validateNewItem } from "@_utils/admin/modify-menu";
import {
  createNewMenuItem,
  modifyMenuItem,
} from "@_utils/database/admin/update-queries";
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
      validateNewItem(newItem, files);
      images = await uploadManyImages(files);
      console.log(newItem);
      const itemId = await createNewMenuItem(newItem, images); //PASS IN 'images'
      return res.status(200).json({ itemId });
    } else if (req.method === "PATCH") {
      const files = await parseManyImages(req, res, "images", 4);
      const modifications = req.body as ModifyItem;
      images = await uploadManyImages(files);
      const removedPublicIds = await modifyMenuItem(modifications, images);
      if (removedPublicIds.length > 0) deleteManyImages(removedPublicIds);
      return res.status(200);
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    if (images.length > 0) deleteManyImages(images.map((img) => img.publicId));
    sendErrorResponse(error, res);
  }
};
export default handler;
