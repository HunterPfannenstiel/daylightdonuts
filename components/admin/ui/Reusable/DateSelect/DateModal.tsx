import { FunctionComponent, ReactNode } from "react";
import classes from "./DateModal.module.css";

interface DateModalProps {
  showModal: boolean;
  playAnimation: boolean;
  handleModal: () => void;
  children: ReactNode;
}

const DateModal: FunctionComponent<DateModalProps> = ({
  showModal,
  playAnimation,
  handleModal,
  children,
}) => {
  const animateClass = `${showModal ? classes.show : ""} ${
    playAnimation ? classes.animate_out : ""
  }`;
  return (
    <>
      <div className={`${classes.interval_info} ${animateClass}`}>
        {children}
      </div>
      <div
        className={`${classes.background} ${animateClass}`}
        onClick={handleModal}
      />
    </>
  );
};

export default DateModal;
