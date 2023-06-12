import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  if (req.body.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }
  try {
    const { name } = req.query;
    await res.revalidate(`/menu/${name}`);
    return res.status(200).json({ revalidated: true });
  } catch (error: any) {
    console.log(error);
    return res.status(500).send("Error revalidating");
  }
};
export default handler;
