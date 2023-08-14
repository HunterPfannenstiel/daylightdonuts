import {
  CategoryCustomizations,
  CategoryItemInfo,
  CategorySelections,
  DBEntity,
  DisplayOrderItem,
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

export type CreateItemSubcategory = {
  name: string;
  itemCategoryId: number;
  menuItemIds?: number[];
};

export const createItemSubcategory = async (info: CreateItemSubcategory) => {
  const query = "CALL store.create_item_subcategory($1, $2, $3, NULL)";
  const res = await adminQuery(query, [
    info.name,
    info.itemCategoryId,
    info.menuItemIds || null,
  ]);
  return res.rows[0] as { new_id: number };
};

export type ModifyItemSubcategory = {
  itemSubcategoryId: number;
  name?: string;
  categoryId?: number;
  addMenuItemIds?: number[];
  removeMenuItemIds?: number[];
};

export const modifyItemSubcategory = async (info: ModifyItemSubcategory) => {
  const query = "CALL store.modify_item_subcategory($1, $2, $3, $4, $5)";
  await adminQuery(query, [
    info.itemSubcategoryId,
    info.name || null,
    info.categoryId === undefined ? null : info.categoryId,
    info.addMenuItemIds || null,
    info.removeMenuItemIds || null,
  ]);
};

export type CreateItemCategory = {
  name: string;
  displayOrder: number;
  categoryDisplayOrders: DisplayOrderItem[];
  newSubcategories?: NewCategorySubcategory[];
  itemInfos?: CategoryItemInfo[];
  categoryItemIds: number[];
};

export const createItemCategory = async (info: CreateItemCategory) => {
  const query = "CALL store.create_item_category($1, $2, $3, $4, $5, $6, NULL)";
  const res = await adminQuery(query, [
    info.name,
    info.displayOrder,
    JSON.stringify(info.categoryDisplayOrders),
    info.newSubcategories ? JSON.stringify(info.newSubcategories) : null,
    info.itemInfos ? JSON.stringify(info.itemInfos) : null,
    info.categoryItemIds,
  ]);

  return res.rows[0] as { new_id: number };
};

export type ModifyItemCategory = {
  itemCategoryId: number;
  name?: string;
  displayOrder?: number;
  isActive?: boolean;
  newSubcategories?: NewCategorySubcategory[];
  removeSubcategoryIds?: number[];
  categoryDisplayOrders: DisplayOrderItem[];
  addItemInfos?: CategoryItemInfo[];
  removeItemInfos?: CategoryItemInfo[];
  removeItemIds?: number[];
  addItemIds?: number[];
};

export const modifyItemCategory = async (info: ModifyItemCategory) => {
  const query =
    "CALL store.modify_item_category($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
  await adminQuery(query, [
    info.itemCategoryId,
    info.name || null,
    info.displayOrder === undefined ? null : info.displayOrder,
    info.isActive === undefined ? null : info.isActive,
    JSON.stringify(info.categoryDisplayOrders),
    info.newSubcategories ? JSON.stringify(info.newSubcategories) : null,
    info.removeSubcategoryIds || null,
    info.addItemInfos ? JSON.stringify(info.addItemInfos) : null,
    info.removeItemInfos ? JSON.stringify(info.removeItemInfos) : null,
    info.addItemIds || null,
    info.removeItemIds || null,
  ]);
};
