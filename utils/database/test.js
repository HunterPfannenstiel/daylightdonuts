const pg = require("pg");

const dbUser = {
  user: "daylight_user",
  password: "0QEyUvFE07n450o23058eiLdFAPMr7",
};

credentials = {
  host: "localhost",
  port: 5432,
  database: "daylight",
  ...dbUser,
};

const customerPool = new pg.Pool(credentials);

const customerQuery = async (query, params) => {
  const connection = await customerPool.connect();
  try {
    const res = await connection.query(query, params);
    return res;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

const queryItems = async () => {
  const query = "SELECT * FROM store.fetch_totaling_cart(5)";
  const res = await customerQuery(query);
  return res.rows;
};

const calculateCartTotal = async (cartId) => {
  const { cart, tax_amount } = (await queryItems(cartId))[0];
  console.log(cart);
  let groupingDiscount = 0;
  let subtotal = 0;
  cart.forEach((group) => {
    const { price: groupPrice, size } = group;
    let remainingToAdd = group.total_items;
    if (groupPrice && size) {
      const unitPrice = +group.items[0][0];
      const groupingCount = Math.floor(group.total_items / size);
      console.log(typeof group.total_items);
      const price = groupingCount * +groupPrice;
      subtotal += price;
      remainingToAdd = group.total_items - groupingCount * size;
      groupingDiscount += unitPrice * groupingCount * size - price;
    }
    if (remainingToAdd > 0) {
      let addedItems = 0;
      for (let i = 0; i < group.items.length; i++) {
        const itemAmount = group.items[i][1];
        const unitPrice = +group.items[i][0];
        const change = remainingToAdd - addedItems - itemAmount;
        if (change <= 0) {
          //more items than need to add
          subtotal += (remainingToAdd - addedItems) * unitPrice;
          break;
        }
        if (change > 0) {
          subtotal += itemAmount * unitPrice;
          addedItems += itemAmount;
        }
      }
    }
  });
  subtotal = +subtotal.toFixed(2);
  const tax = subtotal * +tax_amount;
  console.log({ subtotal, tax, total: subtotal + tax, groupingDiscount });
};

calculateCartTotal(7);
