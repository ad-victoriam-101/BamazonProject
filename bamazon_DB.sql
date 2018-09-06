DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Kennel", "HomeProducts",50.00,10),("Dog food","HomeProducts", 22.30,100),("Dog Bowl","HomeProducts",10.20,100),("White Wine","Grocery",5.50,200),("Heaphones","Electronics",200.50,50),("iPhoneX","Electronics",1000.10,10),("Table lamp","HomeProducts", 20.00,50),("Laptop bag","Electronics",30.00,40),("Coffee Beans(whole)","Grocery",20.20,100),("Laptop Charger","Electronics",50.00,30);
SELECT * FROM products;