import Image from "next/image";
import { FunctionComponent } from "react";
import classes from "./Box.module.css";
import BoxItemList from "./BoxItemList";

interface BoxProps {
  closeBox: boolean;
  boxSize: number;
  donutImages: (string | undefined)[];
  className: string;
}

const Box: FunctionComponent<BoxProps> = ({
  closeBox,
  boxSize,
  donutImages,
  className,
}) => {
  const close = closeBox ? classes.close : classes.open;
  return (
    <div className={classes.container + " " + className}>
      <div className={classes.box + " " + close}>
        <div className={classes.first} />
        <div className={classes.lid}>
          <Image
            src="/Images/DAYLIGHTDONUTS.png"
            alt=""
            width={104}
            height={55}
          />
        </div>
        <BoxItemList donutImages={donutImages} boxSize={boxSize} />
        <div className={classes.second} />
      </div>
    </div>
  );
};

export default Box;
