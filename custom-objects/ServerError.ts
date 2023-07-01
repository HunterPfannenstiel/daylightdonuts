import { NextApiResponse } from "next/types";

export class ServerError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
  static sendErrorResponse = (
    error: any,
    res: NextApiResponse,
    logError = false
  ) => {
    if (logError) console.log(error.message);
    if (error.statusCode) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  };
}
