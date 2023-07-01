import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import ModalDisplay from "components/ui/Reusable/Modal/ModalDisplay";
import { ModalProps } from "@_hooks/animation/useAnimateModal";

interface ModifyMenuModalProps {
  children: ReactNode;
  modalProps: ModalProps;
}

const ModifyMenuModal: FunctionComponent<ModifyMenuModalProps> = ({
  children,
  modalProps,
}) => {
  return (
    <ModalDisplay modalProps={modalProps} className={classes.modal}>
      {children}
    </ModalDisplay>
  );
};

export default ModifyMenuModal;
