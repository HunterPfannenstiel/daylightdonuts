"use client";

import { FunctionComponent, useRef } from "react";
import classes from "./Extra.module.css";
import CreateExtraModal from "./CreateModal";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import {
  CategoryExtras,
  DBEntity,
  ExtraCustomizations,
} from "@_types/admin/modify-menu";
import ModifyExtraModal from "./ModifyModal";

interface ExtraProps {
  customizations: ExtraCustomizations;
  extras: CategoryExtras[];
}

const Extra: FunctionComponent<ExtraProps> = ({ customizations, extras }) => {
  const createModal = useAnimateModal(300);
  const modifyModal = useAnimateModal(300);
  const selectedExtra = useRef<DBEntity>();
  return (
    <>
      <button onClick={createModal.handleModal}>Create Extra</button>
      {createModal.showModal && (
        <CreateExtraModal
          modalProps={createModal}
          groupings={customizations.groups}
          categories={customizations.categories}
        />
      )}
      {extras.map((category) => {
        return (
          <div>
            <h2>{category.category}</h2>
            {category.extras.map((extra) => {
              return (
                <li
                  onClick={() => {
                    selectedExtra.current = { id: extra.id, name: extra.name };
                    modifyModal.handleModal();
                  }}
                >
                  {extra.name}
                </li>
              );
            })}
          </div>
        );
      })}
      {modifyModal.showModal && selectedExtra.current && (
        <ModifyExtraModal
          extraId={selectedExtra.current.id}
          extraName={selectedExtra.current.name}
          modalProps={modifyModal}
          groupings={customizations.groups}
          categories={customizations.categories}
        />
      )}
    </>
  );
};

export default Extra;
