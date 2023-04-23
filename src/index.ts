import  express, { Request, Response} from 'express'
import cors from 'cors'
import { db } from './database/knex'
import { users, products, purchase, createUser, getAllUsers, createProduct, getAllProduct, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { TProduct, TPurchase, TUser, CATEGORY } from './types';
import { toASCII } from 'punycode';
import { describe } from 'node:test';

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

app.get("/users", async (req:Request, res:Response) => {
  try{
    const result = await db.raw(`SELECT * FROM users`)
    res.status(200).send(result)
} catch (error: any) {
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})

app.post("/users", async (req: Request, res: Response) => {

  try {
    const id: string = Math.floor(Date.now() * Math.random()).toString(36)
    const name: string = req.body.name
    const email: string = req.body.email
    const password: string = req.body.password
   
if(!name || typeof name !== "string"){
  res.status(400)
  throw new Error ("É necessário enviar um 'name' do tipo 'string'")
}

if(!email || typeof email !== "string"){
  res.status(400)
  throw new Error ("É necessário enviar um 'email' do tipo 'string'")
}

if(!password || typeof password !== "string"){
  res.status(400)
  throw new Error ("É necessário enviar um 'password'do tipo 'string'")
}

const [idExist]: {}[] = await db.raw(`SELECT * FROM users WHERE id = '${id}'`)

if(idExist){
  res.status(400)
  throw new Error ("Usuário já cadastrado!")
}

const [emailExist]: {}[] = await db.raw(`SELECT * FROM users WHERE email ='${email}'`)
 
if (emailExist){
  res.status(400)
  throw new Error ("Email já cadastrado")
}

const result: {}[] = await db.raw(`INSERT INTO users (id, name, email, password) 
VALUES ('${id}', '${name}', '${email}', '${password}')`)
res.status(201).send("Cadastro realizado com sucesso")

} catch (error : any) {
    if(res.statusCode === 200){
      res.status(500)
    }
    res.send(error.message)
  }
})

app.delete("/users/:id", async (req: Request, res: Response): Promise<void> => {
 try{
  const id: string = req.params.id
  const [userExist]:{}[] = await db("users").where({id}) 

  if(!userExist){
    res.status(400)
    throw new Error ("Usuário não encontrado. É necessário enviar um 'id' válido.")
  }

  await db("users").del().where({id})
  res.status(200).send("Usuário excluído com sucesso")
 

 } catch (error: any) {
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})
  
app.put("/users/:id", async (req:Request, res: Response): Promise<void> => {
try{
  const idToEdit: string = req.params.id

  const newName: string = req.body.name
  const newEmail: string = req.body.email
  const newPassword: string = req.body.password

  if(newName !== undefined){
  if(typeof newName !== "string"){
  res.status(400)
  throw new Error ("O 'name' precisa ser uma string")
}}

if(newEmail !== undefined){
if(typeof newEmail!== "string"){
  res.status(400)
  throw new Error ("O 'email' precisa ser uma string")
}}

if(newPassword !== undefined){
if(typeof newPassword!== "string"){
  res.status(400)
  throw new Error ("A 'password' precisa ser uma string")
}
}

type User = {
  name: string,
  email: string,
  password: string
}

const [user]:User[] = await db("users").where({id:idToEdit})

if(user){
  const newInfo: User = {
    name: newName || user.name,
    email: newEmail || user.email,
    password: newPassword || user.password
  }
  await db("users").update(newInfo).where({id:idToEdit})
} else {
  res.status (404)
  throw new Error ("Usuário não encontrado. Verifique o 'id'.")
}

res.status(200).send("Usuário atualizado com sucesso.")

} catch (error: any) {
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})

app.get("/products", async (req:Request, res:Response) => {
  try{
    const result = await db.raw(`SELECT * FROM products`)
    res.status(200).send(result)
  } catch (error: any) {
    if(res.statusCode === 200){
      res.status(500)
    }
    res.send(error.message)
  }
})

app.get("/products/search", async(req:Request, res:Response) =>{
  try{
    const name: string = req.query.name as string

    if(name.length < 1){
        throw new Error ("query params deve possuir pelo menos um caractere")
       }

    const [nameExist]:{}[] = await db.raw(`SELECT * FROM products WHERE name = '${name}'`) 
    if(!nameExist){
      throw new Error ("não há nenhum produto cadastrado com este nome") 
    }
    res.status(200).send(nameExist)

  } catch (error:any) {
    if(res.statusCode === 200){
      res.status(500)
    }
    res.send(error.message)
  }
})

app.get("/products/:id", async (req:Request, res:Response) => {
 try{
 const id = req.params.id 
 
 const [idExist]: {}[] = await db.raw(`SELECT * FROM products WHERE id = '${id}'`)
 if (!idExist){
  res.status(400)
  throw new Error ("Produto não encontrado. Verifique o 'id' enviado")
 }
 
  res.status(200).send (idExist)

} catch (error: any) {
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})

app.post("/products", async (req:Request, res:Response) => {
try{

  const id: string = Math.floor(Date.now() * Math.random()).toString(36)
  const name: string = req.body.name
  const price:number = req.body.price
  const description: string = req.body.description
  const imageUrl: string = req. body.imageUrl

if(!name || typeof name !== "string"){
  res.status(400)
  throw new Error ("É necessário enviar um 'name' do tipo 'string'")
}
 
if(!price || typeof price !== "number"){
  res.status(400)
  throw new Error ("É necessário enviar um 'price' do tipo 'number'")
 }

if(!description || typeof description !== "string"){
  res.status(400)
  throw new Error ("É necessário enviar uma 'description' do tipo 'string'")
}

if(!imageUrl || typeof imageUrl !== "string"){
  res.status(400)
  throw new Error ("É necessário enviar uma 'imageUrl' do tipo 'string'")
}

const [productsIdExist]: {}[] = await db.raw(`SELECT * FROM products WHERE id = '${id}'`)

if(productsIdExist){
  res.status(400)
  throw new Error ("Este produto já está cadastrado")
}

const result: {}[] = await db.raw(`INSERT INTO products (id, name, price, description, imageUrl) 
VALUES ('${id}', '${name}', '${price}', '${description}', '${imageUrl}')`)
res.status(201).send("Produto cadastrado com sucesso")

} catch (error) {
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})

app.delete("/products/:id", async (req:Request, res:Response): Promise<void> => {
 try{
  const id: string = req.params.id
  const [productIdExist]:{}[] = await db("products").where({id})

  if(!productIdExist){
    res.status(400)
    throw new Error ("Produto não encontrado. É necessário enviar um 'id' válido")
  }

  await db("products").del().where({id})
  res.status(200).send("Produto excluído com sucesso.")


}catch (error: any){
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})

app.put("/products/:id",async (req:Request, res:Response): Promise<void> => {
  try{
const idToEdit: string = req.params.id

  const newName: string = req.body.name
  const newPrice: number = req.body.price
  const newDescription: string = req.body.description
  const newImageUrl: string = req.body.imageUrl


  if(newName !== undefined){
  if(typeof newName !== "string"){
    res.status(400)
    throw new Error ("O 'name' deve ser do tipo 'string'")
  }}

  if(newPrice !== undefined){
  if(typeof newPrice !== "number"){
    res.status(400)
    throw new Error ("O 'price' deve ser do tipo 'number'")
  }}

  if(newDescription !== undefined){
    if(typeof newDescription !== "string"){
      res.status(400)
      throw new Error ("O 'description' deve ser do tipo 'string'")
    }}

  if(newImageUrl !== undefined){
    if(typeof newImageUrl !== "string"){
      res.status(400)
      throw new Error ("'imageUrl' deve ser do tipo 'string'")
     }} 
  

  type Products = {
    name: string,
    price: number,
    description: string,
    imageUrl: string
  }
  
const [product]: Products[] = await db("products").where({id:idToEdit})
  
if(product){
  const newInfo: Products = {
    name: newName || product.name,
    price: newPrice || product.price,
    description: newDescription || product.description,
    imageUrl: newImageUrl || product.imageUrl
  }
  await db("products").update(newInfo).where({id:idToEdit})
}else {
  res.status (404)
  throw new Error ("Produto não encontrado. Verifique o 'id'.")
}

res.status(200).send("Produto atualizado com sucesso.")
  
} catch (error) {
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})

app.get("/purchases", async (req:Request, res:Response) => {
  try{
  const result = await db.raw(`SELECT * FROM purchases`)
  res.status(200).send(result)
} catch (error) {
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})

app.post("/purchase", async (req:Request, res:Response) => {
  try{
    const id: string = Math.floor(Date.now() * Math.random()).toString(36)
    const buyer: string = req.body.buyer
    const totalPrice: number = req.body.totalPrice
    const paid: boolean = req.body.paid

 if(!buyer || typeof buyer !== "string"){
  res.status(400)
  throw new Error ("É necessário enviar um 'buyer' do tipo 'string'")
 }

 if(!totalPrice || typeof totalPrice !== "number"){
  res.status(400)
  throw new Error ("É necessário enviar um 'totalPrice' do tipo 'number'")
 }

if(!paid ||typeof paid !== "boolean" ){
  res.status(400)
  throw new Error ("É necessário enviar um 'paid' do tipo 'boolean'")
}

const [purchaseIdExist]: {}[] = await db.raw (`SELECT * FROM purchases WHERE id = '${id}'`)
if(purchaseIdExist){
  res.status(400)
  throw new Error ("Está compra já está cadastrada")
}

const [buyerIdExist]: {}[] = await db.raw(`SELECT * FROM users WHERE id = '${buyer}'`)
if(!buyerIdExist){
  res.status(400)
  throw new Error ("'buyer' deve ser igual ao 'id' de algum usuário cadastrado")
}


const result: {}[] = await db.raw(`INSERT INTO purchases (id, buyer, totalPrice, paid) 
VALUES ('${id}', '${buyer}', '${totalPrice}', '${paid}')`)
res.status(201).send("Compra cadastrada com sucesso")

} catch (error) {
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})

app.get("/users/:id/purchases",async (req:Request, res: Response) => {
 try{
const id = req.params.id

const [userIdExist]: {}[] = await db.raw(`SELECT * FROM purchases WHERE buyer = '${id}'`)
if (!userIdExist){
  res.status(400)
  throw new Error ("'id' não encontrado na tabela. Verifique o 'id' enviado")
}
res.status(200).send(userIdExist)

} catch (error: any) {
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})


