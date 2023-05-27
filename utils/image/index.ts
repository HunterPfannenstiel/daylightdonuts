import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";

export const parseImage = async (
  req: any,
  res: any,
  imageParser: any,
  singleImage: boolean
) => {
  await new Promise<void>((resolve, reject) => {
    imageParser(req, res, (err: any) => {
      if (err) {
        reject(new Error(err.message));
      }
      resolve();
    });
  });
  if (singleImage) return req.file as { buffer: Buffer };
  return req.files as { buffer: Buffer }[];
};

export const parseManyImages = async (
  req: NextApiRequest,
  res: NextApiResponse,
  imageKey: string,
  maxImageCount: number
) => {
  const imageParser = multer({
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  }).array(imageKey, maxImageCount);
  return (await parseImage(req, res, imageParser, false)) as {
    buffer: Buffer;
  }[];
};
