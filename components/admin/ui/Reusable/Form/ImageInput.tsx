import { ChangeEvent, FunctionComponent, useState } from "react";
import classes from "./ImageInput.module.css";
import { ClientImage } from "@_types/admin/forms";
import ImageComponent from "next/image";

interface ImageInputProps {
  initialImage?: ClientImage | { url: string; blob: undefined };
  width: number;
  height: number;
  imageHandler: (image: ClientImage) => void;
}

const ImageInput: FunctionComponent<ImageInputProps> = ({
  initialImage,
  width,
  height,
  imageHandler,
}) => {
  const [image, setImage] = useState(initialImage);
  const onImageInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const newImage = await readImage(e);
    if (newImage) {
      if (image?.blob) URL.revokeObjectURL(image.url);
      imageHandler(newImage);
      setImage(newImage);
    }
  };
  return (
    <div className={classes.image_input}>
      <label htmlFor="image">Click</label>
      {image?.url && (
        <ImageComponent src={image.url} alt="" width={width} height={height} />
      )}
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
