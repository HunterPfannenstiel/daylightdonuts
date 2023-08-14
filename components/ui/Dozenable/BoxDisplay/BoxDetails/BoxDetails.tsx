import { Dispatch, FunctionComponent } from "react";
import Box from "./Box/Box";
import classes from "./BoxDetails.module.css";
import ItemDetailList from "./ItemDetailList";
import { BoxPayload, DozenBox } from "@_types/dozenable";

interface BoxDetailsProps {
  showDetails: boolean;
  animateOut: boolean;
  submitBox: boolean;
  boxSize: number;
  boxClassName: string;
  listClassName: string;
  box: DozenBox;
  dispatchBox: Dispatch<BoxPayload>;
}

const BoxDetails: FunctionComponent<BoxDetailsProps> = ({
  showDetails,
  animateOut,
  submitBox,
  boxSize,
  boxClassName,
  listClassName,
  box,
  dispatchBox,
}) => {
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
        dispatchBox={dispatchBox}
        box={box}
      />
    </>
  );
};

export default BoxDetails;
