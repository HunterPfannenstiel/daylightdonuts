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

export type InfoBar =
  | {
      renderInfoBar: true;
      infoParameterName: string;
      getInfoBarInfo: (() => Category[]) | (() => Promise<Category[]>);
      sticky?: boolean;
    }
  | {
      renderInfoBar: false;
      sticky: false;
    };

export type ExtraBar =
  | {
      renderExtraBar: true;
      extraParameterName: string;
    }
  | {
      renderExtraBar: false;
      sticky: false;
    };

export type Bar = InfoBar & ExtraBar;

export type URLInfo = {
  [p: string]: InfoBar & ExtraBar;
};
