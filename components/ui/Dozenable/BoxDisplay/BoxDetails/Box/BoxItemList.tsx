import { FunctionComponent } from "react";
import BoxItem from "./BoxItem";
import classes from "./BoxItemList.module.css";

interface BoxItemListProps {
  donutImages: (string | undefined)[];
  boxSize: number;
}

const BoxItemList: FunctionComponent<BoxItemListProps> = ({
  donutImages,
  boxSize,
}) => {
  return (
    <div className={classes.donut_space}>
      {donutImages.map((image, i) => {
        return (
          <BoxItem key={(image || i.toString()) + i} image={image} index={i} />
        );
      })}
    </div>
  );
};

export default BoxItemList;
