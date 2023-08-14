import { CSSProperties, FunctionComponent } from "react";
import classes from "./ImageComponent.module.css";
import Image from "next/image";
import { concatClassNames } from "@_utils/client";

interface ImageComponentProps {
  src: string;
  aspectRatio?: string;
  width?: number;
  height?: number;
  alt?: string;
  fill?: boolean;
  className?: string;
}

const ImageComponent: FunctionComponent<ImageComponentProps> = ({
  src,
  aspectRatio,
  alt,
  fill,
  className,
  width,
  height,
}) => {
  const styles: CSSProperties = aspectRatio ? { aspectRatio } : {};
  return (
    <div
      className={concatClassNames(classes.image_container, className)}
      style={styles}
    >
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
