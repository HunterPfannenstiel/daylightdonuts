import { MenuItem } from "@_types/database/menu";
import type { NextApiRequest, NextApiResponse } from "next";
import { getFilterItems } from "utils/database/menu";

type Data = {
  menuItems: MenuItem[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { category, filter } = req.query;
    try {
      if (typeof category !== "object" && typeof filter !== "object") {
        const menuItems = await getFilterItems(category, filter);
        res.status(200).json(menuItems);
      } else {
        res.status(400).json({
          error: "An array was given for either the category of subcategory",
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  } else {
    res.status(400);
  }
}
