import { FunctionComponent } from "react";
import classes from "./CategoryDisplayOrders.module.css";
import DragDropList from "@_admin-reuse/Form/DragDropList";
import { DBEntity } from "@_types/admin/modify-menu";

interface CategoryDisplayOrdersProps {
  onCategorySwap: (indexOne: number, indexTwo: number) => void;
  categories: (DBEntity | { name: string; id: undefined })[];
}

const CategoryDisplayOrders: FunctionComponent<CategoryDisplayOrdersProps> = ({
  onCategorySwap,
  categories,
}) => {
  return (
    <DragDropList
      onSwap={onCategorySwap}
      items={categories.map((cat) => {
        return <p>{cat.name}</p>;
      })}
    ></DragDropList>
  );
};

export default CategoryDisplayOrders;
