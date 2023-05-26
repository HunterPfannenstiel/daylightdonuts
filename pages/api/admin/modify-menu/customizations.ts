import { fetchItemCustomizations } from "@_utils/database/admin/update-queries";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const customizations = await fetchItemCustomizations();
      return res.status(200).json(customizations);
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export default handler;
