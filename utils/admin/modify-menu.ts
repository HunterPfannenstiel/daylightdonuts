import { ItemDateRange, NewDBItem } from "@_types/admin/forms";
import { parseUndefinedToNull } from "..";
import { NextApiResponse } from "next";
import { ServerError } from "custom-objects/ServerError";
import { CreateExtra } from "@_utils/database/admin/menu-queries/extras";

export const validateNewItem = (
  newItem?: NewDBItem,
  images?: { buffer: Buffer }[]
) => {
  console.log(images);
  if (!newItem)
    throw new ServerError("No menu item was provided to create", 400);
  if (!parseUndefinedToNull(newItem.name))
    throw new ServerError("The name is missing from the new item", 400);
  if (!parseUndefinedToNull(newItem.price))
    throw new ServerError("The price is missing from the new item", 400);
  if (!parseUndefinedToNull(images) || images?.length === 0)
    throw new ServerError("The image is missing from the new item", 400);
  if (!parseUndefinedToNull(newItem.description))
    throw new ServerError("The description is missing from the new item", 400);
};

export const sendErrorResponse = (error: any, res: NextApiResponse) => {
  if (error instanceof ServerError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  console.log("ERROR", error);
  return res.status(500).json({ message: "An unexpected error has occurred" });
};

export const formatDateRange = (range?: ItemDateRange | null) => {
  if (!range) return range;
  return `[${range.from}, ${range.to}]`;
};

export const formatPrice = (price: string, length = 4, precision = 2) => {
  let decimal = "";
  let body = price;
  if (price.includes(".")) {
    length++;
    const decimalIndex = price.indexOf(".");
    if (decimalIndex !== price.length - 1) {
      decimal =
        "." +
        price
          .slice(decimalIndex, decimalIndex + precision + 1)
          .replaceAll(".", "");
    } else {
      decimal = ".";
    }
    body = price.slice(0, decimalIndex);
  }
  price = (body + decimal).slice(0, length);
  return price;
};

export const validateNewExtra = (extra?: CreateExtra) => {
  if (!extra) throw new ServerError("No extra provided");
  if (!extra.name)
    throw new ServerError("No name was provided for the new extra");
  if (!extra.categoryId)
    throw new ServerError("No category was provided for the new extra");
};
