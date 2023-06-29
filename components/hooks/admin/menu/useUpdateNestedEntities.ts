import { DBEntity, NestedDBEntity } from "@_types/admin/modify-menu";
import { useState } from "react";

const useUpdateNestedEntities = (initialData: NestedDBEntity[]) => {
  const [entities, setEntities] = useState(initialData);

  const addNewEntity: AddNewNestedEntity = (newEntity, sectionId, index) => {
    setEntities((prevState) => {
      const copyEntities = prevState.map((section) => {
        const copySection = { ...section };
        copySection.entities = copySection.entities.map((entity) => {
          return { ...entity };
        });
        if (copySection.id === sectionId) {
          if (!index) copySection.entities.push(newEntity);
          else copySection.entities.splice(index, 0, newEntity);
        }
        return copySection;
      });
      return copyEntities;
    });
  };

  const updateEntity: UpdateNestedEntity = (name, sectionId, index) => {
    setEntities((prevState) => {
      const copyEntities = prevState.map((section) => {
        const copySection = { ...section };
        copySection.entities = copySection.entities.map((entity) => {
          return { ...entity };
        });
        if (copySection.id === sectionId) {
          copySection.entities[index].name = name;
        }
        return copySection;
      });
      return copyEntities;
    });
  };

  const deleteEntity: DeleteNestedEntity = (sectionId, index) => {
    setEntities((prevState) => {
      const copyEntities = prevState.map((section) => {
        const copySection = { ...section };
        copySection.entities = copySection.entities.map((entity) => {
          return { ...entity };
        });
        if (copySection.id === sectionId) {
          copySection.entities.splice(index, 1);
        }
        return copySection;
      });
      return copyEntities;
    });
  };

  return { entities, addNewEntity, updateEntity, deleteEntity };
};

export default useUpdateNestedEntities;

export type AddNewNestedEntity = (
  newEntity: DBEntity,
  sectionId: number,
  index?: number
) => void;

export type UpdateNestedEntity = (
  name: string,
  sectionId: number,
  index: number
) => void;

export type DeleteNestedEntity = (sectionId: number, index: number) => void;
