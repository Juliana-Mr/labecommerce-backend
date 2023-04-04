
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