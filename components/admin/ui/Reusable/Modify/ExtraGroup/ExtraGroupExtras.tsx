import { FunctionComponent, MutableRefObject, useState } from "react";
import classes from "./ExtraGroupExtras.module.css";
import {
  CategoryExtra,
  DBEntity,
  InitialSelections,
} from "@_types/admin/modify-menu";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import SelectInputList from "@_admin-reuse/Form/SelectInputList";

interface ExtraGroupExtrasProps {
  categories: DBEntity[];
  initialCategoryId: MutableRefObject<number | undefined>;
  extras: CategoryExtra[];
  initialExtras: InitialSelections;
  updateCategory: (id: number) => void;
  updateExtra: (id: number) => void;
  title?: string;
}

const ExtraGroupExtras: FunctionComponent<ExtraGroupExtrasProps> = ({
  categories,
  initialCategoryId,
  initialExtras,
  extras,
  updateCategory,
  updateExtra,
  title,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    initialCategoryId?.current
  );
  return (
    <Fieldset legend={title} className={classes.fieldset}>
      <SelectInputList
        title="Category"
        radioName="category"
        selections={categories}
        onSelect={(id) => {
          updateCategory(id);
          setSelectedCategoryId(id);
        }}
        initialSelection={selectedCategoryId}
        type="radio"
      />
      {selectedCategoryId !== undefined && (
        <SelectInputList
          title="Extras"
          selections={getExtras(selectedCategoryId, extras)}
          type="checkbox"
          initialSelections={initialExtras}
          onSelect={(id) => {
            updateExtra(id);
          }}
        />
      )}
    </Fieldset>
  );
};

const getExtras = (id: number, extras: CategoryExtra[]) => {
  const catExtras = extras.find((extraCat) => extraCat.category_id === id);
  return catExtras?.extras || [];
};

export default ExtraGroupExtras;
