import { getAllItemCategories } from "@_utils/header/queries";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const categories = await getAllItemCategories();
      res.status(200).json(categories);
      return;
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e });
      return;
    }
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};

export default handler;
