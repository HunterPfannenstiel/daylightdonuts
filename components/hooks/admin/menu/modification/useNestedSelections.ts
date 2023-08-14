import { useRef } from "react";
import { InitialSelections } from "./useSelections";

export type NestedSelections<T extends unknown = boolean> = {
  [categoryId: number]: InitialSelections<T>;
};

const copyNestedSelections = <T extends unknown = boolean>(
  selections: NestedSelections<T>
) => {
  const copy: NestedSelections<T> = {};
  Object.keys(selections).map((category) => {
    copy[+category] = { ...selections[+category] };
  });
  return copy;
};

/**
 * Hook for managing selections of a collection with multiple categories.
 * @param initialSelections The initial selections of the collection.
 * @returns An array containing functions to access and update the selections.
 */
const useNestedSelections = <T extends unknown = boolean>(
  initialSelections?: NestedSelections<T>
) => {
  const selections = useRef<NestedSelections<T>>(
    copyNestedSelections(initialSelections || {})
  );

  /**
   * Updates a category selection with the specified category ID, ID and value.
   * @param categoryId The ID of the category to update.
   * @param id The ID of the selection to update.
   */
  const updateSelection = (categoryId: number, id: number, value?: T) => {
    if (selections.current[categoryId]) {
      if (selections.current[categoryId][id]) {
        delete selections.current[categoryId][id];
      } else if (value) {
        selections.current[categoryId][id] = value;
      }
    } else if (value) {
      selections.current[categoryId] = { [id]: value };
    }
  };

  return [selections.current, updateSelection] as [
    NestedSelections,
    (categoryId: number, id: number, value?: T) => void
  ];
};

export default useNestedSelections;
