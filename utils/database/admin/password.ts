import { adminQuery } from "../connect";

export const getUserPassword = async (email: string) => {
  const query = "SELECT * FROM store.get_user_password($1)";
  const res = await adminQuery(query, [email]);
  return res.rows[0].hashed_password as string | null;
};
