import { TProduct, TPurchase, TUser, CATEGORY } from "./types";

export const users: TUser[] = [
    {
        id: "1",
        email:"fulano@email.com",
        password: "senha1"
    },
    {
        id: "2",
        email:"ciclano@email.com",
        password:"senha2"
    }
]

export const createUser = (id: string, email: string, password:string)=> {
    const newUser = {id, email,password}
    users.push(newUser)
    console.log(users)
    
}

createUser("3", "beltrano@email.com", "senha3")


export const getAllUsers = () => {
    console.log(users)
}

getAllUsers()



export const products: TProduct[] = [
    {
        id:"1",
        name:"VanGogh",
        price: 300,
        category: CATEGORY.QUADROS
    },
    {
        id:"2",
        name:"Portinari",
        price:300,
        category: CATEGORY.QUADROS
    },
    {
        id:"3",
        name:"DaVinci",
        price:100,
        category: CATEGORY.PORTACOPOS
    },
    {
        id:"4",
        name:"Frida",
        price:150,
        category: CATEGORY.LAMBE
    }
]

export const createProduct = (id: string, name: string, price:number, category:CATEGORY) => {
    const newProduct = {id, name, price, category}
    products.push(newProduct)
    console.log(`Produto criado com sucesso ${products}`)
}

createProduct("5", "Tarsila", 500, CATEGORY.QUADROS)

export const getAllProduct = () => {
    console.log(products)
}

getAllProduct()

export const getProductById = (id:string) => {
    const idProduct = products.find((idProduct)=>{
        if (idProduct.id === id) {
            return console.log (idProduct)
        }
    })
}

getProductById ("1")


export const purchase: TPurchase[] = [
    {
        userId:"1",
        productId:"2",
        quantity:3,
        totalPrice:900
    },
    {
        userId:"2",
        productId:"3",
        quantity: 6,
        totalPrice: 600
    }
]

export const queryProductsByName = (q:string): TProduct[] => {
    return products.filter(prod => prod.name.toLowerCase() === q.toLowerCase()) 
}


export const createPurchase = (userId:string, productId: string, quantity: number, totalPrice: number): string => {
    const newProduct = {userId, productId, quantity, totalPrice}
    purchase.push(newProduct)
    return "Compra realizada com sucesso!!!"
}


export const getAllPurchasesFromUserId = (userIdToSearch: string): TPurchase[] => {
     return purchase.filter(user => user.userId === userIdToSearch)
}
