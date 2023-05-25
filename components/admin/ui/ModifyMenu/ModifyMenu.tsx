"use client";

import { FunctionComponent } from "react";
import classes from "./ModifyMenu.module.css";
import CreateItemModal from "./CreateItemModal/CreateItemModal";

interface ModifyMenuProps {}

const ModifyMenu: FunctionComponent<ModifyMenuProps> = () => {
  return <CreateItemModal />;
};

export default ModifyMenu;
