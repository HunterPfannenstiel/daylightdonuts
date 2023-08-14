import { FunctionComponent, useEffect } from "react";
import classes from "./ValidatedInput.module.css";
import { ValidatedInput } from "@_hooks/form/useValidateInput";
import TextInput, { TextInputProps } from "./TextInput";
import { useNotification } from "@_providers/Notification/Notification";
import { concatClassNames } from "@_utils/client";

interface ValidatedInputProps extends TextInputProps {
  val: ValidatedInput;
  errorMessage?: string;
}

const ValidatedInput: FunctionComponent<ValidatedInputProps> = ({
  val,
  errorMessage,
  value,
  className,
  ...restProps
}) => {
  const { displayNotification } = useNotification();
  useEffect(() => {
    if (!val.isValid) {
      errorMessage && displayNotification(errorMessage, "error", 1000);
    }
  }, [val.isValid]);
  return (
    <TextInput
      className={concatClassNames(classes.input, className)}
      value={val.value}
      {...restProps}
    />
  );
};

export default ValidatedInput;
