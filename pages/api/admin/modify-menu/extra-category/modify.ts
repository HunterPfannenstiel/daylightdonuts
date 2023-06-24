import { NextApiHandler } from "next";
import { ServerError } from "custom-objects/ServerError";
import {
  CreateExtraCategory,
  ModifyExtraCategory,
  createExtraCategory,
  modifyExtraCategory,
} from "@_utils/database/admin/menu-queries/extras";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const info = req.body as CreateExtraCategory;
      const { new_id } = await createExtraCategory(info);
      return res.status(200).json(new_id);
    } else if (req.method === "PATCH") {
      const info = req.body as ModifyExtraCategory;
      await modifyExtraCategory(info);
      return res.status(200).json({ message: "Success!" });
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    ServerError.sendErrorResponse(error, res);
  }
};
export default handler;
