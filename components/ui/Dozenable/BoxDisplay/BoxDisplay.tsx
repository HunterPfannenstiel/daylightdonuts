import { useBuildBox } from "@_providers/Dozenable/BuildBox";
import { FunctionComponent, useState } from "react";
import IBoxDisplay from "./IBoxDisplay";

interface BoxDisplayProps {
  boxSize: number;
}

const BoxDisplay: FunctionComponent<BoxDisplayProps> = ({ boxSize }) => {
  const { box, addBoxToCart, dispatchBox } = useBuildBox();
  const [boxFinished, setBoxFinished] = useState(false);

  const onFinishBox = () => {
    setBoxFinished(true);
    addBoxToCart();
    setTimeout(() => {
      dispatchBox({ type: "Clear", boxSize: box.boxSize });
      setBoxFinished(false);
    }, 1500);
  };
  const onClearBox = () => {
    dispatchBox({ type: "Clear", boxSize: box.boxSize });
  };
  return (
    <IBoxDisplay
      boxSize={boxSize}
      boxFinished={boxFinished}
      itemsInBox={box.currentCount}
      onFinishBox={onFinishBox}
      onClearBox={onClearBox}
    />
  );
};

export default BoxDisplay;
