import { sendErrorResponse } from "@_utils/admin/modify-menu";
import { comparePasswords } from "@_utils/admin/password";
import { getAccountSession } from "@_utils/database/account/queries";
import { getUserPassword } from "@_utils/database/admin/password";
import { createAndSetAuthToken } from "@_utils/jwt/admin-login";
import { ServerError } from "custom-objects/ServerError";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { password } = req.query;
      const session = await getAccountSession(req, res);
      if (!session || !session.user) {
        throw new ServerError("Please sign in first", 400);
      }
      if (typeof password !== "string") {
        throw new ServerError("Please enter a password", 400);
      }

      const dbPassword = await getUserPassword(session.user.email!);
      if (!dbPassword) {
        console.log("REDIRECT");
        return res.redirect("/");
      }
      const isValid = await comparePasswords(password, dbPassword);
      createAndSetAuthToken(res);
      return res.status(200).json({ session, isValid });
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
export default handler;
