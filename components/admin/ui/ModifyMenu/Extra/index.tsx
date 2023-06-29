"use client";

import { FunctionComponent } from "react";
import classes from "./Extra.module.css";
import CreateExtraModal from "./CreateModal";
import { ExtraCustomizations, NestedDBEntity } from "@_types/admin/modify-menu";
import ModifyExtraModal from "./ModifyModal";
import useHandleInput from "@_hooks/admin/menu/useHandleInput";
import useUpdateNestedEntities from "@_hooks/admin/menu/useUpdateNestedEntities";

interface ExtraProps {
  customizations: ExtraCustomizations;
  initialExtras: NestedDBEntity[];
}

const Extra: FunctionComponent<ExtraProps> = ({
  customizations,
  initialExtras,
}) => {
  const {
    createModal,
    modifyModal,
    setSelectedEntity,
    getSelectedId,
    getSelectedName,
  } = useHandleInput();
  const extras = useUpdateNestedEntities(initialExtras);
  return (
    <>
      <button onClick={createModal.handleModal}>Create Extra</button>
      {createModal.showModal && (
        <CreateExtraModal
          addNewExtra={extras.addNewEntity}
          modalProps={createModal}
          groupings={customizations.groups}
          categories={customizations.categories}
        />
      )}
      {extras.entities.map((category) => {
        return (
          <div>
            <h2>{category.name}</h2>
            {category.entities.map((extra, i) => {
              return (
                <li
                  onClick={() => {
                    setSelectedEntity(extra, i);
                  }}
                >
                  {extra.name}
                </li>
              );
            })}
          </div>
        );
      })}
      {modifyModal.showModal && (
        <ModifyExtraModal
          extraId={getSelectedId()!}
          extraName={getSelectedName()!}
          modalProps={modifyModal}
          groupings={customizations.groups}
          categories={customizations.categories}
        />
      )}
    </>
  );
};

export default Extra;
