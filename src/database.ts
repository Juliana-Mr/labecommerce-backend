import { TProduct, TPurchase, TUser, CATEGORY } from "./types";

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

export const createUser = (id: string, email: string, password:string)=> {
    const newUser = {id, email,password}
    user.push(newUser)
    console.log(user)
    
}

createUser("3", "beltrano@email.com", "senha")


export const getAllUsers = () => {
    console.log(user)
}

getAllUsers()



export const product: TProduct[] = [
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
    }
]

export const createProduct = (id: string, name: string, price:number, category:CATEGORY) => {
    const newProduct = {id, name, price, category}
    product.push(newProduct)
    console.log(`Produto criado com sucesso ${product}`)
}

createProduct("3", "Tarsila", 500, CATEGORY.QUADROS)

export const getAllProduct = () => {
    console.log(product)
}

getAllProduct()

export const getProductById = (id:string) => {
    const idProduct = product.find((idProduct)=>{
        if (idProduct.id === id) {
            return console.log (idProduct)
        }
    })
}

getProductById ("1")


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

export const queryProductsByName = (q:string): TProduct[] => {
    return product.filter(prod => prod.name.toLowerCase() === q.toLowerCase()) 
}


export const createPurchase = (userId:string, productId: string, quantity: number, totalPrice: number): string => {
    const newProduct = {userId, productId, quantity, totalPrice}
    purchase.push(newProduct)
    return "Compra realizada com sucesso!!!"
}


export const getAllPurchasesFromUserId = (userIdToSearch: string): TPurchase[] => {
     return purchase.filter(user => user.userId === userIdToSearch)
}
