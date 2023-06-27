import { FunctionComponent, useRef } from "react";
import classes from "./NewSubcategories.module.css";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import SubcategoryName from "../ItemSubcategory/SubcategoryName";
import { NewCategorySubcategory } from "@_types/admin/modify-menu";
import DeletableItem from "@_admin-reuse/DeletableItem";

interface NewSubcategoriesProps {
  title?: string;
  addNewSubcategory: (name: string) => void;
  deleteNewSubcategory: (index: number) => void;
  newSubcategories: NewCategorySubcategory[];
}

const NewSubcategories: FunctionComponent<NewSubcategoriesProps> = ({
  title,
  addNewSubcategory,
  deleteNewSubcategory,
  newSubcategories,
}) => {
  const subcategoryName = useRef("");
  return (
    <Fieldset legend={title}>
      <SubcategoryName
        initialName={{ current: "" }}
        updateName={(name) => {
          subcategoryName.current = name;
        }}
      />
      <button
        type="button"
        onClick={() => {
          addNewSubcategory(subcategoryName.current);
        }}
      >
        Add Subcategory
      </button>
      {newSubcategories.length !== 0 && (
        <>
          <h3>New Subcategories</h3>
          {newSubcategories.map((subcat, i) => (
            <DeletableItem onDelete={deleteNewSubcategory.bind(null, i)}>
              {subcat.name}
            </DeletableItem>
          ))}
        </>
      )}
    </Fieldset>
  );
};

export default NewSubcategories;
