import { CSSProperties, FunctionComponent, ReactNode } from "react";
import classes from "./ModalDisplay.module.css";
import Modal from "./Modal";
import Background from "./Background";
import { concatClassNames } from "@_utils/client";
import Spinner from "../Spinner";

interface ModalDisplayProps {
  children: ReactNode;
  handleModal: () => void;
  playAnimation: boolean;
  animationTime: number;
  isLoading?: boolean;
  className?: string;
}

const ModalDisplay: FunctionComponent<ModalDisplayProps> = ({
  handleModal,
  playAnimation,
  animationTime,
  children,
  isLoading,
  className: userClassName,
}) => {
  const className = concatClassNames(
    classes.modal_content,
    userClassName,
    (playAnimation && classes.animate_out) || undefined
  );
  return (
    <Modal selector="modal">
      {!isLoading ? (
        <div
          className={className}
          style={{ "--animation-time": animationTime + "ms" } as CSSProperties}
        >
          <p className={classes.close} onClick={handleModal}>
            X
          </p>
          {children}
        </div>
      ) : (
        <Spinner center />
      )}
      <Background
        handleModal={handleModal}
        playAnimation={playAnimation}
        animationTime={animationTime}
      />
    </Modal>
  );
};

export default ModalDisplay;
