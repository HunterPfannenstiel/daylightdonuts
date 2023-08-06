import { CSSProperties, FunctionComponent, ReactNode } from "react";
import classes from "./ModalDisplay.module.css";
import Modal from "./Modal";
import Background from "./Background";
import { concatClassNames } from "@_utils/client";
import Spinner from "../Spinner";
import CloseButton from "./CloseButton";

interface ModalDisplayProps {
  children: ReactNode;
  handleModal: () => void;
  playAnimation: boolean;
  animationTime: number;
  isLoading?: boolean;
  className?: string;
  closeable?: boolean;
}

const ModalDisplay: FunctionComponent<ModalDisplayProps> = ({
  handleModal,
  playAnimation,
  animationTime,
  children,
  isLoading,
  className: userClassName,
  closeable = true,
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
          <CloseButton
            className={classes.close}
            onClick={closeable ? handleModal : () => {}}
          />
          {/* <p
            className={classes.close}
            onClick={closeable ? handleModal : () => {}}
          >
            X
          </p> */}
          {children}
        </div>
      ) : (
        <Spinner />
      )}
      <Background
        handleModal={handleModal}
        playAnimation={playAnimation}
        animationTime={animationTime}
        closeable={closeable}
      />
    </Modal>
  );
};

export default ModalDisplay;
