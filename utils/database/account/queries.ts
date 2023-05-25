import { getServerSession } from "next-auth";
import { customerQuery } from "../connect";
import { NextApiRequest } from "next";
import { UserSession, UserToken } from "@_types/auth";
import { getSession } from "next-auth/react";

export const getAccountId = async (userEmail: string) => {
	const query = 'SELECT * FROM store.get_user_id($1)';
	const res = await customerQuery(query, [userEmail]);
	return res.rows[0].get_user_id as number | null;
}

export const getUserInfo = async (accountId: number) => {
	const query = 'SELECT * FROM store.get_user_infos($1)';
	const res = await customerQuery(query, [accountId]);
    return res.rows[0] as UserInfo;
};

export const createAccount = async (email: string) => {
	const query = 'CALL store.create_account($1, $2, $3)';
	const res = await customerQuery(query, [email, null, null]);
	return res.rows[0].id as number;
}

export const getAccountIdFromSession = async (req: NextApiRequest) => {
	const session = await getSession({req}) as UserToken;
	console.log(session);
	if (session) return session.accountId;
	else return null;
}
