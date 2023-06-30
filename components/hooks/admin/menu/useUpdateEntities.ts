import { DBEntity } from "@_types/admin/modify-menu";
import { useState } from "react";

const useUpdateEntities = (initialData: DBEntity[]) => {
  const [entities, setEntities] = useState(initialData);

  const addNewEntity: AddNewEntity = (newEntity, index = entities.length) => {
    setEntities((prevState) => {
      const copyEntities = prevState.map((entity) => {
        return { ...entity };
      });
      copyEntities.splice(index, 0, newEntity);
      return copyEntities;
    });
  };

  const updateEntity: UpdateEntity = (name, index) => {
    setEntities((prevState) => {
      const copyEntities = prevState.map((entity) => {
        return { ...entity };
      });
      copyEntities[index].name = name;
      return copyEntities;
    });
  };

  const deleteEntity: DeleteEntity = (index) => {
    setEntities((prevState) => {
      const copyEntities = prevState.map((entity) => {
        return { ...entity };
      });
      copyEntities.splice(index, 1);
      return copyEntities;
    });
  };

  return { entities, addNewEntity, updateEntity, deleteEntity };
};

export type AddNewEntity = (newEntity: DBEntity, index?: number) => void;

export type UpdateEntity = (name: string, index: number) => void;

export type DeleteEntity = (index: number) => void;

export default useUpdateEntities;
