import {
  FunctionComponent,
  MutableRefObject,
  useEffect,
  useState,
} from "react";
import classes from "./ExtraGroups.module.css";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import {
  DBEntity,
  ExtraGroup,
  InitialSelections,
} from "@_types/admin/modify-menu";
import SelectInput from "@_admin-reuse/Form/Inputs/SelectInput";
import SelectInputList from "@_admin-reuse/Form/SelectInputList";

interface ExtraGroupsProps {
  initialGroups: { [categoryId: number]: InitialSelections | undefined };
  initialCategoryId: MutableRefObject<number | undefined>;
  groupSelections: ExtraGroup[];
  categories: DBEntity[];
  updateCategory: (id: number) => void;
  updateGroupings: (id: number, categoryId: number) => void;
  canFlipPage: (bool: boolean) => void;
}

const ExtraGroups: FunctionComponent<ExtraGroupsProps> = ({
  initialGroups,
  initialCategoryId,
  groupSelections,
  categories,
  updateCategory,
  updateGroupings,
  canFlipPage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategoryId?.current
  );
  const selectedCategoryName = selectedCategory
    ? categories.find((category) => category.id === selectedCategory)?.name
    : undefined;
  useEffect(() => {
    canFlipPage(selectedCategory !== undefined);
  }, [selectedCategory]);
  return (
    <Fieldset legend="Choose Groups!">
      <SelectInputList
        selections={categories}
        initialSelections={undefined}
        initialSelection={initialCategoryId.current}
        type="radio"
        title="Category"
        radioName="extras"
        onSelect={(id, name) => {
          updateCategory(id);
          setSelectedCategory(id);
        }}
      />
      {selectedCategoryName !== undefined && (
        <>
          <SelectInputList
            selections={
              groupSelections.filter(
                (group) => group.category === selectedCategoryName
              )[0].groups
            }
            title="Select Groups"
            initialSelections={initialGroups[selectedCategory || -1] || {}}
            type="checkbox"
            onSelect={(id) => {
              updateGroupings(id, selectedCategory!);
            }}
          />
        </>
      )}
    </Fieldset>
  );
};

export default ExtraGroups;
