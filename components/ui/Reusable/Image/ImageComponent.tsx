import { FunctionComponent } from "react";
import classes from "./ImageComponent.module.css";
import Image from "next/image";
import { concatClassNames } from "@_utils/client";

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
  return (
    <div className={concatClassNames(classes.image_container, className)}>
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
