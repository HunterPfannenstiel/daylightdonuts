import { NextApiHandler } from "next";
import { ServerError } from "custom-objects/ServerError";
import { typeCheck } from "@_utils/index";
import { fetchItemCategorySelections } from "@_utils/database/admin/menu-queries/categories";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { id } = req.query;
      typeCheck("string", { name: "id", value: id });
      const selections = await fetchItemCategorySelections(+(id as string));
      return res.status(200).json(selections);
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    ServerError.sendErrorResponse(error, res);
  }
};
export default handler;
