import { customerQuery } from "../connect";

export const getUserId = async (userEmail: string) => {
	const query = 'SELECT * FROM store.get_user_id($1)';
	const res = await customerQuery(query, [userEmail]);
	return res.rows[0].get_user_id as number | null;
}

export const getUserInfo = async (accountId: number) => {
	const query = 'SELECT * FROM store.get_user_infos($1)';
	const res = await customerQuery(query, [accountId]);
    return res.rows as UserInfo[];
};

export const createAccount = async (email: string) => {
	const query = 'CALL store.create_account($1, $2, $3)';
	const res = await customerQuery(query, [email, null, null]);
	return res.rows[0].id as number;
}
