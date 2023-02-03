import { SumParameter } from "@_types/admin/analytics";
import { AxisInterval } from "@_types/admin/analytics";
import { getDonutAnalytics } from "@_utils/analytics/queries";
import { NextApiHandler } from "next";

type Query = string | string[] | undefined;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const startDate = req.query.start;
    const endDate = req.query.end;
    let menuId = req.query.id;
    const interval = req.query.interval;
    const sumBy = req.query.sum;
    if (isValidQuery(startDate, endDate, interval, sumBy)) {
      try {
        const analytics = await getDonutAnalytics(
          interval as AxisInterval,
          { startDate: startDate as string, endDate: endDate as string },
          menuId as string | undefined,
          sumBy as SumParameter
        );
        res.status(200).send(analytics);
        return;
      } catch (e: any) {
        console.log(e);
        res.status(500).send({ message: e.message });
        return;
      }
    } else {
      res.status(400).end();
      return;
    }
  } else {
    res.status(400).end();
  }
};

const isValidQuery = (
  start: Query,
  end: Query,
  interval: Query,
  sumBy: Query
) => {
  if (start && end && interval && sumBy) {
    if (
      start !== "undefined" &&
      end !== "undefined" &&
      interval !== "undefined" &&
      sumBy !== "undefined"
    ) {
      return true;
    }
  }
  return false;
};

export default handler;
