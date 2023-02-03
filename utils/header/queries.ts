import { Category, DBCategories, Subcategories } from "@_types/header";
import { customerParamQuery, customerQuery } from "@_utils/database/connect";

export const getAllItemCategories = async (): Promise<Category> => {
  const dbCategories = (await customerQuery(
    "SELECT json_agg(json_build_object(name, item_category_id)) AS categories FROM item_category;"
  )) as DBCategories[];
  console.log(dbCategories);
  let categories = { All: null };
  dbCategories[0].categories.forEach((category) => {
    categories = { ...categories, ...category };
  });
  return { ...categories, Dozenable: null };
};

export const getAllSubcategories = async (
  category: string
): Promise<Subcategories> => {
  const dbSubcategories = (await customerParamQuery(
    "SELECT array_agg(name) AS names from item_subcategory WHERE item_category_id = $1",
    [category]
  )) as [{ names: Subcategories }];
  if (dbSubcategories[0].names) {
    return ["All", ...dbSubcategories[0].names];
  } else {
    return [];
  }
};
