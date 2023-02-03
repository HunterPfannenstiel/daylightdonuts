import useDozenableBoxUpdate from "@_hooks/item/useDozenableBoxUpdate";
import { useNotification } from "@_providers/Notification/Notification";
import { Item } from "@_types/database/menu";
import IItemForm from "components/ui/Reusable/Item/Form/IItemForm";
import { FormEvent, FunctionComponent, useRef } from "react";

interface DozenableItemFormProps {
  item: Item;
}

const DozenableItemForm: FunctionComponent<DozenableItemFormProps> = ({
  item,
}) => {
  const { addItemToBox, updateExtras, amountNeeded } =
    useDozenableBoxUpdate(item);
  const amountRef = useRef<HTMLSelectElement>(null);
  const { displayNotification } = useNotification();
  const addItemToCart = (e: FormEvent) => {
    e.preventDefault();
    displayNotification(
      `Added ${amountRef!.current!.value} ${item.name} to box`,
      "pending",
      2000
    );
    addItemToBox(+amountRef!.current!.value);
  };

  return (
    <IItemForm
      extras={item.extras}
      buttonName={"Add to Box"}
      addItemToCart={addItemToCart}
      updateExtras={updateExtras}
      ref={amountRef}
      maxAmount={amountNeeded}
    />
  );
};

export default DozenableItemForm;
