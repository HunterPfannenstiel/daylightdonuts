import { FunctionComponent, useState } from "react";
import classes from "./index.module.css";
import CheckoutContainer from "../../CheckoutContainer";
import CheckoutTextInput from "components/ui/Reusable/Form/CheckoutTextInput";
import { CustomerFormInfo } from "@_types/database/checkout";
import Button from "components/ui/Reusable/Button";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import UserInfoSelectModal from "./UserInfoSelectModal";
import { UserInfo } from "@_types/database/userInfo";
import { ValidatedInput as InputVal } from "@_hooks/form/useValidateInput";
import ValidatedInput from "@ui/Reusable/Form/ValidatedInput";

interface CustomerInfoProps {
  updateInfo: (key: keyof CustomerFormInfo, value: string) => void;
  first_name: InputVal;
  last_name: InputVal;
  phone_number: InputVal;
  email: InputVal;
}

const CustomerInfo: FunctionComponent<CustomerInfoProps> = ({
  updateInfo,
  first_name,
  last_name,
  phone_number,
  email,
}) => {
  const modalProps = useAnimateModal(300);
  const [selectedInfo, setSelectedInfo] = useState<UserInfo>();

  return (
    <>
      {modalProps.showModal && (
        <UserInfoSelectModal
          modalProps={modalProps.getModalProps()}
          selectedInfo={selectedInfo}
          infoSelected={setSelectedInfo}
        />
      )}
      <CheckoutContainer header="Contact Information">
        <Button
          className={classes.info_button}
          onClick={modalProps.handleModal}
        >
          Select Stored Information
        </Button>
        <div className={classes.inputs}>
          <div className={classes.name}>
            <ValidatedInput
              val={first_name}
              label="First Name*"
              handler={(firstName) => {
                updateInfo("first_name", firstName);
              }}
              placeholder="Daylight"
            />
            <ValidatedInput
              val={last_name}
              label="Last Name*"
              handler={(lastName) => {
                updateInfo("last_name", lastName);
              }}
              placeholder="Donuts"
            />
          </div>
          <ValidatedInput
            val={phone_number}
            label="Phone Number*"
            handler={(phoneNumber) => {
              updateInfo("phone_number", phoneNumber);
            }}
            placeholder="#"
            type="tel"
          />
          <ValidatedInput
            val={email}
            label="Email*"
            handler={(email) => {
              updateInfo("email", email);
            }}
            errorMessage="Invalid Email"
            type="email"
            placeholder="daylightdonuts@gmail.com"
          />
        </div>
      </CheckoutContainer>
    </>
  );
};

export default CustomerInfo;
