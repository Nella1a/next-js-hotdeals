import camelcaseKeys from 'camelcase-keys';
// 2. Connect to database by importing environment variables
import { config } from 'dotenv-safe';
// 1. Import postgres
import postgres from 'postgres';

// import { productionBrowserSourceMaps } from '../next.config';

config();

declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

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

/* *************************** */
/*        Table: products      */
/* *************************** */

export type Products = {
  name: string;
  url: string;
  priceCurrent: number;
  priceOld: number;
  discount: string;
  category: number;
};

// CREATE
export async function addProduct(
  name: string,
  url: string,
  priceCurrent: number,
  priceOld: number,
  discount: string,
  category: number,
) {
  const [products] = await sql<[Products]>`
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
  const readAllproducts = await sql<Products[]>`
  SELECT * FROM products
  `;
  return readAllproducts.map((product: Products) => camelcaseKeys(product));
}

// DELETE

export async function deleteProduct(dealId) {
  const deleteId = await sql`
  DELETE FROM
  products
  WHERE
  products.id = ${dealId}
  `;
  return deleteId;
}

/* *************************** */
/*        Table: user         */
/* *************************** */

export type User = {
  id: number;
  username: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

// check if admin already exists in database
export async function getUserByUsername() {
  const [user] = await sql<[number | undefined]>`
  SELECT id FROM users
  `;
  return user && camelcaseKeys(user);
}

// get user with passwordhash
export async function getUserByUserWithPasswordHashByUsername(
  username: string,
) {
  const [user] = await sql<[UserWithPasswordHash | undefined]>`
  SELECT
    id,
    username,
    password_hash
  FROM
    users
   WHERE
    username = ${username}
  `;
  return user && camelcaseKeys(user);
}

// CREATE
export async function createUser(username: string, passwordHash: string) {
  const [user] = await sql<[User]>`
  INSERT INTO users
  (username, password_hash)
  VALUES
  (${username}, ${passwordHash})
  RETURNING
  id,
  username
  `;
  return camelcaseKeys(user);
}

// READ
export async function getUserById(id: number) {
  const [user] = await sql<[User | undefined]>`
    SELECT
      id,
      username
    FROM
      users
     WHERE
      id = ${id}
    `;
  console.log('User in DB', user);
  return user && camelcaseKeys(user);
}

// get user by session
export async function getUserByValidSessionToken(token: string | undefined) {
  if (!token) return undefined;
  const [user] = await sql<[User | undefined]>`
    SELECT
      users.id,
      users.username
    FROM
      users,
      sessions
    WHERE
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
  `;
  return user && camelcaseKeys(user);
}

/* *************************** */
/*        Table: session      */
/* *************************** */
export type Session = {
  id: number;
  token: string;
  userId: number;
};

export async function getValidSessionByToken(token: string | undefined) {
  if (!token) return undefined;
  const [session] = await sql<[Session | undefined]>`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${token} AND
      expiry_timestamp > now()
  `;
  await deleteExpiredSessions();
  return session && camelcaseKeys(session);
}

// add new token to session
export async function createSession(token: string, userId: number) {
  const [session] = await sql<[Session]>`
  INSERT INTO sessions
  (token, user_id)
  VALUES
  (${token}, ${userId})
  RETURNING
  id,
  token
  `;
  await deleteExpiredSessions();
  return camelcaseKeys(session);
}

export async function deleteSessionByToken(token: string) {
  const [session] = await sql<[Session | undefined]>`
  DELETE FROM
  sessions
  WHERE
  token = ${token}
  RETURNING *
  `;
  return session && camelcaseKeys(session);
}

// delete expired session
export async function deleteExpiredSessions() {
  const session = await sql<Session[]>`
DELETE FROM
  sessions
WHERE
  expiry_timestamp < NOW()
RETURNING *
`;
  camelcaseKeys(session);
}

/* *************************** */
/*      Table: categories      */
/* *************************** */

export type ProductCategories = {
  id: number;
  category: string;
};

export async function productCategories() {
  const categories = await sql<ProductCategories[]>`
SELECT * FROM
product_categories
`;
  return categories.map((category: ProductCategories) =>
    camelcaseKeys(category),
  );
}

export type ProductsCategory = {
  id: number;
  productName: string;
  productUrl: string;
  priceCurrent: number;
  priceOld: number;
  discount: string;
  categoryId: number;
  category: string;
};

export async function readProductsByCategory(category: any) {
  // if (!category) {
  //   return undefined;
  // }
  const products = await sql<ProductsCategory[]>`
   SELECT * FROM
  products,
  product_categories
  WHERE
  products.category_id = product_categories.id AND product_categories.category = ${category}
  `;
  return products.map((product) => camelcaseKeys(product));
}
