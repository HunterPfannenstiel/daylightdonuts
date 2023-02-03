import Image from "next/image";
import { CSSProperties, FunctionComponent, useState } from "react";
import classes from "./BoxItem.module.css";

interface BoxItemProps {
  image?: string;
  index: number;
}

const BoxItem: FunctionComponent<BoxItemProps> = ({ image, index }) => {
  const [animateIn, setAnimateIn] = useState(false);
  if (image) {
    const handleLoadComplete = () => {
      setAnimateIn(true);
    };
    const imageClass = animateIn ? classes.animate_in : "";
    return (
      <div
        className={classes.image_container + " " + imageClass}
        style={{ "--delay": (index * 25).toString() + "ms" } as CSSProperties}
      >
        <Image
          src={image}
          width={55}
          height={55}
          alt="donut"
          onLoadingComplete={handleLoadComplete}
        />
      </div>
    );
  } else {
    return <div className={classes.spacer} />;
  }
};

export default BoxItem;
