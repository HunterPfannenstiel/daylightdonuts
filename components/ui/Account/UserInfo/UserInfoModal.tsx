import { FormEvent, FunctionComponent, useRef } from "react";
import classes from "./UserInfoModal.module.css";
import { AddUserInfo, UserInfo } from "@_types/database/userInfo";
import ModalDisplay from "components/ui/Reusable/Modal/ModalDisplay";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import TextInput from "components/ui/Reusable/Form/TextInput";
import SelectInput from "components/ui/Reusable/Form/SelectInput";

interface UserInfoModalProps {
  onSubmitHandler: (info: UserInfo, infoIdx: number | null) => Promise<boolean>;
  deleteHandler: (id: number) => Promise<boolean>;
  info: UserInfo | null;
  infoIdx: number | null;
  modalProps: ModalProps;
}

const UserInfoModal: FunctionComponent<UserInfoModalProps> = ({
  onSubmitHandler,
  deleteHandler,
  info,
  infoIdx,
  modalProps,
}) => {
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

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const success = await onSubmitHandler(formInputs.current, infoIdx);
    /* if (success) {
			firstNameRef.current!.value = '';
			lastNameRef.current!.value = '';
			phoneNumberRef.current!.value = '';
			favoriteRef.current!.checked = false;
			console.log('It worked!');
		} else {
			console.log('There was an error!');
		} */
  };

  return (
    <ModalDisplay {...modalProps} className={classes.modal}>
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
              required
            />
            <TextInput
              id="last"
              label="Last Name:"
              handler={(value) => formInputHandler("last_name", value)}
              className={classes.text_field}
              defaultValue={formInputs.current.last_name}
              required
            />
          </div>
          <div className={classes.input_section}>
            <TextInput
              id="phone"
              label="Phone:"
              inputType="tel"
              handler={(value) => formInputHandler("phone_number", value)}
              className={classes.text_field}
              defaultValue={formInputs.current.phone_number}
              required
            />
            <SelectInput
              id="favorite"
              label="Favorite:"
              handler={(value) => formInputHandler("favorite", value)}
              className={classes.field}
              type="checkbox"
              defaultChecked={formInputs.current.favorite}
            />
          </div>
          <div className={classes.buttons}>
            <button className={classes.submit_btn}>Submit</button>
            {infoIdx !== null && (
              <button
                onClick={deleteHandler.bind(this, infoIdx)}
                className={classes.del_btn}
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
