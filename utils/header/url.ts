import { Category, Subcategories, URLInfo } from "@_types/header";

export const findURLInfo = (pathName: string) => {
  return (
    URLInfo[pathName] || {
      renderInfoBar: false,
      renderExtraBar: false,
    }
  );
};

const URLInfo: URLInfo = {
  "/menu/[item]": {
    renderInfoBar: false,
    sticky: false,
    renderExtraBar: false,
  },

  "/menu": {
    renderInfoBar: true,
    infoParameterName: "category",
    getInfoBarInfo: async () => {
      const response = await fetch("/api/menu/categories");
      const data = await response.json();
      return data as Category;
    },
    sticky: true,
    renderExtraBar: true,
    extraParameterName: "filter",
    getExtraBarInfo: async (category: number | null) => {
      if (category) {
        const response = await fetch(
          `/api/menu/categories?category=${category}`
        );
        const data = await response.json();
        return data as Subcategories;
      } else {
        return [];
      }
    },
  },

  "/checkout": {
    renderInfoBar: true,
    sticky: false,
    infoParameterName: "page",
    getInfoBarInfo: () => {
      return {
        "Your Order": null,
        Payment: null,
      };
    },
    renderExtraBar: false,
  },
};

export const getPageName = (pathName: string) => {
  return pageNames[pathName] || "Daylight";
};

const pageNames: { [p: string]: string } = {
  "/menu": "Menu",
  "/menu/[item]": "Menu",
  "/checkout": "Checkout",
};
