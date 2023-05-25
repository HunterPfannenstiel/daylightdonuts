import { getUserInfo } from "@_utils/database/account/queries";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    if (req.body === 'GET') {
        const accountId = req.body.accountId as number;
        const userInfo = await getUserInfo(accountId);
        res.status(200).json(userInfo);
    }
}

export default handler;