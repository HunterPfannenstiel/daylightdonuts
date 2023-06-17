import {
  CategoryCustomizations,
  CategoryItemInfo,
  CategorySelections,
  DBEntity,
  NewCategorySubcategory,
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

export const createItemSubcategory = async (
  name: string,
  itemCategoryId: number,
  menuItemIds?: number[]
) => {
  const query = "CALL store.create_item_subcategory($1, $2, $3, NULL)";
  const res = await adminQuery(query, [
    name,
    itemCategoryId,
    menuItemIds || null,
  ]);
  return res.rows[0] as { new_id: number };
};

export const modifyItemSubcategory = async (
  itemCategoryId: number,
  name?: string,
  categoryId?: number,
  addMenuItemIds?: number[],
  removeMenuItemIds?: number[]
) => {
  const query = "CALL store.modify_item_subcategory($1, $2, $3, $4, $5)";
  await adminQuery(query, [
    itemCategoryId,
    name || null,
    categoryId === undefined ? null : categoryId,
    addMenuItemIds || null,
    removeMenuItemIds || null,
  ]);
};

export const createItemCategory = async (
  name: string,
  displayOrder?: number,
  newSubcategories?: NewCategorySubcategory[],
  itemInfos?: CategoryItemInfo[]
) => {
  const query = "CALL store.create_item_category($1, $2, $3, $4, NULL)";
  const res = await adminQuery(query, [
    name,
    displayOrder === undefined ? null : displayOrder,
    newSubcategories || null,
    itemInfos || null,
  ]);

  return res.rows[0] as { new_id: number };
};

export const modifyItemCategory = async (
  itemCategoryId: number,
  name?: string,
  displayOrder?: number,
  isActive?: boolean,
  newSubcategories?: NewCategorySubcategory[],
  removeSubcategoryIds?: number[],
  addItemInfos?: CategoryItemInfo[],
  removeItemIds?: number[]
) => {
  const query =
    "CALL store.modify_item_category($1, $2, $3, $4, $5, $6, $7, $8)";
  await adminQuery(query, [
    itemCategoryId,
    name || null,
    displayOrder === undefined ? null : displayOrder,
    isActive === undefined ? null : isActive,
    newSubcategories || null,
    removeSubcategoryIds || null,
    addItemInfos || null,
    removeItemIds || null,
  ]);
};
