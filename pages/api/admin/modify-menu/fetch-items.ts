import { fetchItems } from "@_utils/database/admin/update-queries";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { phrase, includeArchived, includeInactive } = req.query;
      const items = await fetchItems(
        phrase,
        parseBoolean(includeArchived),
        parseBoolean(includeInactive)
      );
      return res.status(200).json(items);
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export default handler;

const parseBoolean = (boolString: string | string[] | undefined) => {
  if (boolString === "true") return true;
  if (boolString === "false") return false;
  return null;
};
