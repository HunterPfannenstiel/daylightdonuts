import { NextApiHandler } from 'next';
import { ServerError } from 'custom-objects/ServerError';
import { optionalStringCheck, typeCheck } from '@_utils/index';
import { getAnalytics } from '@_utils/database/analytics';
const handler: NextApiHandler = async (req, res) => {
	try {
		if (req.method === 'GET') {
			const { beginDate, endDate, timeUnit, donutType } = req.query;
			typeCheck(
				'string',
				{ name: 'beginDate', value: beginDate },
				{ name: 'endDate', value: endDate },
				{ name: 'timeUnit', value: timeUnit }
			);
			optionalStringCheck(donutType);
			const amounts = await getAnalytics(
				beginDate as string,
				endDate as string,
				donutType as string | null,
				timeUnit as string
			);
			return res.status(200).json({ amounts });
		} else {
			return res.status(400).json({ message: 'Invalid method' });
		}
	} catch (error: any) {
		ServerError.sendErrorResponse(error, res);
	}
};
export default handler;
