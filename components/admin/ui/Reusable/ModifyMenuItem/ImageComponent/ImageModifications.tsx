import { FunctionComponent } from "react";
import classes from "./ImageModifications.module.css";
import { ItemImage } from "@_types/admin/forms";
import ImageComponent from ".";
import ImageInput from "@_admin-reuse/Form/ImageInput";

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
    <div>
      <h2>Images!</h2>
      <ul className={classes.images}>
        {images.map((image, i) => {
          return (
            <ImageComponent
              imageUrl={image.imageUrl}
              index={i}
              onImageDragged={onImageDragged}
              onImageDropped={onImageDropped}
            />
          );
        })}
      </ul>
      <h2>Add images</h2>
      <ImageInput imageHandler={addImages} />
    </div>
  );
};

export default ImageModifications;
