exports.up = async (sql) => {
  await sql`
	INSERT INTO product_categories
	(id,category)
	VALUES
	(0, 'topseller'),
	(1,'wohnzimmer'),
	(2,'schlafzimmer'),
	(3,'speisezimmer'),
	(4,'dekoration'),
	(5,'arbeitszimmer'),
	(6,'badezimmer'),
	(7,'garderobe'),
	(8,'kinderzimmer'),
	(9, 'gartenmoebel'),
	(10,'kueche'),
	(11,'lampen-und-leuchten'),
	(12,'heimtextilien')
	`;
};

exports.down = async (sql) => {
  await sql`DELETE FROM product_categories`;
};
