import { sendErrorResponse } from "@_utils/admin/modify-menu";
import { fetchItemSelections } from "@_utils/database/admin/update-queries";
import { ServerError } from "custom-objects/ServerError";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { id } = req.query;
      if (typeof id !== "string") {
        throw new ServerError("The id of the item could not be parsed", 400);
      }
      const selections = await fetchItemSelections(+id);
      return res.status(200).json(selections);
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    sendErrorResponse(error, res);
  }
};
export default handler;
