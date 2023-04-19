-- Active: 1680179671263@@127.0.0.1@3306

CREATE TABLE users(
     id TEXT PRIMARY KEY NOT NULL UNIQUE ,
     email TEXT NOT NULL UNIQUE ,
     password TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES
("1","fulano@email.com","senha1"),
("2","ciclano@email.com","senha2"),
("3","beltrano@email.com","senha3");

INSERT INTO users (id,email,password)
VALUES
("4", "juliana@meial.com", "senha 4");


SELECT * FROM users;

DELETE FROM users
WHERE id = "4";

UPDATE users
SET password = "senhaEditada"
WHERE id = 1;

SELECT * FROM users
ORDER BY email ASC;


CREATE TABLE products(
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES
("1", "VanGogh", 300, "quadros"),
("2", "Portinari", 300, "quadros"),
("3", "DaVinci", 300, "porta-copos"), 
("4", "Frida", 150, "lambe-lambe"),
("5", "Tarsila", 150, "lambe-lambe");

INSERT INTO products (id,name,price,category)
VALUES
("6", "Picasso",100,"lambe-lambe"); 

SELECT * FROM products;

SELECT * FROM products
WHERE name = "Tarsila";

SELECT * FROM products
WHERE id = 4;

 DELETE FROM products
 WHERE id = 3;

 UPDATE products
 SET price = 150
 WHERE id = 6;

 SELECT * FROM products
 ORDER BY price ASC
 LIMIT 3
 OFFSET 0;

 SELECT * FROM products
 WHERE price >= 200 AND price <= 500
 ORDER BY name ASC;


CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    created_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id)
    );

INSERT INTO purchases (id, total_price, paid, created_at,buyer_id)
VALUES
("1", "900", "0", "null", "1"),
("2", "1600", "0", "null", "1"),
("3", "600", "0", "null", "2"),
("4", "300", "0", "null", "2"),
("5", "150", "0", "null", "3"),
("6", "300", "0", "null", "3");

UPDATE purchases
SET created_at = DATETIME('now','localtime');

SELECT * FROM users
INNER JOIN purchases
ON users.id = purchases.buyer_id;

SELECT * FROM users
INNER JOIN purchases
ON users.id = purchases.buyer_id
WHERE users.id = 2;

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

SELECT * FROM purchases_products;

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
("1", "4","3"),
("2", "5", "5"),
("3", "6","6");

SELECT * FROM purchases_products;

SELECT 
purchases_products.purchase_id AS purchaseID,
purchases_products.product_id AS productId,
purchases_products.quantity AS quantity,
products.id AS idProduct, 
products.name AS productName,
products.price AS productPrice,
products.category AS productCategory,
purchases.id AS idPurchase,
purchases.total_price AS purchasePrice,
purchases.paid AS pruchasePaid,
purchases.created_at AS purchaseCreatedAt,
purchases.buyer_id AS purchaseBuyer

FROM products
LEFT JOIN purchases_products
ON purchases_products.product_id = products.id
LEFT JOIN purchases
ON purchases_products.purchase_id = purchases.id;