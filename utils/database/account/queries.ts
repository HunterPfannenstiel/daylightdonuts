import { getServerSession } from 'next-auth';
import { customerQuery } from '../connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserSession, UserToken } from '@_types/auth';
import { getSession } from 'next-auth/react';
import {
	AddUserInfo,
	FetchedUserInfo,
	UserInfo,
	UserOrder,
} from '@_types/database/userInfo';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export const getAccountId = async (userEmail: string) => {
	const query = 'SELECT * FROM store.get_user_id($1)';
	const res = await customerQuery(query, [userEmail]);
	return res.rows[0].get_user_id as number | null;
};

export const getUserInfo = async (accountId: number) => {
	const query = 'SELECT * FROM store.get_user_infos($1)';
	const res = await customerQuery(query, [accountId]);
	return {...res.rows[0], isSignedIn: true} as FetchedUserInfo;
};

export const addUserInfo = async (accountId: number, info: AddUserInfo) => {
	const query = 'CALL store.edit_user_info($1, $2, $3, $4, $5)';
	await customerQuery(query, [
		accountId,
		info.first_name,
		info.last_name,
		info.phone_number,
		info.favorite,
	]);
};

export const deleteUserInfo = async (accountId: number, info_id: number) => {
	const query = 'CALL store.edit_user_info($1, $2, $3, $4, $5, $6, $7)';
	await customerQuery(query, [
		accountId,
		null,
		null,
		null,
		null,
		info_id,
		false,
	]);
};

export const editUserInfo = async (accountId: number, info: UserInfo) => {
	const query = 'CALL store.edit_user_info($1, $2, $3, $4, $5, $6, $7)';
	await customerQuery(query, [
		accountId,
		info.first_name,
		info.last_name,
		info.phone_number,
		info.favorite,
		info.id,
		true,
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

export const getAccountIdFromSession = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const session = (await getServerSession(req, res, authOptions)) as UserToken;
	if (session) return session.accountId;
	else return null;
};
