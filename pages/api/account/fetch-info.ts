import { FetchedUserInfo } from "@_types/database/userInfo";
import {
  getAccountSession,
  getUserInfo,
} from "@_utils/database/account/queries";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    let info: FetchedUserInfo;
    const session = await getAccountSession(req, res);
    if (session?.accountId) {
      info = await getUserInfo(session.accountId);
      return res
        .status(200)
        .json({
          info: { ...info, email: session.user?.email },
          isSignedIn: true,
        });
    }
    return res.status(200).json({ info: null, isSignedIn: false });
  }
};

export default handler;
