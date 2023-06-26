import { NextApiHandler } from "next";
import { ServerError } from "custom-objects/ServerError";
import { viewItemCategories } from "@_utils/database/admin/menu-queries/categories";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const itemCategories = await viewItemCategories();
      return res.status(200).json(itemCategories);
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    ServerError.sendErrorResponse(error, res);
  }
};
export default handler;
