import { DBEntity } from "@_types/admin/modify-menu";
import { useState } from "react";

const useUpdateEntities = (initialData: DBEntity[]) => {
  const [entities, setEntities] = useState(initialData);

  const addNewEntity = (newEntity: DBEntity, index = entities.length) => {
    setEntities((prevState) => {
      const copyEntities = prevState.map((entity) => {
        return { ...entity };
      });
      copyEntities.splice(index, 0, newEntity);
      return copyEntities;
    });
  };

  const updateEntity = (name: string, index: number) => {
    setEntities((prevState) => {
      const copyEntities = prevState.map((entity) => {
        return { ...entity };
      });
      copyEntities[index].name = name;
      return copyEntities;
    });
  };

  const deleteEntity = (index: number) => {
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

export default useUpdateEntities;
