import { CartDozens, CartGroup, Items } from "@_types/database/cart";
import { FunctionComponent } from "react";
import Box from "./Box";
import classes from "./BoxList.module.css";

interface BoxListProps {
  groupId: string;
  cartGroup: CartGroup;
}

const BoxList: FunctionComponent<BoxListProps> = ({ groupId, cartGroup }) => {
  const { dozens: boxes } = cartGroup;
  const boxIds = Object.keys(boxes);
  return (
    <ul>
      {boxIds.map((key) => {
        if (boxes[key].amount > 0) {
          return (
            <Box
              key={key}
              box={boxes[key]}
              boxPrice={cartGroup.groupPrice}
              boxId={key}
              boxSize={cartGroup.groupSize}
              groupId={groupId}
              groupItems={cartGroup.items}
            />
          );
        }
      })}
    </ul>
  );
};

export default BoxList;
