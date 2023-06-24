import { NextApiHandler } from "next";
import { ServerError } from "custom-objects/ServerError";
import { viewExtras } from "@_utils/database/admin/menu-queries/extras";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const extras = await viewExtras();
      return res.status(200).json(extras);
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    ServerError.sendErrorResponse(error, res);
  }
};
export default handler;
