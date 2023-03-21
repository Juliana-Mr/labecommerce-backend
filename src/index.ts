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

app.delete("/users/:id", (req: Request, res: Response) => {
  const {id} = req.params
  const result = users.findIndex(item => item.id === id)

  result < 0 ? res.status(400).send("User inexistente")
  :
  (users.splice(result, 1),
  res.status(200).send("User apagado com sucesso"))
})

app.put("/users/:id", (req:Request, res: Response) => {
  const {id} = req.params

  const newId = req.body.id
  const newEmail = req.body.email
  const newPassword = req.body.password

  const userFind = users.find( user => user.id === id)

  if (userFind){
    userFind.id = newId || userFind.id
    userFind.email = newEmail || userFind.email
    userFind.password = newPassword || userFind.password
  }

  res.status(200).send("Cadastro atualizado com sucesso")
})

app.get("/products", (req:Request, res:Response) => {
  res.status(200).send(products)
})

app.get("/products/search", (req:Request, res:Response) =>{
  const name = req.query.name as string
  const result = products.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
  res.status(200).send(result)
})

app.get("/products/:id", (req:Request, res:Response) => {
  const {id} = req.params

  const result = products.filter(product => product.id === id)

  res.status(200).send ("Objeto 'product' encontrado")

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

app.delete("/products/:id", (req:Request, res:Response) => {
  const {id} = req.params
  const result = products.findIndex(item => item.id === id)

  result < 0 ? res.status(400).send( "Produto inexistente")
  :
  (products.splice(result, 1),
  res.status(200).send("Produto apagado com sucesso"))
})

app.put("/products/:id", (req:Request, res:Response) => {
  const {id} = req.params

  const newId = req.body.id
  const newName = req.body.name
  const newPrice = req.body.price
  const newCategory = req.body.category

  const productFind = products.find(product => product.id === id)

  if(productFind){
    productFind.id = newId || productFind.id
    productFind.name = newName || productFind.name
    productFind.price = newPrice || productFind.price
    productFind.category = newCategory || productFind.category
  }

  res.status(200).send("Produto atualizado com sucesso")
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


app.get("/users/:id/purchases", (req:Request, res: Response) => {
const {id} = req.params

const result = purchase.filter(item => item.userId === id)

res.status(200).send(result)
})
  