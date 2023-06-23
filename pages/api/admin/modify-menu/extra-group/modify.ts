import { NextApiHandler } from "next";
import { ServerError } from "custom-objects/ServerError";
import {
  CreateExtraGroup,
  createExtraGroup,
} from "@_utils/database/admin/menu-queries/extras";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const info = req.body as CreateExtraGroup;
      const { new_group_id } = await createExtraGroup(info);
      return res.status(200).json(new_group_id);
    } else if (req.method === "PATCH") {
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    ServerError.sendErrorResponse(error, res);
  }
};
export default handler;
