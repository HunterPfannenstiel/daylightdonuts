import { getDozenableGroups } from "@_utils/database/menu";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const groups = await getDozenableGroups();
      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(405);
  }
};

export default handler;
