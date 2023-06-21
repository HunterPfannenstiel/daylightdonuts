import { NextApiHandler } from "next";
import { ServerError } from "custom-objects/ServerError";
import {
  CreateExtra,
  ModifyExtra,
  createExtra,
  modifyExtra,
} from "@_utils/database/admin/menu-queries/extras";
import { validateNewExtra } from "@_utils/admin/modify-menu";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const info = req.body as CreateExtra;
      validateNewExtra(info);
      const { new_extra_id } = await createExtra(info);
      return res.status(200).json(new_extra_id);
    } else if (req.method === "PATCH") {
      const info = req.body as ModifyExtra;
      await modifyExtra(info);
      return res.status(200).json({ message: "Updated!" });
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    ServerError.sendErrorResponse(error, res, true);
  }
};
export default handler;
