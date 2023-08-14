import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import ModalDisplay from "components/ui/Reusable/Modal/ModalDisplay";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import Spinner from "@ui/Reusable/Spinner";

interface ModifyMenuModalProps {
  children: ReactNode;
  modalProps: ModalProps;
  isLoading?: boolean;
  showSpinner?: boolean;
}

const ModifyMenuModal: FunctionComponent<ModifyMenuModalProps> = ({
  children,
  modalProps,
  isLoading,
  showSpinner,
}) => {
  return (
    <ModalDisplay
      {...modalProps}
      isLoading={isLoading}
      className={classes.modal}
    >
      {showSpinner && <Spinner center />}
      {children}
    </ModalDisplay>
  );
};

export default ModifyMenuModal;
