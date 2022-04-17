// 2. Connect to database by importing environment variables
import { config } from 'dotenv-safe';
// 1. Import postgres
import postgres from 'postgres';
import camelcaseKeys from 'camelcase-keys';

config();

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  // When in development, connect only once to the database
  if (!globalThis.postgresSqlClient) {
    globalThis.postgresSqlClient = postgres();
  }
  const sql = globalThis.postgresSqlClient;
  return sql;
}

// Connect to PostgresSQl
const sql = connectOneTimeToDatabase();

// CREATE
export async function addProduct(
  name,
  url,
  priceCurrent,
  priceOld,
  discount,
  category,
) {
  const products = await sql`
  INSERT INTO products
  (product_name, product_url, price_current, price_old , discount, category_id)
  VALUES
  (${name}, ${url},${priceCurrent},${priceOld},${discount},${category})
  RETURNING *
  `;
  return camelcaseKeys(products);
}

// READ
export async function readProducts() {
  const readAllproducts = await sql`
  SELECT * FROM products
  `;
  return readAllproducts.map((product) => camelcaseKeys(product));
}
