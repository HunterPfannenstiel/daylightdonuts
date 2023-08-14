import { FunctionComponent } from "react";
import classes from "./ExtrasDisplayOrder.module.css";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import { DBEntity } from "@_types/admin/modify-menu";
import DragDropList from "@_admin-reuse/Form/DragDropList";

interface ExtrasDisplayOrderProps {
  title?: string;
  extras: DBEntity[];
  onSwap: (indexOne: number, indexTwo: number) => void;
}

const ExtrasDisplayOrder: FunctionComponent<ExtrasDisplayOrderProps> = ({
  title,
  extras,
  onSwap,
}) => {
  return (
    <Fieldset legend={title}>
      <DragDropList onSwap={onSwap} items={extras.map((extra) => extra.name)} />
    </Fieldset>
  );
};

export default ExtrasDisplayOrder;
