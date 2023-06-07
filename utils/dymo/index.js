import label from "./label";
import { getLabel, header } from "./label-item-section";

export const previewLabel = () => {
  if (!dymo) throw new Error("Dymo is not loaded yet");
  const xmlLabel = dymo.label.framework.openLabelXml(label);
  xmlLabel.setObjectText("ITextObject0", "Rub some bacon on it");
  xmlLabel.setObjectText("ITextObject4", "Old Fashion - 24");
  return `data:image/png;base64,${xmlLabel.render()}`;
};

export const buildLabel = (labelCategories) => {
  const xVal = { nextX: 2.629444 };
  const textObjects = [];
  labelCategories.forEach((category) => {
    textObjects.push({
      ...getCategoryString(category, xVal),
      breakdown: category.breakdown.map((breakdown) =>
        getBreakdownItemString(breakdown, xVal)
      ),
    });
  });
  console.log(textObjects);
  const label = getLabel(textObjects);
  return `data:image/png;base64,${label.render()}`;
  //Get a xml header for each LabelCategory
  //Get a xml section for each breakdown item - 35 characters can fit on a line
};

//type TextObject = {
//  categoryString: string;
//  breakdownStrings: string[]
// }

const getCategoryString = (category, xVal) => {
  const obj = {
    string: `${category.name} - ${category.amount}`,
    x: xVal.nextX,
  };
  xVal.nextX += 0.38;
  return obj;
};

const getBreakdownItemString = (item, xVal) => {
  let str = "";
  let extrasLen = item.extras.length;
  let currLineCharacters = 0;
  let lines = 1;
  item.extras.forEach((extra, i) => {
    let currStr = "";
    if (i === extrasLen - 1) {
      currStr += `${extra.extra}: ${item.amount}`;
    } else {
      currStr = `${extra.extra}, `;
    }
    if (currStr.length + currLineCharacters > 35) {
      str += `\n${currStr}`;
      currLineCharacters = currStr.length;
      lines++;
    } else {
      str += currStr;
      currLineCharacters += currStr.length;
    }
  });
  const obj = { string: str, x: xVal.nextX };
  xVal.nextX += lines * 0.3;
  return obj;
};

{
  /* <DYMOPoint>
<X>3.011122</X>
<Y>0.07166624</Y>
</DYMOPoint> */
}

//Need to find the 'X' coordinate for each text object
//This will also let us know if we need more than one label
//The 'X' value represents inches from the top of the label
//16pt font is 1/4 of an inch

//Hold a global value 'next X' which holds the next available X coordinate
//A category will add 0.38
//A breakdown item will add 0.25
//Adding a line to 'getBreakdownItemString' will add 0.25 to this value

// export type LabelCategory = {
//     categoryName: string; //item name
//     amount: number;
//     breakdown: LabelItem[];
//   };

//   type LabelItem = {
//     extras: Extra[];
//     amount: number;
//   };
