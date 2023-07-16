import { InitialSelections } from "@_types/admin/modify-menu";
import { useRef } from "react";

/**
 * Hook for managing selections of a collection.
 * @param intitalSelections The initial selections of the collection.
 * @returns An object containing functions to update and clear selections.
 */
const useSelections = <T extends unknown = boolean>(
  intitalSelections?: InitialSelections<T>
) => {
  const selections = useRef(intitalSelections || {});

  /**
   * Updates a selection with the specified ID and value.
   * If the value is not provided or falsy, the selection with the given ID will be removed.
   * @param id The ID of the selection to update.
   * @param value The new value for the selection.
   */
  const updateSelection = (id: number, value?: T) => {
    console.log(id, value);
    if (selections.current[id] && !value) {
      delete selections.current[id];
    } else if (value) {
      selections.current[id] = value;
    }
  };

  /**
   * Clears all selections by resetting the selections to an empty object.
   */
  const clearSelections = () => {
    selections.current = {};
  };
  return { selections, updateSelection, clearSelections };
};

export default useSelections;
