"use client";

import { FunctionComponent } from "react";
import classes from "./ModifyMenu.module.css";
import CreateItemModal from "./CreateItemModal/CreateItemModal";
import { Customizations } from "@_types/admin/forms";

interface ModifyMenuProps {
  customizations: Customizations;
}

const ModifyMenu: FunctionComponent<ModifyMenuProps> = ({ customizations }) => {
  return (
    <CreateItemModal
      groupings={customizations!.groupings}
      extraGroupings={customizations!.extra_groupings}
      itemCategories={customizations!.item_categories}
    />
  );
};

export default ModifyMenu;
