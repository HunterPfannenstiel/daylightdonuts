import { FunctionComponent } from "react";
import classes from "./ImageModifications.module.css";
import { ItemImage } from "@_types/admin/forms";
import ImageComponent from ".";
import ImageInput from "@_admin-reuse/Form/Inputs/ImageInput";

interface ImageModificationsProps {
  addImages: (image: ItemImage[]) => void;
  swapImages: (indexOne: number, indexTwo: number) => void;
  images: ItemImage[];
}

const ImageModifications: FunctionComponent<ImageModificationsProps> = ({
  addImages,
  swapImages,
  images,
}) => {
  const onImageDragged = (e: React.DragEvent, index: string) => {
    e.dataTransfer.setData("index", index);
  };
  const onImageDropped = (e: React.DragEvent, index: number) => {
    const draggedImageIndex = e.dataTransfer.getData("index");
    swapImages(+draggedImageIndex, index);
  };
  return (
    <div className={classes.container}>
      <ul className={classes.images}>
        {images.map((image, i) => {
          return (
            <div className={classes.image} key={image.imageUrl}>
              <ImageComponent
                imageUrl={image.imageUrl}
                index={i}
                onImageDragged={onImageDragged}
                onImageDropped={onImageDropped}
              />
              <p>{i + 1}</p>
            </div>
          );
        })}
      </ul>
      <ImageInput imageHandler={addImages} width="25%" />
    </div>
  );
};

export default ImageModifications;
