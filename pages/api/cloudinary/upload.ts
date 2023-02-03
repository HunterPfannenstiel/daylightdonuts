// import { NextApiHandler } from "next";
// import cloudinary from "@_utils/cloudinary";

// const handler: NextApiHandler = async (req, res) => {
//   if (req.method === "POST") {
//     try {
//       const fileString = req.body.data;
//       console.log("Uploading");
//       const uploadedResponse = await cloudinary.uploader.upload(fileString, {
//         folder: "item_images",
//       });
//       console.log(uploadedResponse);
//       res.json({ url: uploadedResponse.secure_url });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error });
//     }
//   }
// };

// export default handler;

//App wouldn't build because of 'cloudinary' package, this code works

const handler = () => {};

export default handler;
