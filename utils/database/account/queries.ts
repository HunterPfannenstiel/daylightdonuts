import { getServerSession } from "next-auth";
import { customerQuery } from "../connect";
import { NextApiRequest, NextApiResponse } from "next";
import { UserSession, UserToken } from "@_types/auth";
import { getSession } from "next-auth/react";
import {
  AddUserInfo,
  FetchedUserInfo,
  UserInfo,
  UserOrder,
} from "@_types/database/userInfo";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { checkRowLength } from "../admin/menu-queries/modify-item";

export const getAccountId = async (userEmail: string) => {
  const query = "SELECT * FROM store.get_user_id($1)";
  const res = await customerQuery(query, [userEmail]);
  return res.rows[0].get_user_id as number | null;
};

export const getUserInfo = async (accountId: number) => {
  const query = "SELECT * FROM store.get_user_infos($1)";
  const res = await customerQuery(query, [accountId]);
  checkRowLength(res);
  return { ...res.rows[0], isSignedIn: true } as FetchedUserInfo;
};

export const addUserInfo = async (accountId: number, info: AddUserInfo) => {
  const query = "CALL store.edit_user_info($1, $2, $3, $4, $5, $6)";
  const res = await customerQuery(query, [
    null,
    accountId,
    info.first_name,
    info.last_name,
    info.phone_number,
    info.favorite,
  ]);
  return res.rows[0].new_info_id as number;
};

export const deleteUserInfo = async (accountId: number, info_id: number) => {
  const query = "CALL store.edit_user_info($1, $2, $3, $4, $5, $6, $7, $8)";
  try {
    await customerQuery(query, [
      null,
      accountId,
      null,
      null,
      null,
      null,
      info_id,
      false,
    ]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const editUserInfo = async (accountId: number, info: UserInfo) => {
  const query = "CALL store.edit_user_info($1, $2, $3, $4, $5, $6, $7, $8)";
  await customerQuery(query, [
    null,
    accountId,
    info.first_name,
    info.last_name,
    info.phone_number,
    info.favorite,
    info.id,
    true,
  ]);
};

export const createAccount = async (email: string) => {
  const query = "CALL store.create_account($1, $2, $3)";
  const res = await customerQuery(query, [email, null, null]);
  return res.rows[0].id as number;
};

export const getAccountOrders = async (accountId: number) => {
  const query = "SELECT * FROM store.view_account_orders($1)";
  const res = await customerQuery(query, [accountId]);
  return res.rows as UserOrder[];
};

export const getAccountIdFromSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = (await getServerSession(req, res, authOptions)) as UserToken;
  if (session) return session.accountId;
  else return null;
};

export const getAccountSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = (await getServerSession(req, res, authOptions)) as UserToken;
  if (session) return session;
  else return null;
};

export const getUserRole = async (email: string) => {
  const query = "SELECT * FROM store.get_user_role($1)";
  const res = await customerQuery(query, [email]);
  return res.rows[0].role as "team member" | "owner" | "customer";
};
