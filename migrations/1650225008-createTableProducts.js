exports.up = async (sql) => {
  await sql`
  CREATE TABLE products(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_name varchar(300),
    product_url varchar(300),
    price_current NUMERIC (10,2),
    price_old NUMERIC (10,2),
    discount varchar(100),
    category_id integer REFERENCES product_categories(id) ON DELETE CASCADE
  )

  `;
};

exports.down = async (sql) => {
  await sql`DROP TABLE products`;
};
