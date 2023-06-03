import { FunctionComponent } from "react";
import classes from "./index.module.css";
import DropContainer from "@_admin-reuse/ItemDrag/DropContainer";
import DropItem from "@_admin-reuse/ItemDrag/DropItem";
import Image from "next/image";
import MenuItemImage from "components/ui/Reusable/Image/MenuItemImage";

interface ImageComponentProps {
  imageUrl: string;
  index: number;
  onImageDropped: (e: React.DragEvent, index: number) => void;
  onImageDragged: (e: React.DragEvent, index: string) => void;
}

const ImageComponent: FunctionComponent<ImageComponentProps> = ({
  imageUrl,
  index,
  onImageDropped,
  onImageDragged,
}) => {
  return (
    <DropContainer
      dropHandler={(e) => {
        onImageDropped(e, index);
      }}
      className={classes.drop_container}
    >
      <DropItem
        handleDragStart={(e) => {
          onImageDragged(e, index.toString());
        }}
        className={classes.image_container}
      >
        <MenuItemImage imageUrl={imageUrl} className={classes.image} />
      </DropItem>
    </DropContainer>
  );
};

export default ImageComponent;
