"use client";

import { FunctionComponent } from "react";
import classes from "./ModifyMenu.module.css";
import CreateItemModal from "./CreateItemModal/CreateItemModal";
import {
  AvailableExtraGrouping,
  AvailableGrouping,
  AvailableItemCategory,
} from "@_types/admin/forms";

interface ModifyMenuProps {}

const ModifyMenu: FunctionComponent<ModifyMenuProps> = () => {
  return (
    <CreateItemModal
      groupings={dummyGroupings}
      extraGroupings={groupings}
      itemCategories={categories}
    />
  );
};

const dummyGroupings: AvailableGrouping[] = [
  { grouping_id: 1, name: "Dummy 1" },
  { grouping_id: 2, name: "Dummy 2" },
];

const groupings: AvailableExtraGrouping[] = [
  {
    name: "Topping",
    extra_groupings: [
      {
        name: "Classic Toppings",
        extra_group_id: 1,
        extras: ["None", "Peanuts"],
      },
    ],
  },
  {
    name: "Frosting",
    extra_groupings: [
      {
        name: "Classic Frostings",
        extra_group_id: 2,
        extras: ["None", "Chocolate"],
      },
      {
        name: "Blueberry Frostings",
        extra_group_id: 3,
        extras: ["None", "Cream Cheese"],
      },
    ],
  },
];

const categories: AvailableItemCategory[] = [
  {
    name: "Donuts",
    item_category_id: 1,
    subcategories: [
      { name: "Specialty", item_subcategory_id: 1 },
      { name: "Cake", item_subcategory_id: 2 },
    ],
  },
];

export default ModifyMenu;
