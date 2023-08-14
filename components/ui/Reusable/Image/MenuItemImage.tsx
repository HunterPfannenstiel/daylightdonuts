import { FunctionComponent } from "react";
import classes from "./MenuItemImage.module.css";
import Image from "next/image";

interface MenuItemImageProps {
  className?: string;
  imageUrl: string;
  alt?: string;
  handleLoadComplete?: () => void;
}

const MenuItemImage: FunctionComponent<MenuItemImageProps> = ({
  className,
  imageUrl,
  alt,
  handleLoadComplete,
}) => {
  return (
    <div className={`${classes.image_container} ${className}`}>
      <Image
        src={imageUrl}
        alt={alt || ""}
        width={500}
        height={500}
        onLoadingComplete={handleLoadComplete}
      />
    </div>
  );
};

export default MenuItemImage;
