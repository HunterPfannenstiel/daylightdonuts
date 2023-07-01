import { FunctionComponent } from "react";
import classes from "./ExtraCategoryExistingExtras.module.css";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import SelectInputList from "@_admin-reuse/Form/SelectInputList";
import { DBEntity, InitialSelections } from "@_types/admin/modify-menu";

interface ExtraCategoryExistingExtrasProps {
  title?: string;
  extras: DBEntity[];
  onExtraSelected: (id: number, name: string) => void;
  initialExtraIds: InitialSelections;
  selectedExtras: DBEntity[];
}

const ExtraCategoryExistingExtras: FunctionComponent<
  ExtraCategoryExistingExtrasProps
> = ({ title, extras, onExtraSelected, initialExtraIds, selectedExtras }) => {
  return (
    <Fieldset legend={title}>
      <SelectInputList
        type="checkbox"
        selections={extras}
        onSelect={onExtraSelected}
        initialSelections={initialExtraIds}
      />
      {selectedExtras.length !== 0 && (
        <>
          <p>Selected Extras</p>
          <SelectInputList
            type="checkbox"
            selections={selectedExtras}
            onSelect={onExtraSelected}
            alwaysChecked
            initialSelections={{}}
          />
        </>
      )}
    </Fieldset>
  );
};

export default ExtraCategoryExistingExtras;
