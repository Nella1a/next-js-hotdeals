exports.up = async (sql) => {
  await sql`
  CREATE TABLE products(
    id integer NOT NULL PRIMARY KEY,
    product_name varchar(100),
    product_url varchar(50),
    price_current NUMERIC (10,2),
    price_old NUMERIC (10,2),
    saving varchar(50)
  )

  `;
};

exports.down = async (sql) => {
  await sql`DROP TABLE products`;
};
