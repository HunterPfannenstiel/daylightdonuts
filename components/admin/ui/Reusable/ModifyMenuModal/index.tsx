import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import ModalDisplay from "components/ui/Reusable/Modal/ModalDisplay";
import { ModalProps } from "@_hooks/animation/useAnimateModal";

interface ModifyMenuModalProps {
  children: ReactNode;
  modalProps: ModalProps;
  isLoading?: boolean;
}

const ModifyMenuModal: FunctionComponent<ModifyMenuModalProps> = ({
  children,
  modalProps,
  isLoading,
}) => {
  return (
    <ModalDisplay
      {...modalProps}
      isLoading={isLoading}
      className={classes.modal}
    >
      {children}
    </ModalDisplay>
  );
};

export default ModifyMenuModal;
