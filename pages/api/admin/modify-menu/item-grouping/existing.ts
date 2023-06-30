import { NextApiHandler } from "next";
import { ServerError } from "custom-objects/ServerError";
import { viewItemGroupings } from "@_utils/database/admin/menu-queries/groupings";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const itemGroupings = await viewItemGroupings();
      return res.status(200).json(itemGroupings);
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    ServerError.sendErrorResponse(error, res);
  }
};
export default handler;
