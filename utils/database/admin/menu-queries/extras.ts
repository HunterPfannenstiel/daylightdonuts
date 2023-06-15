import {
  CategoryExtras,
  DBEntity,
  ExtraCustomizations,
  ExtraGroup,
  ExtraGroupCustomizations,
  ExtraGroupSelections,
  ExtraSelections,
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
