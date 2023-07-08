import { getAllItemNames } from '@_utils/database/menu';
import { ServerError } from 'custom-objects/ServerError';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const handler: NextApiHandler = async (req, res) => {
	if (req.method === 'GET') {
		try {
			const itemNames = await getAllItemNames();
			res.status(200).json(itemNames);
		} catch (error: any) {
			ServerError.sendErrorResponse(error, res);
		}
	}
};

export default handler;
