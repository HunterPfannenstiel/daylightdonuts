import { FunctionComponent } from "react";
import classes from "./ItemImage.module.css";
import Image from "next/image";

interface ItemImageProps {
  src: string;
}

const ItemImage: FunctionComponent<ItemImageProps> = ({ src }) => {
  return (
    <div className={classes.image_container}>
      <Image src={src} alt="" fill />
    </div>
  );
};

export default ItemImage;
