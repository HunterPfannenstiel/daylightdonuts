import { getAccountIdFromSession, getUserInfo } from "@_utils/database/account/queries";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'GET') {
        let info: UserInfo;
        const accountId = await getAccountIdFromSession(req);
        if (accountId) {
            info = await getUserInfo(accountId);
            console.log(info);
            return res.status(200).json({info, isSignedIn: true});
        }
        return res.status(200).json({info: null, isSignedIn: false})
    }
}

export default handler;