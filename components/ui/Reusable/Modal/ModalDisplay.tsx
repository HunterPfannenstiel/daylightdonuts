import { CSSProperties, FunctionComponent, ReactNode } from "react";
import classes from "./ModalDisplay.module.css";
import Modal from "./Modal";
import Background from "./Background";
import { ModalProps } from "@_hooks/animation/useAnimateModal";

interface ModalDisplayProps {
  children: ReactNode;
  className?: string;
  animationTime?: number;
  modalProps: ModalProps;
}

const ModalDisplay: FunctionComponent<ModalDisplayProps> = ({
  children,
  modalProps,
  className,
  animationTime = 300,
}) => {
  let classN = className
    ? `${classes.modal_content} ${className}`
    : classes.modal_content;

  if (modalProps.playAnimation) classN += " " + classes.animate_out;
  return (
    <Modal selector="modal">
      <div
        className={classN}
        style={{ "--animation-time": animationTime + "ms" } as CSSProperties}
      >
        <p className={classes.close} onClick={modalProps.handleModal}>
          X
        </p>
        {children}
      </div>
      <Background
        handleModal={modalProps.handleModal}
        playAnimation={modalProps.playAnimation}
        animationTime={animationTime}
      />
    </Modal>
  );
};

export default ModalDisplay;
