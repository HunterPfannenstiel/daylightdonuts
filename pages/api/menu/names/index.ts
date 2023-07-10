import { getAllCategoryNames, getAllItemNames } from '@_utils/database/menu';
import { ServerError } from 'custom-objects/ServerError';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
	if (req.method === 'GET') {
		try {
            let names: { name: string }[];
            const { category, item } = req.query;
            if (category) names = await getAllCategoryNames();
            else if (item) names = await getAllItemNames();
            else throw new Error("No query parameters were supplied, or query parameters were misspelled.");
			res.status(200).json(names);
		} catch (error: any) {
			ServerError.sendErrorResponse(error, res);
		}
	}
};

export default handler;