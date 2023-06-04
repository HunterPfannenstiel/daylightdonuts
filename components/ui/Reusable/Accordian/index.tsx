import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import useAnimateModal from "@_hooks/animation/useAnimateModal";

interface AccordianProps {
  RevealingContent: ReactNode;
  AccordianContents: ReactNode;
}

const Accordian: FunctionComponent<AccordianProps> = ({
  RevealingContent,
  AccordianContents,
}) => {
  const { playAnimation, showModal, handleModal } = useAnimateModal(300);
  return (
    <div>
      <div onClick={handleModal}>{RevealingContent}</div>
      {showModal && <ul>{AccordianContents}</ul>}
    </div>
  );
};

export default Accordian;
