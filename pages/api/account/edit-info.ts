import { UpdatingInfo } from '@_types/database/userInfo';
import {
	editUserInfo,
	getAccountIdFromSession,
} from '@_utils/database/account/queries';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
	try {
		const accountId = await getAccountIdFromSession(req);
		if (req.method === 'PUT' || req.method === 'POST') {
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
			const info_id = req.body.info_id as number | undefined;
			if (accountId && info_id) {
				await editUserInfo(accountId, {
					id: info_id,
					favorite: false,
					should_update: false,
				});
				res.status(204);
			} else {
				res.status(400).json({
					message:
						'There is no account associated with the user or an info_id value was not on the request body',
				});
			}
		}
	} catch (error) {
		console.log(error);
	}
};

export default handler;
