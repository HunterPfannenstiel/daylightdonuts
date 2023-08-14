import { useRef } from "react";

export type InitialSelections<T extends unknown = boolean> = {
  [id: number]: T;
};

const copyInitialSelections = <T extends unknown = boolean>(
  initialSelections?: InitialSelections<T>
) => {
  if (!initialSelections) return {};
  return { ...initialSelections };
};

/**
 * Hook for managing selections of a collection.
 * @param intitalSelections The initial selections of the collection.
 * @returns An object containing functions to update and clear selections.
 */
const useSelections = <T extends unknown = boolean>(
  intitalSelections?: InitialSelections<T>
) => {
  const selections = useRef(copyInitialSelections(intitalSelections));

  /**
   * Updates a selection with the specified ID and value.
   * If the value is not provided or falsy, the selection with the given ID will be removed.
   * @param id The ID of the selection to update.
   * @param value The new value for the selection.
   */
  const updateSelection = (id: number, value?: T) => {
    if (selections.current[id] && !value) {
      delete selections.current[id];
    } else if (value) {
      selections.current[id] = value;
    }
  };

  /**
   * Deletes a selection with the specified ID.
   * @param id The ID of the selection to delete.
   */
  const deleteSelection = (id: number) => {
    delete selections.current[id];
  };

  /**
   * Clears all selections by resetting the selections to an empty object.
   */
  const clearSelections = () => {
    selections.current = {};
  };

  /**
   * Composes an array of values by applying the provided callback function to each selection.
   * @param cb The callback function to apply to each selection.
   * @param _selections The selections object to compose from. Defaults to the current selections object.
   * @returns An array of values obtained by applying the callback function to each selection.
   */
  const composeSelections = <U>(
    cb: (key: number, val: T) => U,
    _selections = selections.current
  ) => {
    if (_selections) {
      return Object.keys(_selections).map((key) => {
        return cb(+key, _selections[+key]);
      });
    }
    return [];
  };

  return [
    selections.current,
    {
      update: updateSelection,
      clear: clearSelections,
      delete: deleteSelection,
      compose: composeSelections,
    },
  ] as [
    InitialSelections,
    {
      update: (id: number, value?: T) => void;
      clear: () => void;
      delete: (id: number) => void;
      compose: <U>(
        cb: (key: number, val: T) => U,
        selections?: InitialSelections
      ) => U[];
    }
  ];
};

export default useSelections;
