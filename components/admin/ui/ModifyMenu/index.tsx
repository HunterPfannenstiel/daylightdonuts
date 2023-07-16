import { FunctionComponent } from "react";
import classes from "./ModifyMenu.module.css";
import { Item } from "@_types/admin/modify-menu";
import {
  AvailableExtraGrouping,
  AvailableGrouping,
  AvailableItemCategory,
} from "@_types/admin/forms";

interface ModifyMenuProps {
  items: Item[];
  groupings: AvailableGrouping[];
  extraGroupings: AvailableExtraGrouping[];
  itemCategories: AvailableItemCategory[];
}

const ModifyMenu: FunctionComponent<ModifyMenuProps> = ({
  items,
  groupings,
  extraGroupings,
  itemCategories,
}) => {
  return <></>;
};

export default ModifyMenu;
