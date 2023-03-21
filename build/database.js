"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.purchase = exports.getProductById = exports.getAllProduct = exports.createProduct = exports.products = exports.getAllUsers = exports.createUser = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    {
        id: "1",
        email: "fulano@email.com",
        password: "senha1"
    },
    {
        id: "2",
        email: "ciclano@email.com",
        password: "senha2"
    }
];
const createUser = (id, email, password) => {
    const newUser = { id, email, password };
    exports.users.push(newUser);
    console.log(exports.users);
};
exports.createUser = createUser;
(0, exports.createUser)("3", "beltrano@email.com", "senha3");
const getAllUsers = () => {
    console.log(exports.users);
};
exports.getAllUsers = getAllUsers;
(0, exports.getAllUsers)();
exports.products = [
    {
        id: "1",
        name: "VanGogh",
        price: 300,
        category: types_1.CATEGORY.QUADROS
    },
    {
        id: "2",
        name: "Portinari",
        price: 300,
        category: types_1.CATEGORY.QUADROS
    }
];
const createProduct = (id, name, price, category) => {
    const newProduct = { id, name, price, category };
    exports.products.push(newProduct);
    console.log(`Produto criado com sucesso ${exports.products}`);
};
exports.createProduct = createProduct;
(0, exports.createProduct)("3", "Tarsila", 500, types_1.CATEGORY.QUADROS);
const getAllProduct = () => {
    console.log(exports.products);
};
exports.getAllProduct = getAllProduct;
(0, exports.getAllProduct)();
const getProductById = (id) => {
    const idProduct = exports.products.find((idProduct) => {
        if (idProduct.id === id) {
            return console.log(idProduct);
        }
    });
};
exports.getProductById = getProductById;
(0, exports.getProductById)("1");
exports.purchase = [
    {
        userId: "1",
        productId: "1",
        quantity: 3,
        totalPrice: 900
    },
    {
        userId: "2",
        productId: "2",
        quantity: 6,
        totalPrice: 1800
    }
];
const queryProductsByName = (q) => {
    return exports.products.filter(prod => prod.name.toLowerCase() === q.toLowerCase());
};
exports.queryProductsByName = queryProductsByName;
const createPurchase = (userId, productId, quantity, totalPrice) => {
    const newProduct = { userId, productId, quantity, totalPrice };
    exports.purchase.push(newProduct);
    return "Compra realizada com sucesso!!!";
};
exports.createPurchase = createPurchase;
const getAllPurchasesFromUserId = (userIdToSearch) => {
    return exports.purchase.filter(user => user.userId === userIdToSearch);
};
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map