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
