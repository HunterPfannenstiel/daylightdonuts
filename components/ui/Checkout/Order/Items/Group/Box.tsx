import useBoxModified from "@_hooks/checkout/useBoxModified";
import { useCartUpdates } from "@_providers/cart/CartUpdates/CartUpdates";
import { CartDozen, Items } from "@_types/database/cart";
import { FunctionComponent, useState } from "react";
import GroupItemList from "../ItemTypes/GroupItemList";
import ItemGroup from "../ItemTypes/ItemGroup";
import classes from "./Box.module.css";

interface BoxProps {
  box: CartDozen;
  boxPrice: number;
  boxSize: number;
  boxId: string;
  groupId: string;
  groupItems: Items;
}

const Box: FunctionComponent<BoxProps> = ({
  box,
  boxPrice,
  boxSize,
  boxId,
  groupId,
  groupItems,
}) => {
  const [showDonuts, setShowDonuts] = useState(false);
  const [newAmount, setNewAmount] = useState(box.amount);
  const { isPendingUpdates } = useCartUpdates();
  const { updateModifications, isModified } = useBoxModified(isPendingUpdates);
  const buttonText = showDonuts ? "Hide donuts" : "Show Donuts";
  const onClick = () => {
    setShowDonuts((prevState) => !prevState);
  };
  const getNewAmount = (newAmount: number) => {
    setNewAmount(newAmount);
  };
  const updateModifiedAmount = (id: string, amount: number) => {
    updateModifications(id, amount);
  };

  return (
    <li>
      <ItemGroup
        box={box}
        boxId={boxId}
        boxPrice={boxPrice}
        boxSize={boxSize}
        groupId={groupId}
        groupItems={groupItems}
        getNewAmount={getNewAmount}
        hideUnderline={!!showDonuts}
        disableButtons={isModified}
      >
        <button onClick={onClick} className={classes.button}>
          {buttonText}
        </button>
      </ItemGroup>
      {showDonuts && (
        <GroupItemList
          items={box.items}
          groupId={groupId}
          boxId={boxId}
          boxAmount={newAmount}
          disabledButtons={newAmount !== box.amount}
          updateModifiedAmount={updateModifiedAmount}
        />
      )}
    </li>
  );
};

export default Box;
