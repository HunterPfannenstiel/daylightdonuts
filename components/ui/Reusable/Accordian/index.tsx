import { ReactNode } from "react";
import classes from "./index.module.css";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import { concatClassNames } from "@_utils/client";

interface AccordianProps<T> {
  Header: ReactNode;
  data: T[];
  componentExtractor: (item: T) => ReactNode;
  containerClassName?: string;
  listClassName?: string;
}

const Accordian = <T extends any>({
  Header,
  data,
  componentExtractor,
  containerClassName,
  listClassName,
}: AccordianProps<T>) => {
  const { playAnimation, showModal, handleModal } = useAnimateModal(300);
  return (
    <div className={concatClassNames(containerClassName)}>
      <div onClick={handleModal}>{Header}</div>
      {showModal && (
        <ul
          className={concatClassNames(
            classes.list,
            playAnimation ? classes.animate_out : undefined,
            listClassName
          )}
        >
          {data.map((item) => {
            return (
              <li className={classes.list_item}>{componentExtractor(item)}</li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Accordian;
