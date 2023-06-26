import {
  CategoryExtras,
  DBEntity,
  ExtraCategoryCustomizations,
  ExtraCategorySelections,
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

export const fetchExtraCategoryCustomizations = async () => {
  const query = "SELECT * FROM store.fetch_extra_category_customizations()";
  const res = await adminQuery(query);
  return res.rows as ExtraCategoryCustomizations;
};

export const fetchExtraCategorySelections = async (extraCategoryId: number) => {
  const query = "SELECT * FROM store.fetch_extra_category_selections($1)";
  const res = await adminQuery(query, [extraCategoryId]);
  checkRowLength(res);
  return res.rows[0] as ExtraCategorySelections;
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
    !!info.groupInfo ? JSON.stringify(info.groupInfo) : null,
    info.removeGroupIds || null,
    info.categoryId === undefined ? null : info.categoryId,
    info.abbreviation || null,
    info.archived === undefined ? null : info.archived,
  ]);
};

export type CreateExtraGroup = {
  name: string;
  categoryId: number;
  extrasInfo?: ExtraGroupExtraInfo[];
  menuItemIds?: number[];
};

export const createExtraGroup = async (info: CreateExtraGroup) => {
  const query = "CALL store.create_extra_group($1, $2, $3, $4, NULL)";
  const res = await adminQuery(query, [
    info.name,
    info.extrasInfo ? JSON.stringify(info.extrasInfo) : null,
    info.categoryId,
    info.menuItemIds || null,
  ]);
  return res.rows[0] as { new_group_id: number };
};

export type ModifyExtraGroup = {
  extraGroupId: number;
  name?: string;
  categoryId?: number;
  extrasInfo?: ExtraGroupExtraInfo[];
  removeExtraIds?: number[];
  addMenuItemIds?: number[];
  removeMenuItemIds?: number[];
};

export const modifyExtraGroup = async (info: ModifyExtraGroup) => {
  const query = "CALL store.modify_extra_group($1, $2, $3, $4, $5, $6, $7)";
  await adminQuery(query, [
    info.extraGroupId,
    info.name || null,
    info.extrasInfo ? JSON.stringify(info.extrasInfo) : null,
    info.removeExtraIds || null,
    info.categoryId === undefined ? null : info.categoryId,
    info.addMenuItemIds || null,
    info.removeMenuItemIds || null,
  ]);
};

export type CreateExtraCategory = {
  name: string;
  newExtras?: NewExtraCategoryExtra[];
  addExtraIds?: number[];
};

export const createExtraCategory = async (info: CreateExtraCategory) => {
  const query = "CALL store.create_extra_category($1, $2, $3, NULL)";
  const res = await adminQuery(query, [
    info.name,
    info.newExtras ? JSON.stringify(info.newExtras) : null,
    info.addExtraIds || null,
  ]);
  return res.rows[0] as { new_id: number };
};

export type ModifyExtraCategory = {
  extraCategoryId: number;
  name?: string;
  newExtras?: NewExtraCategoryExtra[];
  addExtraIds?: number[];
  changeExtraIds?: { extraId: number; categoryId: number }[];
};

export const modifyExtraCategory = async (info: ModifyExtraCategory) => {
  const query = "CALL store.modify_extra_category($1, $2, $3, $4, $5)";
  await adminQuery(query, [
    info.extraCategoryId,
    info.name || null,
    info.newExtras ? JSON.stringify(info.newExtras) : null,
    info.addExtraIds || null,
    info.changeExtraIds || null,
  ]);
};
