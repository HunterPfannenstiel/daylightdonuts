import { FunctionComponent, useContext } from "react";
import classes from "./UserInfoList.module.css";
import UserInfoContext from "../../../providers/UserInfo/UserInfo";
import UserInfo from "./UserInfo";
import { concatClassNames } from "@_utils/client";

interface UserInfoListProps {
  onSelectHandler: (info: UserInfo) => void;
  showPhoneNumber?: boolean;
  editable?: boolean;
  selectedId?: number;
  className?: string;
}

const UserInfoList: FunctionComponent<UserInfoListProps> = ({
  onSelectHandler,
  showPhoneNumber,
  editable = false,
  selectedId,
  className,
}) => {
  const ctx = useContext(UserInfoContext);

  return (
    <>
      <ul className={concatClassNames(classes.info_list, className)}>
        {ctx.infos?.map((info) => {
          return (
            <UserInfo
              info={info}
              key={info.id}
              onSelectHandler={onSelectHandler}
              editable={editable}
              selectedId={selectedId}
              showPhoneNumber={showPhoneNumber}
            />
          );
        })}
        {!ctx.infos?.length && (
          <p className={classes.no_info_text}>
            You have no user information stored!
          </p>
        )}
      </ul>
    </>
  );
};

export default UserInfoList;
