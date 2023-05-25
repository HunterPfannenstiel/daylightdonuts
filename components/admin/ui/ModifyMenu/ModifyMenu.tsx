"use client";

import { FunctionComponent } from "react";
import classes from "./ModifyMenu.module.css";
import CreateItemModal from "./CreateItemModal/CreateItemModal";

interface ModifyMenuProps {}

const ModifyMenu: FunctionComponent<ModifyMenuProps> = () => {
  return <CreateItemModal groupings={dummyGroupings} />;
};

const dummyGroupings = [
  { grouping_id: 1, name: "Dummy 1" },
  { grouping_id: 2, name: "Dummy 2" },
];

export default ModifyMenu;
