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
  initialGroups: InitialSelections;
  initialCategoryId: MutableRefObject<number | undefined>;
  groupSelections: ExtraGroup[];
  categories: DBEntity[];
  updateCategory: (id: number) => void;
  updateGroupings: (id: number) => void;
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
  useEffect(() => {
    canFlipPage(selectedCategory !== undefined);
  }, [selectedCategory]);
  return (
    <Fieldset legend="Choose Groups!">
      <SelectInputList
        selections={categories}
        initialSelections={undefined}
        initialSelection={selectedCategory}
        type="radio"
        title="Category"
        onSelect={(id) => {
          updateCategory(id);
          setSelectedCategory(id);
        }}
      />
      {selectedCategory !== undefined && (
        <>
          <SelectInputList
            selections={groupSelections.filter(
              (group) => group.extra_category_id === selectedCategory
            )}
            title="Select Groups"
            initialSelections={initialGroups}
            type="checkbox"
            onSelect={(id) => {
              updateGroupings(id);
            }}
          />
        </>
      )}
    </Fieldset>
  );
};

export default ExtraGroups;
