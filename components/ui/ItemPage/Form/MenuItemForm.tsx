import useCartUpdates from "@_hooks/item/useCartUpdates";
import { useNotification } from "@_providers/Notification/Notification";
import { Item } from "@_types/database/menu";
import ItemForm from "components/ui/Reusable/Item/Form/ItemForm";
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
  let extraPrice = 0;
  Object.keys(extraInfo).forEach((key) => {
    if (extraInfo[key].price) {
      extraPrice += extraInfo[key].price!;
    }
  });
  const showPrice = +item.price + extraPrice;
  const addItemToCart = (amount: number) => {
    updateCart(amount, showPrice, !!extraPrice);
    displayNotification(`Added ${item.name} to cart`, "success", 2500);
  };

  useEffect(() => {
    getShowPrice(showPrice, extraPrice);
  }, [extraInfo]);

  return (
    <ItemForm
      extras={item.extras}
      addItemToCart={addItemToCart}
      updateExtras={updateExtras}
    />
  );
};

export default MenuItemForm;
