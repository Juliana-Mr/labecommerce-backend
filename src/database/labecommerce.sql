-- Active: 1682095991879@@127.0.0.1@3306

CREATE TABLE users(
     id TEXT PRIMARY KEY NOT NULL UNIQUE ,
     name TEXT NOT NULL,
     email TEXT NOT NULL UNIQUE ,
     password TEXT NOT NULL,
     createdAt TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);

-- INSERT INTO users (id, email, password)
-- VALUES
-- ("1","fulano@email.com","senha1"),
-- ("2","ciclano@email.com","senha2"),
-- ("3","beltrano@email.com","senha3");

-- DROP TABLE users;

-- INSERT INTO users (id,email,password)
-- VALUES
-- ("4", "juliana@meial.com", "senha 4");


 --SELECT * FROM users;

-- DELETE FROM users
-- WHERE id = "4";

-- UPDATE users
-- SET password = "senhaEditada"
-- WHERE id = 1;

-- SELECT * FROM users
-- ORDER BY email ASC;


CREATE TABLE products(
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL
    );

-- DROP TABLE products;

-- INSERT INTO products (id, name, price, category)
-- VALUES
-- ("1", "VanGogh", 300, "quadros"),
-- ("2", "Portinari", 300, "quadros"),
-- ("3", "DaVinci", 300, "porta-copos"), 
-- ("4", "Frida", 150, "lambe-lambe"),
-- ("5", "Tarsila", 150, "lambe-lambe");

-- INSERT INTO products (id,name,price,category)
-- VALUES
-- ("6", "Picasso",100,"lambe-lambe"); 

-- SELECT * FROM products;

-- SELECT * FROM products
-- WHERE name = "Tarsila";

-- SELECT * FROM products
-- WHERE id = 4;

--  DELETE FROM products
--  WHERE id = 3;

--  UPDATE products
--  SET price = 150
--  WHERE id = 6;

--  SELECT * FROM products
--  ORDER BY price ASC
--  LIMIT 3
--  OFFSET 0;

--  SELECT * FROM products
--  WHERE price >= 200 AND price <= 500
--  ORDER BY name ASC;


CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    totalPrice REAL NOT NULL,
    createdAt TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
    paid INTEGER NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users (id)
    );

  DROP TABLE purchases; 
 
-- INSERT INTO purchases (id, totalPrice, paid, createdAt,buyer)
-- VALUES
-- ("1", "900", "0", "null", "1"),
-- ("2", "1600", "0", "null", "1"),
-- ("3", "600", "0", "null", "2"),
-- ("4", "300", "0", "null", "2"),
-- ("5", "150", "0", "null", "3"),
-- ("6", "300", "0", "null", "3");

-- UPDATE purchases
-- SET createdAt = DATETIME('now','localtime');

-- SELECT * FROM users
-- INNER JOIN purchases
-- ON users.id = purchases.buyer;

-- SELECT * FROM users
-- INNER JOIN purchases
-- ON users.id = purchases.buyer
-- WHERE users.id = 2;

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
purchases.totalPrice AS purchasePrice,
purchases.paid AS pruchasePaid,
purchases.createdAt AS purchaseCreatedAt,
purchases.buyer AS purchaseBuyer

FROM products
LEFT JOIN purchases_products
ON purchases_products.product_id = products.id
LEFT JOIN purchases
ON purchases_products.purchase_id = purchases.id;