import { TProduct, TPurchase, TUser } from "./types";

export const user: TUser[] = [
    {
        id: "1",
        email:"fulano@email.com",
        password: "senha"
    },
    {
        id: "2",
        email:"ciclano@email.com",
        password:"senha1"
    }
]



export const product: TProduct[] = [
    {
        id:"1",
        name:"VanGogh",
        price: 300,
        category: "quadros"
    },
    {
        id:"2",
        name:"Portinari",
        price:300,
        category: "quadros"
    }
]


export const purchase: TPurchase[] = [
    {
        userId:"1",
        productId:"1",
        quantity:3,
        totalPrice:900
    },
    {
        userId:"2",
        productId:"2",
        quantity: 6,
        totalPrice: 1800
    }
]