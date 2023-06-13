import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";

export const createAndSetAuthToken = (res: NextApiResponse) => {
  const authToken = jwt.sign(
    { isAuthenticated: true },
    process.env.JWT_PASSWORD!,
    { expiresIn: 3600 }
  );
  const oneHour = new Date();
  oneHour.setHours(oneHour.getHours() + 1);
  res.setHeader("set-cookie", `cartToken=${authToken}; expires=${oneHour};`);
};
