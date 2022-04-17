exports.up = async (sql) => {
  await sql`
  CREATE TABLE products(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_name varchar(100),
    product_url varchar(100),
    price_current varchar (200),
    price_old varchar(200),
    saving varchar(100)
  )

  `;
};

exports.down = async (sql) => {
  await sql`DROP TABLE products`;
};
