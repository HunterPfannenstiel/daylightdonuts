import { getPickupInfo } from "@_utils/database/checkout";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const info = await getPickupInfo();
      return res.status(200).json(info);
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export default handler;
