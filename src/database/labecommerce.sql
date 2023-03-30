
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

SELECT * FROM users;

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

SELECT * FROM products;
