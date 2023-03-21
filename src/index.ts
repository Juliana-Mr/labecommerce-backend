import  express, { Request, Response} from 'express'
import cors from 'cors'
import { users, products, purchase, createUser, getAllUsers, createProduct, getAllProduct, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { TProduct, TPurchase, TUser } from './types';

// console.log(createPurchase("1", "1", 2, 600) )
// console.log(getAllPurchasesFromUserId("1"))

const app = express()
app.use(express.json())
app.use(cors())


app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
})


app.get("/users", (req:Request, res:Response) => {
  res.status(200).send(users)
})

app.post("/users", (req:Request, res:Response) =>{
 const {id, email, password} =req.body

 const newUser: TUser = {
  id,
  email,
  password
 }
 
 users.push(newUser)

 res.status(201).send("Cadastro realizado com sucesso")

})


app.get("/products", (req:Request, res:Response) => {
  res.status(200).send(products)
})

app.get("/products/search", (req:Request, res:Response) =>{
  const name = req.query.name as string
  const result = products.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
  res.status(200).send(result)
})

app.post("/products", (req:Request, res:Response) => {
const {id, name,price, category} = req.body

const newProduct: TProduct ={
  id,
  name,
  price,
  category
}

products.push(newProduct)
res.status(201).send("Produto cadastrado com sucesso")

})

app.post("/purchase", (req:Request, res:Response) => {
  const {userId, productId,quantity,totalPrice} = req.body

  const newPurchase : TPurchase = {
    userId,
    productId,
    quantity,
    totalPrice
  }

  purchase.push(newPurchase)
  res.status(201).send("Compra realizada com sucesso")

})