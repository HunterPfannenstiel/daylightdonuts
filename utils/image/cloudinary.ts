import { ImageUpload } from "@_types/admin/forms";
import { MulterImage } from "@_types/admin/modify-menu";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadImage = (buffer: Buffer, imageName: string) => {
  return new Promise<ImageUpload>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "menu-items" },
      (err: any, result: any) => {
        if (err) {
          reject(new Error(err.message));
        }
        resolve({
          imageUrl: result.secure_url,
          publicId: result.public_id,
          name: imageName,
        });
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export const uploadManyImages = async (buffers: MulterImage[]) => {
  const promises = buffers.map((img) =>
    uploadImage(img.buffer, img.originalname)
  );
  return await Promise.all(promises);
};

export const deleteManyImages = (publicIds: string[]) => {
  publicIds.forEach((pubId) => deleteImage(pubId));
};

export const deleteImage = (publicId: string) => {
  cloudinary.uploader.destroy(publicId, (err: any, res: any) => {
    if (err) console.log("Error deleting image", err);
    else console.log("Deleted Image");
  });
};
