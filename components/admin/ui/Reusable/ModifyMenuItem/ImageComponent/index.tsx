import { FunctionComponent } from "react";
import classes from "./index.module.css";
import DropContainer from "@_admin-reuse/ItemDrag/DropContainer";
import DropItem from "@_admin-reuse/ItemDrag/DropItem";
import Image from "next/image";
import MenuItemImage from "components/ui/Reusable/Image/MenuItemImage";
import Button from "@ui/Reusable/Button";

interface ImageComponentProps {
  imageUrl: string;
  index: number;
  onSwap: (indexOne: number, indexTwo: number) => void;
  onDelete: (index: number) => void;
}

const ImageComponent: FunctionComponent<ImageComponentProps> = ({
  imageUrl,
  index,
  onSwap,
  onDelete,
}) => {
  return (
    <div>
      <Button
        onClick={() => {
          onDelete(index);
        }}
        type="button"
      >
        X
      </Button>
      <DropContainer
        dataName="index"
        dropHandler={(indexOne) => {
          onSwap(+indexOne, index);
        }}
        className={classes.drop_container}
      >
        <DropItem
          dataName="index"
          dataValue={index.toString()}
          className={classes.image_container}
        >
          <MenuItemImage imageUrl={imageUrl} className={classes.image} />
        </DropItem>
      </DropContainer>
    </div>
  );
};

export default ImageComponent;
