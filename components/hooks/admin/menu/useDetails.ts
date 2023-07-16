import ModifyMenu from "custom-objects/ModifyMenu";
import { useRef } from "react";

export type UpdateDetails<T> = <K extends keyof T>(key: K, value: T[K]) => void;

/**
 * Hook for managing details of a specific entity.
 * @param initialDetails - The initial details object.
 * @returns An object contaning functions to update and retrieve details.
 */
const useDetails = <T extends Record<string, any>>(initialDetails: T) => {
  const details = useRef(initialDetails);

  /**
   *
   * @param key The key of the detail to update.
   * @param value The new value for the detail.
   */
  const updateDetails: UpdateDetails<T> = (key, value) => {
    details.current[key] = value;
  };

  /**
   * Retrieves the updated detail values.
   * @returns An object containing the updated detial values (if a specific detail value did not change it's value will be undefined).
   */
  const getUpdatedDetails = () => {
    const newValues = {} as { [K in keyof T]: undefined | T[K] };
    Object.keys(details.current).forEach((key) => {
      newValues[key as keyof T] = ModifyMenu.CompareVal(
        initialDetails[key],
        details.current[key]
      );
    });
    return newValues;
  };

  return { details, updateDetails, getUpdatedDetails };
};

export default useDetails;
