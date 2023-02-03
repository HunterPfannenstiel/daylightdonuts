import { getOrdersByRange } from "@_utils/orders/queries";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const startDate = req.query.start;
    const endDate = req.query.end;
    if (typeof startDate === "string" && typeof endDate === "string") {
      if (startDate !== "undefined" && endDate !== "undefined") {
        try {
          const orders = await getOrdersByRange({ startDate, endDate });
          res.status(200).send(orders);
          return;
        } catch (e: any) {
          console.log(e);
          res.status(500).send({ message: e.message });
          return;
        }
      }
    }
    res.status(400).end();
  } else {
    res.status(400).end();
  }
};

export default handler;
