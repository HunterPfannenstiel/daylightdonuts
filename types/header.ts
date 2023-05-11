export type Category = {
  category: string;
  subcategories: string[] | [null];
};

type DBCategory = {
  [p: string]: number;
};

export type Subcategories = string[];

export type DBCategories = {
  categories: DBCategory[];
};

type InfoBar =
  | {
      renderInfoBar: true;
      infoParameterName: string;
      getInfoBarInfo: (() => Category) | (() => Promise<Category>);
      sticky?: boolean;
    }
  | {
      renderInfoBar: false;
      sticky: false;
    };

type ExtraBar =
  | {
      renderExtraBar: true;
      extraParameterName: string;
      getExtraBarInfo:
        | ((category: number | null) => Subcategories)
        | ((category: number | null) => Promise<Subcategories>);
    }
  | {
      renderExtraBar: false;
      sticky: false;
    };

export type Bar = InfoBar & ExtraBar;

export type URLInfo = {
  [p: string]: InfoBar & ExtraBar;
};
