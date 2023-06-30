import { FunctionComponent } from "react";
import classes from "./SearchItems.module.css";
import useSearchItems from "@_hooks/admin/menu/useSearchItems";
import SelectInputList from "@_admin-reuse/Form/SelectInputList";
import { InitialSelections } from "@_types/admin/modify-menu";

interface SearchItemsProps {
  onItemSelect: (id: number, name: string, isSelected: boolean) => void;
  itemSelections: InitialSelections;
}

const SearchItems: FunctionComponent<SearchItemsProps> = ({
  onItemSelect,
  itemSelections,
}) => {
  const { data } = useSearchItems();
  return (
    <SelectInputList
      onSelect={onItemSelect}
      initialSelections={itemSelections}
      selections={data}
      type="checkbox"
    />
  );
};

export default SearchItems;
