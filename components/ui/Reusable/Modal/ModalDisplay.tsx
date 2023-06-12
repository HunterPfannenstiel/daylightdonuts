import { CSSProperties, FunctionComponent, ReactNode } from "react";
import classes from "./ModalDisplay.module.css";
import Modal from "./Modal";
import Background from "./Background";

interface ModalDisplayProps {
  children: ReactNode;
  handleModal: () => void;
  playAnimation: boolean;
  className?: string;
  animationTime?: number;
}

const ModalDisplay: FunctionComponent<ModalDisplayProps> = ({
  children,
  handleModal,
  playAnimation,
  className,
  animationTime = 300,
}) => {
  let classN = className
    ? `${classes.modal_content} ${className}`
    : classes.modal_content;

  if (playAnimation) classN += " " + classes.animate_out;
  return (
    <Modal selector="modal">
      <div
        className={classN}
        style={{ "--animation-time": animationTime + "ms" } as CSSProperties}
      >
        <p className={classes.close} onClick={handleModal}>
          X
        </p>
        {children}
      </div>
      <Background
        handleModal={handleModal}
        playAnimation={playAnimation}
        animationTime={animationTime}
      />
    </Modal>
  );
};

export default ModalDisplay;
