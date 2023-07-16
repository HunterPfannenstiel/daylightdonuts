import { FunctionComponent, MutableRefObject, useState } from "react";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import {
  DBEntity,
  InitialSelections,
  NestedDBEntity,
} from "@_types/admin/modify-menu";
import SelectInputList from "@_admin-reuse/Form/SelectInputList";

interface ExtraGroupsProps {
  initialGroups: MutableRefObject<InitialSelections>;
  initialCategoryId: MutableRefObject<number | undefined>;
  groupSelections: NestedDBEntity[];
  categories: DBEntity[];
  updateCategory: (id: number) => void;
  updateGroupings: (id: number, selected?: boolean) => void;
}

const ExtraGroups: FunctionComponent<ExtraGroupsProps> = ({
  initialGroups,
  initialCategoryId,
  groupSelections,
  categories,
  updateCategory,
  updateGroupings,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategoryId?.current
  );
  const selectedCategoryName = selectedCategory
    ? categories.find((category) => category.id === selectedCategory)?.name
    : undefined;
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
                (group) => group.name === selectedCategoryName
              )[0].entities
            }
            title="Select Groups"
            initialSelections={initialGroups.current || {}}
            type="checkbox"
            onSelect={(id, __, selected) => {
              updateGroupings(id, selected);
            }}
          />
        </>
      )}
    </Fieldset>
  );
};

export default ExtraGroups;
