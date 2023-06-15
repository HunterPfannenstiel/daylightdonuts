import {
  CategoryCustomizations,
  CategorySelections,
  DBEntity,
  InitialSelections,
  SubcategoryCustomizations,
  SubcategorySelections,
} from "@_types/admin/modify-menu";
import { adminQuery } from "@_utils/database/connect";
import { checkRowLength } from "./modify-item";

export const viewItemSubcategories = async () => {
  const query = "SELECT * FROM store.view_item_subcategories()";
  const res = await adminQuery(query);
  return res.rows as DBEntity[];
};

export const fetchItemSubcategoryCustomizations = async () => {
  const query = "SELECT * FROM store.fetch_item_subcategory_customizations()";
  const res = await adminQuery(query);
  checkRowLength(res);
  return res.rows[0] as SubcategoryCustomizations;
};

export const fetchItemSubcategorySelections = async (subcategoryId: number) => {
  const query = "SELECT * FROM store.fetch_item_subcategory_selections($1)";
  const res = await adminQuery(query, [subcategoryId]);
  checkRowLength(res);
  return res.rows[0] as SubcategorySelections;
};

export const viewMenuItemsInCategory = async (categoryId: number) => {
  const query = "SELECT * FROM store.view_menu_items_in_category($1)";
  const res = await adminQuery(query, [categoryId]);
  return res.rows as DBEntity[];
};

export const viewItemCategories = async () => {
  const query = "SELECT * FROM store.view_item_categories()";
  const res = await adminQuery(query);
  return res.rows as DBEntity[];
};

export const fetchItemCategoryCustomizations = async (pageSize = 10) => {
  const query = "SELECT * FROM store.fetch_item_category_customizations($1)";
  const res = await adminQuery(query, [pageSize]);
  checkRowLength(res);
  return res.rows[0] as CategoryCustomizations;
};

export const fetchItemCategorySelections = async (categoryId: number) => {
  const query = "SELECT * FROM store.fetch_item_category_selections($1)";
  const res = await adminQuery(query, [categoryId]);
  checkRowLength(res);
  return res.rows[0] as CategorySelections;
};
