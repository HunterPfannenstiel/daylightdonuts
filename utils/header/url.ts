import {
  Category,
  ExtraBar,
  InfoBar,
  URLInfo as URLInfoT,
} from "@_types/header";

export const findURLInfo = (pathName: string | null): InfoBar & ExtraBar => {
  return pathName
    ? URLInfo[pathName] || {
        renderInfoBar: false,
        renderExtraBar: false,
      }
    : {
        renderInfoBar: false,
        sticky: false,
        renderExtraBar: false,
      };
};

const URLInfo: URLInfoT = {
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
      return data as Category[];
    },
    sticky: true,
    renderExtraBar: true,
    extraParameterName: "filter",
  },

  "/checkout": {
    renderInfoBar: true,
    sticky: false,
    infoParameterName: "page",
    getInfoBarInfo: () => {
      return [
        {
          category: "Your Order",
          subcategories: [null],
        },
        { category: "Payment", subcategories: [null] },
      ];
    },
    renderExtraBar: false,
  },
};

export const getPageName = (pathName: string | null) => {
  return pathName ? pageNames[pathName] || "Daylight" : "Daylight";
};

const pageNames: { [p: string]: string } = {
  "/menu": "Menu",
  "/menu/[item]": "Menu",
  "/checkout": "Checkout",
};
