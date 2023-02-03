import { useBuildBox } from "@_providers/Dozenable/BuildBox";
import { FunctionComponent } from "react";
import Box from "./Box/Box";
import classes from "./BoxDetails.module.css";
import ItemDetailList from "./ItemDetailList";

interface BoxDetailsProps {
  showDetails: boolean;
  animateOut: boolean;
  submitBox: boolean;
  boxSize: number;
  boxClassName: string;
  listClassName: string;
}

const BoxDetails: FunctionComponent<BoxDetailsProps> = ({
  showDetails,
  animateOut,
  submitBox,
  boxSize,
  boxClassName,
  listClassName,
}) => {
  const { box } = useBuildBox();
  const donutImages: (string | undefined)[] = [];
  Object.keys(box.items).forEach((key) => {
    const item = box.items[key];
    for (let i = 0; i < item.amount; i++) {
      donutImages.push(item.image);
    }
  });
  for (let i = 0; i < box.boxSize - box.currentCount; i++) {
    donutImages.push(undefined);
  }
  const showClassName = showDetails ? "" : classes.hide;

  return (
    <>
      <Box
        closeBox={submitBox}
        boxSize={boxSize}
        donutImages={donutImages}
        className={boxClassName + " " + showClassName}
      />
      <ItemDetailList
        items={box.items}
        showDetails={showDetails}
        className={listClassName}
      />
    </>
  );
};

export default BoxDetails;
