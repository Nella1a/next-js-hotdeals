exports.up = async (sql) => {
  await sql`
  CREATE TABLE product_categories(
    id integer NOT NULL PRIMARY KEY,
    category varchar(50) NOT NULL
  )

  `;
};

exports.down = async (sql) => {
  await sql`DROP TABLE product_categories`;
};
