DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;


CREATE TABLE products (
  item_id INTEGER(11) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price INTEGER(9) NOT NULL,
  stock_quantity INTEGER(5),
  PRIMARY KEY (item_id)    
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Alarm Clock", "Home & Kitchen", 25, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone Charger", "Electronics", 8, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("49 inch LED Television", "Electronics", 999, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Amazon Echo", "Electronics", 100, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ziploc Storage Bags", "Home & Kitchen", 5, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Moleskine Notebook", "Books", 14, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Zen and the Art of Motorcycle Maintenance", "Books", 7, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tide Detergent", "Health & Household", 14, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Panasonic In-Ear Headphone", "Electronics", 9, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Philips Hue Smart bulb", "Tools & Home Improvement", 50, 100);

-- SELECT * FROM products;


