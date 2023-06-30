import { NextApiHandler } from "next";
import { ServerError } from "custom-objects/ServerError";
import {
  PostCreateItemGrouping,
  PostModifyItemGrouping,
  createItemGrouping,
  modifyItemGrouping,
} from "@_utils/database/admin/menu-queries/groupings";
import { parseSingleImage } from "@_utils/image";
import { deleteImage, uploadImage } from "@_utils/image/cloudinary";
import { ImageUpload } from "@_types/admin/forms";
import { parseUndefinedToNull } from "@_utils/index";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  let image: ImageUpload;
  try {
    if (req.method === "POST") {
      const file = await parseSingleImage(req, res, "image");
      const info = req.body as PostCreateItemGrouping;
      image = await uploadImage(file.buffer, file.originalname);
      const { new_id } = await createItemGrouping({
        name: info.name,
        price: info.price,
        size: +info.size,
        image,
        menuItemIds: JSON.parse(info.menuItemIds),
      });
      return res.status(200).json(new_id);
    } else if (req.method === "PATCH") {
      const file = await parseSingleImage(req, res, "image");
      const info = req.body as PostModifyItemGrouping;
      if (file) {
        image = await uploadImage(file.buffer, file.originalname);
      }
      const size = parseUndefinedToNull(info.size);
      const isActive =
        info.isActive === "undefined"
          ? undefined
          : info.isActive === "true"
          ? true
          : false;
      const addItemIds = parseUndefinedToNull(info.addItemIds);
      const removeItemIds = parseUndefinedToNull(info.removeItemIds);
      const { removed_public_id } = await modifyItemGrouping({
        groupingId: info.groupingId,
        name: parseUndefinedToNull(info.name),
        price: parseUndefinedToNull(info.price),
        size: size ? +size : undefined,
        image: image! || undefined,
        isActive,
        addItemIds: addItemIds ? JSON.parse(addItemIds) : undefined,
        removeItemIds: removeItemIds ? JSON.parse(removeItemIds) : undefined,
      });
      if (removed_public_id) deleteImage(removed_public_id);
      return res.status(200).json({ message: "Updated!" });
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    if (image!) deleteImage(image.publicId);
    ServerError.sendErrorResponse(error, res);
  }
};
export default handler;
