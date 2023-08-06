"use client";

import BuildBoxProvider from "@_providers/Dozenable/BuildBox";
import { Item } from "@_types/database/menu";
import { FunctionComponent } from "react";
import BoxDisplay from "./BoxDisplay/BoxDisplay";
import classes from "./DozenablePage.module.css";
import useDozenableBoxUpdate from "@_hooks/item/useDozenableBoxUpdate";
import ItemList from "@ui/Reusable/Menu/ItemList";
import DozenableItem from "./DozenableItems/DozenableItem";

interface DozenablePageProps {
  groupName: string;
  items: Item[];
  boxSize: number;
  boxPrice: number;
}

const DozenablePage: FunctionComponent<DozenablePageProps> = ({
  groupName,
  items,
  boxSize,
  boxPrice,
}) => {
  const { addItemToBox, updateExtras, amountNeeded } = useDozenableBoxUpdate();
  // const addItemToCart = (e: FormEvent) => {
  //   e.preventDefault();
  //   displayNotification(
  //     `Added ${amountRef!.current!.value} ${item.name} to box`,
  //     "pending",
  //     2000
  //   );
  //   addItemToBox(+amountRef!.current!.value);
  // };
  return (
    <>
      <h2 className={classes.group_name}>{groupName}</h2>
      <BuildBoxProvider
        boxSize={boxSize}
        groupName={groupName}
        groupPrice={boxPrice}
      >
        <div className={classes.page_content}>
          <ItemList className={classes.item_list}>
            {items.map((item) => {
              return (
                <DozenableItem
                  key={item.name}
                  item={item}
                  maxAmount={amountNeeded}
                  updateExtras={updateExtras}
                  addItemToBox={(amount) => {
                    addItemToBox(amount, item);
                  }}
                />
              );
            })}
          </ItemList>
          <BoxDisplay boxSize={boxSize} />
        </div>
      </BuildBoxProvider>
    </>
  );
};

export default DozenablePage;
