import { sendErrorResponse } from "@_utils/admin/modify-menu";
import { fetchOrdersWithinRange } from "@_utils/database/admin/order-queries";
import { parseUndefinedToNull } from "@_utils/index";
import { ServerError } from "custom-objects/ServerError";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { from, to } = req.query;
      console.log(from, to);
      if (typeof from !== "string" && from !== undefined) {
        throw new ServerError("The 'from' date is not the correct type");
      }
      if (typeof to !== "string" && to !== undefined) {
        throw new ServerError("The 'to' date is not the correct type");
      }

      const orders = await fetchOrdersWithinRange(
        parseUndefinedToNull(from),
        parseUndefinedToNull(to)
      );
      return res.status(200).json(orders);
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
export default handler;
