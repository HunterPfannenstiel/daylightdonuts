import { FormEvent, FunctionComponent, useRef, useState } from "react";
import classes from "./UserInfoModal.module.css";
import { UserInfo } from "@_types/database/userInfo";
import ModalDisplay from "components/ui/Reusable/Modal/ModalDisplay";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import TextInput from "components/ui/Reusable/Form/TextInput";
import SelectInput from "components/ui/Reusable/Form/SelectInput";
import Spinner from "@ui/Reusable/Spinner";
import { asyncTimeout } from "@_utils/timeout";

interface UserInfoModalProps {
  onSubmitHandler: (info: UserInfo) => Promise<boolean>;
  deleteHandler: (infoId: number) => Promise<void>;
  info: UserInfo | null;
  modalProps: ModalProps;
}

const UserInfoModal: FunctionComponent<UserInfoModalProps> = ({
  onSubmitHandler,
  deleteHandler,
  info,
  modalProps,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const formInputs = useRef({
    first_name: info ? info.first_name : "",
    last_name: info ? info.last_name : "",
    phone_number: info ? info.phone_number : "",
    favorite: info ? info.favorite : false,
    id: info ? info.id : -1,
  });

  const formInputHandler = (key: keyof UserInfo, value: any) => {
    formInputs.current[key] = value as never;
  };

  const submitHandler = async (event: FormEvent, del = false) => {
    event.preventDefault();
    setIsLoading(true);
    if (del) {
      const res = await deleteHandler(info!.id);
    } else {
      const res = await onSubmitHandler(formInputs.current);
    }
    setIsLoading(false);
  };

  return (
    <ModalDisplay
      {...modalProps}
      className={classes.modal}
      closeable={!isLoading}
    >
      {isLoading && <Spinner center />}
      <div className={classes.form_container}>
        <h1>{info ? "Edit User" : "Add User"}</h1>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.input_section}>
            <TextInput
              id="first"
              label="First Name:"
              handler={(value) => formInputHandler("first_name", value)}
              className={classes.text_field}
              defaultValue={formInputs.current.first_name}
              placeholder="Daylight"
              disabled={isLoading}
              required
            />
            <TextInput
              id="last"
              label="Last Name:"
              handler={(value) => formInputHandler("last_name", value)}
              className={classes.text_field}
              defaultValue={formInputs.current.last_name}
              placeholder="Donuts"
              disabled={isLoading}
              required
            />
          </div>
          <div className={classes.input_section}>
            <div className={classes.phone_section}>
              <TextInput
                id="phone"
                label="Phone:"
                inputType="tel"
                handler={(value) => formInputHandler("phone_number", value)}
                className={classes.text_field}
                defaultValue={formInputs.current.phone_number}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="xxx-xxx-xxxx"
                disabled={isLoading}
                required
              />
              <p className={classes.format}>Format: xxx-xxx-xxxx</p>
            </div>
            <SelectInput
              id="favorite"
              label="Favorite:"
              handler={(value) => formInputHandler("favorite", value)}
              className={classes.favorite}
              type="checkbox"
              defaultChecked={formInputs.current.favorite}
              disabled={isLoading}
            />
          </div>
          <div className={classes.buttons}>
            <button className={classes.submit_btn} disabled={isLoading}>
              Submit
            </button>
            {info && (
              <button
                onClick={(e) => submitHandler(e, true)}
                className={classes.del_btn}
                type="button"
                disabled={isLoading}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </ModalDisplay>
  );
};

export default UserInfoModal;
