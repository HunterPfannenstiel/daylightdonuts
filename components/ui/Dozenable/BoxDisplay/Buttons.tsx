import { FunctionComponent } from "react";
import classes from "./Buttons.module.css";

interface ButtonsProps {
  leftName: "Clear Box" | "View Box";
  modalShown: boolean;
  className: string;
  disableFinish: boolean;
  onFinishBox: () => void;
  onViewBox: () => void;
  onClearBox: () => void;
}

const Buttons: FunctionComponent<ButtonsProps> = ({
  modalShown,
  className,
  disableFinish,
  onFinishBox,
  onViewBox,
  onClearBox,
}) => {
  let viewBoxClass = "";
  let clearBoxClass = "";
  if (modalShown) {
    viewBoxClass = classes.hide;
  } else {
    clearBoxClass = classes.hide;
  }

  return (
    <div className={classes.buttons + " " + className}>
      <button
        onClick={onViewBox}
        className={classes.button_view + " " + viewBoxClass}
      >
        View Box
      </button>
      <button
        onClick={onClearBox}
        className={classes.button_clear + " " + clearBoxClass}
      >
        Clear Box
      </button>
      <button
        onClick={onFinishBox}
        className={classes.finish_button}
        disabled={disableFinish}
      >
        Finish Box
      </button>
    </div>
  );
};

export default Buttons;
