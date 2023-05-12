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
  const query = "SELECT * FROM store.view_cart(1)";
  const res = await customerQuery(query);
  console.log(res.rows);
};

queryItems();
