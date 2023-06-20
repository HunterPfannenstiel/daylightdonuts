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
      <h2>Category</h2>
      <ul className={classes.categories}>
        {categories.map((category) => {
          return (
            <SelectInput
              inputId={category.name}
              label={category.name}
              defaultChecked={initialCategoryId.current === category.id}
              handler={() => {
                updateCategory(category.id);
                setSelectedCategory(category.id);
              }}
              type="radio"
              radioName="category"
            />
          );
        })}
      </ul>
      {selectedCategory !== undefined && (
        <>
          <h2>Select Groups</h2>
          {groupSelections
            .filter((group) => group.extra_category_id === selectedCategory)
            .map((group) => {
              return (
                <SelectInput
                  inputId={group.name}
                  label={group.name}
                  type="checkbox"
                  defaultChecked={!!initialGroups[group.id]}
                  handler={(isSelected) => {
                    updateGroupings(group.id);
                  }}
                />
              );
            })}
        </>
      )}
    </Fieldset>
  );
};

export default ExtraGroups;
