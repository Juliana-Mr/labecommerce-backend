import { user, product, purchase, createUser, getAllUsers, createProduct, getAllProduct, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";

console.log(createPurchase("1", "1", 2, 600) )
console.log(getAllPurchasesFromUserId("1"))