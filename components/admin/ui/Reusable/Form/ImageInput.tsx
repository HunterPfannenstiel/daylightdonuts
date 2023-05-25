import { ChangeEvent, FunctionComponent } from "react";
import classes from "./ImageInput.module.css";
import { ClientImage } from "@_types/admin/forms";
import ImageComponent from "next/image";

interface ImageInputProps {
  initialImage?: ClientImage | { url: string; blob: undefined };
  imageHandler: (image: ClientImage) => void;
}

const ImageInput: FunctionComponent<ImageInputProps> = ({
  initialImage,
  imageHandler,
}) => {
  const onImageInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const image = await readImage(e);
    if (image) {
      if (initialImage?.blob) URL.revokeObjectURL(initialImage.url);
      imageHandler(image);
    }
  };
  return (
    <div className={classes.image_input}>
      <label htmlFor="image">Click</label>
      <ImageComponent src={initialImage?.url || ""} alt="" />
      <input
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
    return new Promise<ClientImage>((resolve) => {
      const img = new Image();
      const file = e.target.files![0];
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        resolve({ url: img.src, blob: file });
      };
    });
  }
};
