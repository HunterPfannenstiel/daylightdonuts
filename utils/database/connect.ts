import pg, { PoolConfig } from "pg";

let credentials: PoolConfig;
const dbUser = {
  user: "daylight_user",
  password: process.env.CUSTOMER_DATABASE_PASSWORD,
};

if (process.env.NODE_ENV === "development") {
  credentials = {
    host: "localhost",
    port: 5432,
    database: "daylight",
    ...dbUser,
  };
} else {
  credentials = {
    ...dbUser,
    connectionString: process.env.RAILWAY_DATABASE_URL,
  };
}

const customerPool = new pg.Pool(credentials);

export const customerQuery = async (query: string, params?: any[]) => {
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

// export const customerQuery = async (query: string) => {
//   const client = await customerPool.connect();
//   try {
//     const res = await client.query(query);
//     return res.rows;
//   } catch (e) {
//     console.log(e);
//     throw e;
//   } finally {
//     client.release();
//   }
// };

// export const customerParamQuery = async (
//   query: string,
//   parameters: (string | null)[]
// ) => {
//   const client = await customerPool.connect();
//   try {
//     const res = await client.query(query, parameters);
//     return res.rows;
//   } catch (e) {
//     console.log(e);
//     throw e;
//   } finally {
//     client.release();
//   }
// };
