import { FunctionComponent, useContext, useState } from "react";
import classes from "./UserInfoList.module.css";
import UserInfoContext from "../../../providers/UserInfo/UserInfo";
import UserInfo from "./UserInfo";
import UserInfoModal from "./UserInfoModal";
import { UserInfo as UserInfoType } from "@_types/database/userInfo";
import useAnimateModal from "@_hooks/animation/useAnimateModal";

interface UserInfoListProps {}

const UserInfoList: FunctionComponent<UserInfoListProps> = () => {
  const modal = useAnimateModal(300);
  const [selectedUserInfo, setSelectedUserInfo] = useState<
    ({ infoIdx: number } & UserInfoType) | null
  >(null);
  const ctx = useContext(UserInfoContext);

  let favIdx: number | null = null;

  const onSelectHandler = async (
    info: UserInfoType | null,
    infoIdx: number
  ) => {
    if (!info) setSelectedUserInfo(null);
    else setSelectedUserInfo({ ...info, infoIdx });
    modal.handleModal();
  };

  const onSubmitHandler = async (
    info: UserInfoType,
    infoIdx: number | null
  ) => {
    if (infoIdx) {
      const res = info.favorite
        ? await ctx.editInfo(info, infoIdx, favIdx)
        : await ctx.editInfo(info, infoIdx);
      if (info.favorite && res) favIdx = infoIdx;
      setSelectedUserInfo(null);
      modal.handleModal();
      return res;
    } else {
      const res = info.favorite
        ? await ctx.addInfo(info, favIdx)
        : await ctx.addInfo(info);
      if (info.favorite && res) favIdx = ctx.infos!.length - 1;
      setSelectedUserInfo(null);
      modal.handleModal();
      return res;
    }
  };

  return (
    <>
      <UserInfoModal
        modalProps={modal.getModalProps()}
        onSubmitHandler={onSubmitHandler}
        info={selectedUserInfo}
        infoIdx={selectedUserInfo ? selectedUserInfo.infoIdx : null}
      />

      <div className={classes.container}>
        <h1>Stored Information</h1>
        <button onClick={() => onSelectHandler(null, -1)}>
          Add Information
        </button>
        <ul>
          {ctx.infos?.map((info, idx) => {
            if (info.favorite) favIdx = idx;
            return (
              <UserInfo
                info={info}
                key={info.id}
                idx={idx}
                onSelectHandler={onSelectHandler}
                deleteHandler={ctx.deleteInfo}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default UserInfoList;
