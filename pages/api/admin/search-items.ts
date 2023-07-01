import { NextApiHandler } from "next";
import { ServerError } from "custom-objects/ServerError";
import { searchItems } from "@_utils/database/admin/search-items";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const items = await searchItems();
      return res.status(200).json(items);
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    ServerError.sendErrorResponse(error, res);
  }
};
export default handler;
