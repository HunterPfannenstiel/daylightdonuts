import { Category } from "@_types/header";
import { customerQuery } from "@_utils/database/connect";

export const getAllItemCategories = async (): Promise<Category[]> => {
  const query = "SELECT * FROM store.fetch_categories()";
  const res = await customerQuery(query);
  let categories = res.rows as Category[];
  categories = categories.map((category) => {
    if (category.subcategories[0] !== null)
      category.subcategories = ["All", ...category.subcategories] as string[];
    return category;
  });
  categories = [
    { category: "All", subcategories: [null] },
    ...categories,
    { category: "Dozenable", subcategories: [null] },
  ];
  return categories;
};
