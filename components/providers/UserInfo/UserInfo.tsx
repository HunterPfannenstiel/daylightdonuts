import { createContext, useEffect, useState } from "react";
import { FunctionComponent } from "react";
import {
  getInitialInfo,
  fetchUserInfos,
  addUserInfo,
  deleteUserInfo,
  editUserInfo,
} from "./util";
import {
  AddUserInfo,
  FetchedUserInfo,
  UserInfo,
} from "@_types/database/userInfo";
import { useCheckoutInfo } from "@_providers/Checkout/CheckoutInfo";

const Context = createContext(getInitialInfo());

export default Context;

export const AuthContextProvider: FunctionComponent<
  React.PropsWithChildren
> = ({ children }) => {
  const [infoArray, setInfoArray] = useState<UserInfo[] | null | undefined>([]);
  const [favoriteId, setFavoriteId] = useState<number | null>(null);
  const { initializeUserInfo } = useCheckoutInfo();

  useEffect(() => {
    const fetchInfo = async () => {
      const infos = (await fetchUserInfos()) as FetchedUserInfo;
      setInfoArray(infos?.infos);
      setFavoriteId(infos?.favorite_id);
      initializeUserInfo(infos.infos || [], infos?.favorite_id || -1, "");
    };
    fetchInfo();
  }, []);

  const addInfoHandler = async (info: AddUserInfo, favIdx?: number | null) => {
    const addedId = await addUserInfo(info);
    if (addedId !== -1) {
      setInfoArray((prev) => {
        if (prev) {
          const res = [...prev];
          if (favIdx && favIdx < infoArray!.length)
            res[favIdx].favorite = false;
          res.push({ ...info, id: addedId });
          setFavoriteId(addedId);
          return res;
        } else return [{ ...info, id: addedId }];
      });
    }
    return addedId !== -1;
  };

  const editInfoHandler = async (
    info: UserInfo,
    infoIdx: number,
    favIdx?: number | null
  ) => {
    const isEdited = await editUserInfo(info);
    if (isEdited) {
      setInfoArray((prev) => {
        const copy = [...prev!];
        if (favIdx && favIdx < infoArray!.length) copy[favIdx].favorite = false;
        copy[infoIdx] = info;
        setFavoriteId(info.id);
        return copy;
      });
    }
    return isEdited;
  };

  const deleteInfoHandler = async (infoIdx: number) => {
    if (!infoArray) return false;
    const isDeleted = await deleteUserInfo(infoArray[infoIdx].id);
    if (isDeleted) {
      setInfoArray((prev) => {
        const copy = [...prev!];
        copy.splice(infoIdx, 1);
        return copy;
      });
    }
    return isDeleted;
  };

  /* const { data } = useQuery<FetchedUserInfo>({
		queryKey: ['userInfos'],
		queryFn: fetchUserInfos,
	}); */

  return (
    <Context.Provider
      value={{
        infos: infoArray ? infoArray : null,
        favorite_id: favoriteId,
        isSignedIn: infoArray ? true : false,
        addInfo: addInfoHandler,
        editInfo: editInfoHandler,
        deleteInfo: deleteInfoHandler,
      }}
    >
      {children}
    </Context.Provider>
  );
};
