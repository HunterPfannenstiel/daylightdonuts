import {
  LabelItem,
  TextObject,
  LabelSection,
  LabelBlock,
} from "@_types/admin/orders";

import { label, sectionHeader, sectionDetail } from "./label-sections";

const STARTING_X = 2.895;

export const buildLabelBlocks = (
  sections: LabelSection[],
  abbreviate: boolean,
  includeCategory: boolean
) => {
  const currentX = { x: STARTING_X };
  const textObjects: LabelBlock[] = sections.map((section) => {
    return {
      header: getCategoryObject(section.name, section.amount, currentX),
      breakdown: formatBreakdown(
        section.breakdown,
        abbreviate,
        includeCategory,
        currentX
      ),
    };
  });
  return textObjects;
};

const getCategoryObject = (
  category: string,
  amount: number,
  coordinate: { x: number }
): TextObject => {
  const obj = {
    string: `${category} - ${amount}`,
    x: coordinate.x,
  };
  coordinate.x += 0.234722;
  return obj;
};

const formatBreakdown = (
  breakdown: LabelItem[],
  abbreviate: boolean,
  includeCategory: boolean,
  coordinate: { x: number }
): TextObject[] => {
  return breakdown.map((info) => {
    if (!info.extras) {
      const obj = {
        string: `Plain: ${info.amount}`,
        x: coordinate.x,
        width: 0.2174954,
      };
      coordinate.x += 0.3;
      return obj;
    }
    let str = "";
    const filteredExtras = info.extras.filter(
      (extra) => extra.extra !== "None"
    );
    let extrasLen = filteredExtras.length;
    let currLineCharacters = 0;
    let lines = 1;
    filteredExtras.forEach((extra, i) => {
      let contentString = abbreviate
        ? extra.abbreviation || extra.extra
        : extra.extra;
      if (includeCategory) contentString += ` ${extra.category}`;
      if (i === extrasLen - 1) {
        contentString = `${contentString}: ${info.amount}`;
      } else {
        contentString += ", ";
      }
      if (contentString.length + currLineCharacters > 35) {
        str += `\n${contentString}`;
        currLineCharacters = contentString.length;
        lines++;
      } else {
        str += contentString;
        currLineCharacters += contentString.length;
      }
    });
    const obj = { string: str, x: coordinate.x, width: lines * 0.2174954 };
    coordinate.x += lines * 0.227722;
    return obj;
  });
};

export const getLabel = (
  storeName: string,
  customerName: string,
  date: string,
  time: string,
  labelBlocks: LabelBlock[],
  status?: string
) => {
  let textObjectsString = "";
  labelBlocks.forEach((labelBlock) => {
    textObjectsString += sectionHeader(
      labelBlock.header.string,
      labelBlock.header.x
    );
    labelBlock.breakdown.forEach((breakdown) => {
      textObjectsString += sectionDetail(
        breakdown.string,
        breakdown.x,
        breakdown.width
      );
    });
  });

  return window.dymo.label.framework.openLabelXml(
    label(storeName, customerName, date, time, status, textObjectsString)
  );
};
