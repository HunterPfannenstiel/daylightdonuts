import { getServerSession } from 'next-auth';
import { customerQuery } from '../connect';
import { NextApiRequest } from 'next';
import { UserSession, UserToken } from '@_types/auth';
import { getSession } from 'next-auth/react';
import {
	Info,
	UpdatingInfo,
	UserInfo,
	UserOrder,
} from '@_types/database/userInfo';

export const getAccountId = async (userEmail: string) => {
	const query = 'SELECT * FROM store.get_user_id($1)';
	const res = await customerQuery(query, [userEmail]);
	return res.rows[0].get_user_id as number | null;
};

export const getUserInfo = async (accountId: number) => {
	const query = 'SELECT * FROM store.get_user_infos($1)';
	const res = await customerQuery(query, [accountId]);
	return res.rows[0] as UserInfo;
};

export const editUserInfo = async (accountId: number, info: UpdatingInfo) => {
	const query = 'CALL store.edit_user_info($1, $2, $3, $4, $5, $6, $7)';
	const res = await customerQuery(query, [
		accountId,
		info.first_name,
		info.last_name,
		info.phone_number,
		info.favorite,
		info.id,
		info.should_update,
	]);
};

export const createAccount = async (email: string) => {
	const query = 'CALL store.create_account($1, $2, $3)';
	const res = await customerQuery(query, [email, null, null]);
	return res.rows[0].id as number;
};

export const getAccountOrders = async (accountId: number) => {
	const query = 'SELECT * FROM store.view_account_orders($1)';
	const res = await customerQuery(query, [accountId]);
	return res.rows as UserOrder[];
};

export const getAccountIdFromSession = async (req: NextApiRequest) => {
	const session = (await getSession({ req })) as UserToken;
	if (session) return session.accountId;
	else return null;
};
