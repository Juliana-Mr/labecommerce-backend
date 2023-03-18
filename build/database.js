"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.product = exports.user = void 0;
exports.user = [
    {
        id: "1",
        email: "fulano@email.com",
        password: "senha"
    },
    {
        id: "2",
        email: "ciclano@email.com",
        password: "senha1"
    }
];
exports.product = [
    {
        id: "1",
        name: "VanGogh",
        price: 300,
        category: "quadros"
    },
    {
        id: "2",
        name: "Portinari",
        price: 300,
        category: "quadros"
    }
];
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
//# sourceMappingURL=database.js.map