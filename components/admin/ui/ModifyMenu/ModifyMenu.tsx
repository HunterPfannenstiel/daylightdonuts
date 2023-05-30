"use client";

import { FunctionComponent } from "react";
import classes from "./ModifyMenu.module.css";
import CreateItemModal from "./CreateItemModal/CreateItemModal";
import { Customizations } from "@_types/admin/forms";
import { Item } from "@_types/admin/modify-menu";

interface ModifyMenuProps {
  items: Item[];
}

const ModifyMenu: FunctionComponent<ModifyMenuProps> = ({ items }) => {
  return (
    <>
      {items.map((item) => {
        return <h2 key={item.name}>{item.name}</h2>;
      })}
    </>
  );
  // return (
  // <CreateItemModal
  //   groupings={customizations!.groupings}
  //   extraGroupings={customizations!.extra_groupings}
  //   itemCategories={customizations!.item_categories}
  // />
  // );
};

export default ModifyMenu;
