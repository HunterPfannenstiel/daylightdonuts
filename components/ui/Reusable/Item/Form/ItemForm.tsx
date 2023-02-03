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
  // const { updateCart, extraInfo, setExtraInfo } = useCartUpdates(item);
  // const { displayNotification } = useNotification();
  // const amountRef = useRef<HTMLSelectElement>(null);
  // let extraPrice = 0;
  // Object.keys(extraInfo).forEach((key) => {
  //   if (extraInfo[key].price) {
  //     extraPrice += extraInfo[key].price!;
  //   }
  // });
  // const showPrice = moneyToNum(item.price) + extraPrice;
  // const addItemToCart = (e: FormEvent) => {
  //   e.preventDefault();
  //   const amount = +amountRef!.current!.value;
  //   updateCart(amount, showPrice, !!extraPrice);
  //   displayNotification(`Added ${item.name} to cart`, "success", 2500);
  // };

  // const updateExtras = (category: string, extraInfo: ExtraInfo) => {
  //   setExtraInfo((prevState) => {
  //     return { ...prevState, [category]: extraInfo };
  //   });
  // };
  // useEffect(() => {
  //   getShowPrice(showPrice, extraPrice);
  // }, [extraInfo]);

  return (
    <IItemForm
      extras={item.extras}
      addItemToCart={addItemToCart}
      updateExtras={updateExtras}
    />
  );
};

export default ItemForm;
