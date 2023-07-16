import ModifyMenu from "custom-objects/ModifyMenu";
import { useRef } from "react";

/**
 * Hook for managing a selected ID value.
 * @param initialId The initial ID value.
 * @returns An object containing functions to update and retrieve the selected ID.
 */
const useSelectedId = (initialId?: number) => {
  const selectedId = useRef(initialId);

  /**
   * Updates the selected ID value.
   * @param id - The new ID value.
   */
  const updateId = (id: number) => {
    selectedId.current = id;
  };

  /**
   * Retrieves the updated ID value.
   * @returns The updated ID value (if the ID did not change, undefined will be returned).
   */
  const getUpdatedId = () => {
    return ModifyMenu.CompareVal(initialId, selectedId.current);
  };

  return { selectedId, updateId, getUpdatedId };
};

export default useSelectedId;
