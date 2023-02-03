import { NewCartItem, UpdatedCartItem } from "@_types/database/cart";
import pgEscape from "pg-escape";
import { customerParamQuery, customerQuery } from "../connect";

export const createNewCart = async (cartId: string) => {
  const query = "INSERT INTO cart (cart_id, last_modified) VALUES ($1, NOW())";
  try {
    await customerParamQuery(query, [cartId]);
  } catch (e) {
    console.log(e);
  }
};

export const addNewItems = async (cartId: string, items: NewCartItem[]) => {
  if (items.length > 0) {
    let query =
      "INSERT INTO cart_item (cart_item_id, cart_id, menu_item_id, amount, subtotal, extra_price) VALUES ";
    items.forEach((item, i) => {
      query += pgEscape(
        `(${item.cartItemId}, '${cartId}', ${item.menuItemId}, ${item.amount}, '$${item.subtotal}', ${item.extraPrice})`
      );
      if (i !== items.length - 1) {
        query += ",";
      } else {
        query += ";";
      }
    });

    const extrasQuery = addNewExtras(
      cartId,
      items.filter((item) => item.extraIds.length > 0)
    );

    const lastModified = cartLastModified(cartId);
    const removeZeroItems = removeAllZeroItems(cartId);

    await customerQuery(
      query + " " + extrasQuery + " " + lastModified + " " + removeZeroItems
    );
  }
};

const addNewExtras = (cartId: string, items: NewCartItem[]) => {
  if (items.length > 0) {
    let query =
      "INSERT INTO cart_extras (cart_item_id, cart_id, extra_id) VALUES ";
    items.forEach((item, i) => {
      item.extraIds!.forEach((extraId, j) => {
        query += pgEscape(`(${item.cartItemId}, '${cartId}', ${extraId})`);
        if (i === items.length - 1 && j === item.extraIds!.length - 1) {
          query += ";";
        } else {
          query += ",";
        }
      });
    });
    return query;
  }

  return "";
};

export const updateItems = async (cartId: string, items: UpdatedCartItem[]) => {
  if (items.length > 0) {
    let query =
      "UPDATE cart_item SET amount = amount + c.new_amount, subtotal = subtotal + c.new_subtotal::money FROM (VALUES ";
    items.forEach((item, i) => {
      query += pgEscape(
        `(${item.cartItemId}, '${cartId}', ${item.updateAmount}, '${item.subtotal}')`
      );
      if (i !== items.length - 1) {
        query += ",";
      } else {
        query += ") ";
      }
    });

    query +=
      "AS c(item_id, cart_id, new_amount, new_subtotal) WHERE (c.item_id, c.cart_id::uuid) = (cart_item.cart_item_id, cart_item.cart_id);";

    const lastModified = cartLastModified(cartId);
    const removeZeroItems = removeAllZeroItems(cartId);
    await customerQuery(query + " " + lastModified + " " + removeZeroItems);
  }
};

const cartLastModified = (cartId: string) => {
  return `UPDATE cart SET last_modified = NOW() WHERE cart_id = '${pgEscape(
    cartId
  )}';`;
};

const removeAllZeroItems = (cartId: string) => {
  return `DELETE FROM cart_item WHERE cart_id = '${pgEscape(
    cartId
  )}' AND amount <= 0;`;
};
