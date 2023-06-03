import { ItemDateRange, NewDBItem } from "@_types/admin/forms";
import { parseUndefinedToNull } from "..";
import { NextApiResponse } from "next";
import { ServerError } from "custom-objects/ServerError";

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
