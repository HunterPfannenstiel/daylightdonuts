import { AddUserInfo, UserInfo } from '@_types/database/userInfo';
import {
	addUserInfo,
	deleteUserInfo,
	editUserInfo,
	getAccountIdFromSession,
} from '@_utils/database/account/queries';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
	try {
		const accountId = await getAccountIdFromSession(req, res);
		if (req.method === 'POST') {
			const info = req.body.info as AddUserInfo | undefined;
			if (accountId !== null && info) {
				const new_info_id = await addUserInfo(accountId, info);
				res.status(200).json(new_info_id);
				res.end();
			} else {
				return res.status(400).json({
					message:
						'The user did not have an account or an info object was not supplied on the request body',
				});
			}
		} else if (req.method === 'PUT') {
			const info = req.body.info as UserInfo | undefined;
			if (accountId !== null && info) {
				await editUserInfo(accountId, info);
				res.status(204);
				res.end();
			} else {
				return res.status(400).json({
					message:
						'The user did not have an account or an info object was not supplied on the request body',
				});
			}
		} else if (req.method === 'DELETE') {
			const info_id = req.query.id as number | undefined;
			if (accountId !== null && info_id !== undefined) {
				const del = await deleteUserInfo(accountId, info_id);
				if (del) {
					res.status(204);
					res.end();
				} else {
					res.status(400);
					res.end();
				}
			} else {
				res.status(400).json({
					message:
						'The user did not have an account or an info_id value was not on the request body',
				});
			}
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({message: 'Bad request'});
		res.end();
	}
};

export default handler;
