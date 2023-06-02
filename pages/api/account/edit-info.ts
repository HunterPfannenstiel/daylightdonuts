import { AddUserInfo, UpdatingInfo } from '@_types/database/userInfo';
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
			if (accountId && info) {
				await addUserInfo(accountId, info);
				res.status(204);
			} else {
				res.status(400).json({
					message:
						'The user did not have an account or an info object was not supplied on the request body',
				});
			}
		} else if (req.method === 'PUT') {
			const info = req.body.info as UpdatingInfo | undefined;
			if (accountId && info) {
				await editUserInfo(accountId, info);
				res.status(204);
			} else {
				res.status(400).json({
					message:
						'The user did not have an account or an info object was not supplied on the request body',
				});
			}
		} else if (req.method === 'DELETE') {
			const info_id = req.query.id as number | undefined;
			if (accountId && info_id) {
				await deleteUserInfo(accountId, info_id);
				res.status(204);
			} else {
				res.status(400).json({
					message:
						'The user did not have an account or an info_id value was not on the request body',
				});
			}
		}
	} catch (error) {
		console.log(error);
	}
};

export default handler;
