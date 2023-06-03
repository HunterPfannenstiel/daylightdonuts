import { ChangeEvent, FunctionComponent } from "react";
import classes from "./ImageInput.module.css";
import { ItemImage } from "@_types/admin/forms";

interface ImageInputProps {
  imageHandler: (images: ItemImage[]) => void;
}

const ImageInput: FunctionComponent<ImageInputProps> = ({ imageHandler }) => {
  const onImageInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const imagePromises = readImages(e);
    if (imagePromises) {
      const images = await Promise.all(imagePromises);
      console.log(images);
      imageHandler(images);
    }
  };
  return (
    <div className={classes.image_input}>
      <label htmlFor="image">Click</label>
      <input
        multiple
        type="file"
        id="image"
        accept="image/*"
        hidden
        onChange={onImageInput}
      />
    </div>
  );
};

export default ImageInput;

const readImage = async (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    return new Promise<ItemImage>((resolve) => {
      const img = new Image();
      const file = e.target.files![0];
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        resolve({ imageUrl: img.src, blob: file });
      };
    });
  }
};

const readImages = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    const imagePromises: Promise<ItemImage>[] = [];
    for (let i = 0; i < e.target.files.length; i++) {
      imagePromises.push(
        new Promise<ItemImage>((resolve) => {
          const img = new Image();
          const file = e.target.files![i];
          img.src = URL.createObjectURL(file);
          img.onload = () => {
            resolve({ imageUrl: img.src, blob: file, name: file.name });
          };
        })
      );
    }
    return imagePromises;
  }
};
