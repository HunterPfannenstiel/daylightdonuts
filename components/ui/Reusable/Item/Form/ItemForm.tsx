import useCartUpdates from "@_hooks/item/useCartUpdates";
import { moneyToNum } from "@_providers/cart/utils";
import { useNotification } from "@_providers/Notification/Notification";
import { ExtraInfo } from "@_types/database/cart";
import { Item } from "@_types/database/menu";
import { FormEvent, FunctionComponent, useEffect, useRef } from "react";
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
