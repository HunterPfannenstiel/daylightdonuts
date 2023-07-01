import { FunctionComponent } from "react";
import classes from "./ImageComponent.module.css";
import Image from "next/image";

interface ImageComponentProps {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  fill?: boolean;
  className?: string;
}

const ImageComponent: FunctionComponent<ImageComponentProps> = ({
  src,
  alt,
  fill,
  className,
  width,
  height,
}) => {
  const classN = className
    ? `${classes.image_container} ${className}`
    : classes.image_container;
  return (
    <div className={classN}>
      <Image
        src={src}
        alt={alt || ""}
        fill={fill}
        width={width}
        height={height}
      />
    </div>
  );
};

export default ImageComponent;
