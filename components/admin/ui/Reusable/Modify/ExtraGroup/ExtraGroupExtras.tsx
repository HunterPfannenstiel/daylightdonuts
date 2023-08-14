import { FunctionComponent, MutableRefObject, useState } from "react";
import classes from "./ExtraGroupExtras.module.css";
import { NestedDBEntity } from "@_types/admin/modify-menu";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import SelectInputList from "@_admin-reuse/Form/SelectInputList";
import { InitialSelections } from "@_hooks/admin/menu/modification/useSelections";

interface ExtraGroupExtrasProps {
  initialCategoryId: MutableRefObject<number | undefined>;
  extras: NestedDBEntity[];
  initialExtras: InitialSelections;
  updateCategory: (id: number) => void;
  updateExtra: (id: number) => void;
  title?: string;
}

const ExtraGroupExtras: FunctionComponent<ExtraGroupExtrasProps> = ({
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
        selections={extras}
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

const getExtras = (id: number, categoryExtras: NestedDBEntity[]) => {
  console.log(categoryExtras);
  const catExtras = categoryExtras.find((extraCat) => extraCat.id === id);
  return catExtras?.entities || [];
};

export default ExtraGroupExtras;
