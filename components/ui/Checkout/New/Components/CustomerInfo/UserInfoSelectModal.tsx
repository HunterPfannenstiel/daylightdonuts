import { FunctionComponent } from "react";
import classes from "./UserInfoSelectModal.module.css";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import ModalDisplay from "@ui/Reusable/Modal/ModalDisplay";
import UserInfoList from "@ui/Reusable/UserInfo/UserInfoList";
import { UserInfo } from "@_types/database/userInfo";

interface UserInfoSelectModalProps {
  modalProps: ModalProps;
  selectedId?: number;
  infoSelected: (info: UserInfo) => void;
}

const UserInfoSelectModal: FunctionComponent<UserInfoSelectModalProps> = ({
  modalProps,
  selectedId,
  infoSelected,
}) => {
  return (
    <ModalDisplay {...modalProps} className={classes.container}>
      <h1 className={classes.title}>Select Information</h1>
      <UserInfoList
        onSelectHandler={infoSelected}
        showPhoneNumber
        selectedId={selectedId}
      />
    </ModalDisplay>
  );
};

export default UserInfoSelectModal;
