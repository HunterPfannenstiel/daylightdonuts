import {
	getAccountIdFromSession,
	getAccountOrders,
} from '@_utils/database/account/queries';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
	try {
		if (req.method === 'GET') {
			const accountId = await getAccountIdFromSession(req, res);
			if (accountId === null) {
				return res.status(401).json({ message: 'Client is not signed in' });
			}
			const orders = await getAccountOrders(accountId);
			return res.status(200).json(orders);
		}
	} catch (error) {
		console.log(error);
	}
};

export default handler;
