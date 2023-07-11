import {
  AddUserInfo,
  FetchedUserInfo,
  UserInfo,
} from "@_types/database/userInfo";
import APIRequest from "custom-objects/Fetch";

export type UserInfoContext = {
  addInfo: (info: AddUserInfo, favIdx?: number | null) => Promise<boolean>;
  editInfo: (
    info: UserInfo,
    infoIdx: number,
    favIdx?: number | null
  ) => Promise<boolean>;
  deleteInfo: (infoIdx: number) => Promise<boolean>;
  isLoading: boolean;
} & FetchedUserInfo;

export const getInitialInfo = (): UserInfoContext => {
  return {
    infos: [],
    favorite_id: null,
    isSignedIn: false,
    async addInfo(info: AddUserInfo) {
      return false;
    },
    async editInfo(info: UserInfo, infoIdx: number) {
      return false;
    },
    async deleteInfo(id: number) {
      return false;
    },
    isLoading: true,
  };
};

export const fetchUserInfos = async () => {
  const { data, success, errorMessage } = await APIRequest.request<{
    info: FetchedUserInfo;
  }>("/api/account/fetch-info");
  if (!success) {
    console.error(errorMessage);
  }
  return data?.info;
};

export const addUserInfo = async (info: AddUserInfo) => {
  const res = await fetch("/api/account/edit-info", {
    method: "POST",
    body: JSON.stringify({ info }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const error = await res.json();
    console.log(error.message);
  }
  return (await res.json()) as number;
};

export const editUserInfo = async (info: UserInfo) => {
  const res = await fetch("/api/account/edit-info", {
    method: "PUT",
    body: JSON.stringify({ info }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const error = await res.json();
    console.log(error.message);
  }
  return res.ok;
};

export const deleteUserInfo = async (id: number) => {
  const res = await fetch("/api/account/edit-info?id=" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const error = await res.json();
    console.log(error.message);
  }
  return res.ok;
};
