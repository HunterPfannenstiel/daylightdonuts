import { Category, Subcategories } from "@_types/header";
import {
  getAllItemCategories,
  getAllSubcategories,
} from "@_utils/header/queries";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { category } = req.query;

    let categories: Category | Subcategories;
    try {
      if (category === "undefined" || !category) {
        console.log(category);
        categories = await getAllItemCategories();
      } else if (category && typeof category !== "object") {
        categories = await getAllSubcategories(category);
      } else {
        res.status(400).json({ message: "Request not formatted properly" });
        return;
      }
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
