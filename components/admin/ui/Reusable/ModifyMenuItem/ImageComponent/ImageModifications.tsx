import { FunctionComponent } from "react";
import classes from "./ImageModifications.module.css";
import { ItemImage } from "@_types/admin/forms";
import ImageComponent from ".";
import ImageInput from "@_admin-reuse/Form/Inputs/ImageInput";

interface ImageModificationsProps {
  addImages: (image: ItemImage[]) => void;
  swapImages: (indexOne: number, indexTwo: number) => void;
  deleteImage: (index: number) => void;
  images: ItemImage[];
}

const ImageModifications: FunctionComponent<ImageModificationsProps> = ({
  addImages,
  swapImages,
  deleteImage,
  images,
}) => {
  return (
    <div className={classes.container}>
      <ul className={classes.images}>
        {images.map((image, i) => {
          return (
            <div className={classes.image} key={image.imageUrl}>
              <ImageComponent
                imageUrl={image.imageUrl}
                index={i}
                onSwap={swapImages}
                onDelete={deleteImage}
              />
              <p>{i + 1}</p>
            </div>
          );
        })}
      </ul>
      <ImageInput imageHandler={addImages} width="25%" multiple />
    </div>
  );
};

export default ImageModifications;
