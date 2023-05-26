import { ImageUpload, NewDBItem } from "@_types/admin/forms";
import { createNewMenuItem } from "@_utils/database/admin/update-queries";
import { parseImage } from "@_utils/image";
import multer from "multer";
import { NextApiHandler } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

let imageParser = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}).array("images", 4);

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const imageBuffers = (await parseImage(req, res, imageParser, false)) as {
        buffer: Buffer;
      }[];
      const newItem = req.body as NewDBItem;
      const images = await uploadManyImages(
        imageBuffers.map((img) => img.buffer)
      ); //IMPLEMENT FUNCTION
      console.log("New Item", newItem);
      const validity = verifyNewItem(newItem);
      if (validity.isValid) {
        const itemId = await createNewMenuItem(newItem, "imageUrl"); //PASS IN 'images'
        return res.status(200).json({ itemId });
      } else {
        return res.status(400).json({ message: validity.message });
      }
    } else if (req.method === "PATCH") {
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
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

const uploadManyImages = async (images: Buffer[]): Promise<ImageUpload[]> => [];
