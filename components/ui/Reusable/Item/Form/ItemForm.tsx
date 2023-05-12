import { ExtraInfo } from "@_types/database/cart";
import { Item } from "@_types/database/menu";
import { FormEvent, FunctionComponent } from "react";
import IItemForm from "./IItemForm";

interface ItemFormProps {
  item: Item;
  addItemToCart: (e: FormEvent) => void;
  updateExtras: (category: string, extraInfo: ExtraInfo) => void;
}

const ItemForm: FunctionComponent<ItemFormProps> = ({
  item,
  addItemToCart,
  updateExtras,
}) => {
  return (
    <IItemForm
      extras={item.extras}
      addItemToCart={addItemToCart}
      updateExtras={updateExtras}
    />
  );
};

export default ItemForm;
