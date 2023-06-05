import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import useAnimateModal from "@_hooks/animation/useAnimateModal";

interface AccordianProps {
  RevealingContent: ReactNode;
  children: ReactNode;
  maxChildrenHeight?: string;
  childrenHeight?: string;
}

const Accordian: FunctionComponent<AccordianProps> = ({
  RevealingContent,
  children,
  maxChildrenHeight,
  childrenHeight,
}) => {
  const { playAnimation, showModal, handleModal } = useAnimateModal(300);
  const ulClassName = playAnimation
    ? `${classes.list} ${classes.animate_out}`
    : `${classes.list}`;
  return (
    <>
      <div onClick={handleModal}>{RevealingContent}</div>
      {showModal && (
        <ul
          className={ulClassName}
          style={{ height: childrenHeight, maxHeight: maxChildrenHeight }}
        >
          {children}
        </ul>
      )}
    </>
  );
};

export default Accordian;
