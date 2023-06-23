import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import DropContainer from "@_admin-reuse/ItemDrag/DropContainer";
import DropItem from "@_admin-reuse/ItemDrag/DropItem";

interface DragDropListProps {
  onSwap: (indexOne: number, indexTwo: number) => void;
  items: ReactNode[];
}

const DragDropList: FunctionComponent<DragDropListProps> = ({
  onSwap,
  items,
}) => {
  return (
    <ul className={classes.list}>
      {items.map((item, i) => {
        return (
          <DropContainer
            key={i}
            dropHandler={(droppedIndex) => {
              onSwap(+droppedIndex, i);
            }}
            dataName="index"
          >
            <DropItem dataName="index" dataValue={i.toString()}>
              {item}
            </DropItem>
          </DropContainer>
        );
      })}
    </ul>
  );
};

export default DragDropList;
