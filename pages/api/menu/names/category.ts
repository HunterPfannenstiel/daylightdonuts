import { getAllCategoryNames } from '@_utils/database/menu';
import { ServerError } from 'custom-objects/ServerError';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
	if (req.method === 'GET') {
		try {
			const itemNames = await getAllCategoryNames();
			res.status(200).json(itemNames);
		} catch (error: any) {
			ServerError.sendErrorResponse(error, res);
		}
	}
};

export default handler;