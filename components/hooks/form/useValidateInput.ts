import { Dispatch, SetStateAction, useState } from "react";

export type ValidatedInput = {
  value: string;
  isValid: boolean;
};

type ValidatedValues<T extends string> = { [key in T]: ValidatedInput };

const useValidateInput = <T extends string>(
  keys: T[],
  initialValues?: ValidatedValues<T>
) => {
  const [values, setValues] = useState(
    initialValues || getInitialInput.bind(null, keys)
  );

  const updateValue = (key: T, value: string, isValid = true) => {
    setValues((prevInfo) => {
      return { ...prevInfo, [key]: { value, isValid } };
    });
  };

  return [values, { update: updateValue, set: setValues }] as [
    ValidatedValues<T>,
    {
      update: (key: T, value: string, isValid?: boolean) => void;
      set: Dispatch<SetStateAction<ValidatedValues<string>>>;
    }
  ];
};

export default useValidateInput;

const getInitialInput = <T extends string>(keys: T[]) => {
  const values = {} as ValidatedValues<T>;
  keys.forEach((key) => {
    values[key] = { value: "", isValid: true };
  });
  return values;
};
