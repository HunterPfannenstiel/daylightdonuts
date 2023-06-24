import { sendErrorResponse } from "@_utils/admin/modify-menu";
import { fetchItemSelections } from "@_utils/database/admin/menu-queries/modify-item";
import { typeCheck } from "@_utils/index";
import { ServerError } from "custom-objects/ServerError";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { id } = req.query;
      typeCheck("string", { name: "id", value: id });
      const selections = await fetchItemSelections(+(id as string));
      return res.status(200).json(selections);
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    sendErrorResponse(error, res);
  }
};
export default handler;
