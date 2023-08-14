"use client";

import { Item } from "@_types/database/menu";
import { useRouter } from "next/navigation";
import { FunctionComponent, useState } from "react";
import Page from "../Reusable/Item/ItemPage";
import MenuItemForm from "./Form/MenuItemForm";
import useMenuItem from "@_hooks/menu/useMenuItem";

interface ItemPageProps {
  item: Item;
}

const ItemPage: FunctionComponent<ItemPageProps> = ({ item }) => {
  const { extraPrice, showPrice, updateExtras, addItemToCart } =
    useMenuItem(item);
  const router = useRouter();

  const backButtonHandler = () => {
    router.back();
  };
  return (
    <Page
      item={item}
      extraPrice={extraPrice}
      price={showPrice}
      backButtonHandler={backButtonHandler}
      updateExtras={updateExtras}
      addItemToCart={addItemToCart}
    />
  );
};

export default ItemPage;
