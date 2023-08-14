import { Dispatch, FunctionComponent, useState } from "react";
import IBoxDisplay from "./IBoxDisplay";
import { BoxPayload, DozenBox } from "@_types/dozenable";

interface BoxDisplayProps {
  addBoxToCart: () => void;
  dispatchBox: Dispatch<BoxPayload>;
  box: DozenBox;
}

const BoxDisplay: FunctionComponent<BoxDisplayProps> = ({
  addBoxToCart,
  dispatchBox,
  box,
}) => {
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
      box={box}
      boxFinished={boxFinished}
      onFinishBox={onFinishBox}
      onClearBox={onClearBox}
      dispatchBox={dispatchBox}
    />
  );
};

export default BoxDisplay;
