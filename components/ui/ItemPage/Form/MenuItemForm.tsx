import useCartUpdates from "@_hooks/item/useCartUpdates";
import { useNotification } from "@_providers/Notification/Notification";
import { Item } from "@_types/database/menu";
import IItemForm from "components/ui/Reusable/Item/Form/IItemForm";
import { FormEvent, FunctionComponent, useEffect, useRef } from "react";

interface MenuItemFormProps {
  item: Item;
  getShowPrice: (newPrice: number, addedAmount: number) => void;
}

const MenuItemForm: FunctionComponent<MenuItemFormProps> = ({
  item,
  getShowPrice,
}) => {
  const { updateCart, extraInfo, updateExtras } = useCartUpdates(item);
  const { displayNotification } = useNotification();
  const amountRef = useRef<HTMLSelectElement>(null);
  let extraPrice = 0;
  Object.keys(extraInfo).forEach((key) => {
    if (extraInfo[key].price) {
      extraPrice += extraInfo[key].price!;
    }
  });
  const showPrice = +item.price + extraPrice;
  const addItemToCart = (e: FormEvent) => {
    e.preventDefault();
    const amount = +amountRef!.current!.value;
    updateCart(amount, showPrice, !!extraPrice);
    displayNotification(`Added ${item.name} to cart`, "success", 2500);
  };

  useEffect(() => {
    getShowPrice(showPrice, extraPrice);
  }, [extraInfo]);

  return (
    <IItemForm
      extras={item.extras}
      addItemToCart={addItemToCart}
      updateExtras={updateExtras}
      ref={amountRef}
    />
  );
};

export default MenuItemForm;
