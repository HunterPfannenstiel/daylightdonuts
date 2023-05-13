import { Item } from "@_types/database/menu";
import { useRouter } from "next/router";
import { FunctionComponent, useState } from "react";
import IItemPage from "../Reusable/Item/IItemPage";
import MenuItemForm from "./Form/MenuItemForm";

interface ItemPageProps {
  item: Item;
}

const ItemPage: FunctionComponent<ItemPageProps> = ({ item }) => {
  const [extraPrice, setExtraPrice] = useState(0);
  const [showPrice, setShowPrice] = useState(+item.price);
  const router = useRouter();
  const getShowPrice = (newPrice: number, addedAmount: number) => {
    setShowPrice(newPrice);
    setExtraPrice(addedAmount);
  };
  const backButtonHandler = () => {
    router.back();
  };
  return (
    <IItemPage
      item={item}
      extraPrice={extraPrice}
      price={showPrice}
      itemForm={<MenuItemForm item={item} getShowPrice={getShowPrice} />}
      backButtonHandler={backButtonHandler}
    />
  );
};

export default ItemPage;
