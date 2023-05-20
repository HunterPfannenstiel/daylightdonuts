"use client";

import BuildBoxProvider from "@_providers/Dozenable/BuildBox";
import { Item } from "@_types/database/menu";
import { FunctionComponent } from "react";
import BoxDisplay from "./BoxDisplay/BoxDisplay";
import DozenableItemList from "./DozenableItems/DozenableItemList";
import classes from "./DozenablePage.module.css";

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
  return (
    <>
      <h2 className={classes.group_name}>{groupName}</h2>
      <BuildBoxProvider
        boxSize={boxSize}
        groupName={groupName}
        groupPrice={boxPrice}
      >
        <div className={classes.page_content}>
          <DozenableItemList items={items} />
          <BoxDisplay boxSize={boxSize} />
        </div>
      </BuildBoxProvider>
    </>
  );
};

export default DozenablePage;
