import {
  CategoryExtras,
  DBEntity,
  ExtraCustomizations,
  ExtraGroup,
  ExtraGroupCustomizations,
  ExtraGroupExtraInfo,
  ExtraGroupInfo,
  ExtraGroupSelections,
  ExtraSelections,
  NewExtraCategoryExtra,
} from "@_types/admin/modify-menu";
import { adminQuery } from "@_utils/database/connect";
import { checkRowLength } from "./modify-item";

export const viewExtras = async () => {
  const query = "SELECT * FROM store.view_extras()";
  const res = await adminQuery(query);
  return res.rows as CategoryExtras[];
};

export const fetchExtraCustomizations = async () => {
  const query = "SELECT * FROM store.fetch_extra_customizations()";
  const res = await adminQuery(query);
  checkRowLength(res);
  return res.rows[0] as ExtraCustomizations;
};

export const fetchExtraSelections = async (extraId: number) => {
  const query = "SELECT * FROM store.fetch_extra_selections($1)";
  const res = await adminQuery(query, [extraId]);
  checkRowLength(res);
  return res.rows[0] as ExtraSelections;
};

export const viewExtraGroups = async () => {
  const query = "SELECT * FROM store.view_extra_groups()";
  const res = await adminQuery(query);
  checkRowLength(res);
  return res.rows as ExtraGroup[];
};

//also use pages for viewing extras
export const fetchExtraGroupCustomizations = async (pageSize = 10) => {
  const query = "SELECT * FROM store.fetch_extra_group_customizations($1)";
  const res = await adminQuery(query, [pageSize]);
  return res.rows[0] as ExtraGroupCustomizations;
};

export const fetchExtraGroupSelections = async (extraGroupId: number) => {
  const query = "SELECT * FROM store.fetch_extra_group_selections($1)";
  const res = await adminQuery(query, [extraGroupId]);
  checkRowLength(res);
  return res.rows[0] as ExtraGroupSelections;
};

export const viewExtraCategories = async () => {
  const query = "SELECT * FROM store.view_extra_categories()";
  const res = await adminQuery(query);
  return res.rows as DBEntity[];
};

export type CreateExtra = {
  name: string;
  price: string;
  categoryId: number;
  groupInfo?: ExtraGroupInfo[];
  abbreviation?: string;
};

export const createExtra = async (info: CreateExtra) => {
  const groupInfo = info.groupInfo ? JSON.stringify(info.groupInfo) : null;
  const query = "CALL store.create_extra($1, $2, $3, $4, $5, NULL)";
  const res = await adminQuery(query, [
    info.name,
    info.price,
    groupInfo,
    info.categoryId,
    info.abbreviation || null,
  ]);

  return res.rows[0] as { new_extra_id: number };
};

export type ModifyExtra = {
  extraId: number;
  name?: string;
  price?: string;
  groupInfo?: ExtraGroupInfo[];
  removeGroupIds?: number[];
  categoryId?: number;
  abbreviation?: string;
  archived?: boolean;
};

export const modifyExtra = async (info: ModifyExtra) => {
  const query = "CALL store.modify_extra($1, $2, $3, $4, $5, $6, $7, $8)";
  await adminQuery(query, [
    info.extraId,
    info.name || null,
    info.price || null,
    info.groupInfo || null,
    info.removeGroupIds || null,
    info.categoryId === undefined ? null : info.categoryId,
    info.abbreviation || null,
    info.archived === undefined ? null : info.archived,
  ]);
};

export const createExtraGroup = async (
  name: string,
  categoryId: number,
  extrasInfo?: ExtraGroupExtraInfo[],
  menuItemIds?: number[]
) => {
  const query = "CALL store.create_extra_group($1, $2, $3, $4 NULL)";
  const res = await adminQuery(query, [
    name,
    extrasInfo || null,
    categoryId,
    menuItemIds || null,
  ]);
  return res.rows[0] as { new_group_id: number };
};

export const modifyExtraGroup = async (
  extraGroupId: number,
  name?: string,
  categoryId?: number,
  extrasInfo?: ExtraGroupExtraInfo[],
  removeExtraIds?: number[],
  addMenuItemIds?: number[],
  removeMenuItemIds?: number[]
) => {
  const query = "CALL store.modify_extra_group($1, $2, $3, $4, $5, $6, $7)";
  await adminQuery(query, [
    extraGroupId,
    name || null,
    extrasInfo || null,
    removeExtraIds || null,
    categoryId === undefined ? null : categoryId,
    addMenuItemIds || null,
    removeMenuItemIds || null,
  ]);
};

export const createExtraCategory = async (
  name: string,
  newExtras?: NewExtraCategoryExtra[],
  addExtraIds?: number[]
) => {
  const query = "CALL store.create_extra_category($1, $2, $3, NULL)";
  const res = await adminQuery(query, [
    name,
    newExtras || null,
    addExtraIds || null,
  ]);
  return res.rows[0] as { new_id: number };
};

export const modifyExtraCategory = async (
  extraCategoryId: number,
  newExtras?: NewExtraCategoryExtra[],
  addExtraIds?: number[],
  changeExtraIds?: { extraId: number; categoryId: number }[]
) => {
  const query = "CALL store.modify_extra_category($1, $2, $3, $4)";
  await adminQuery(query, [
    extraCategoryId,
    newExtras || null,
    addExtraIds || null,
    changeExtraIds || null,
  ]);
};
