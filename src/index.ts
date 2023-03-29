import  express, { Request, Response} from 'express'
import cors from 'cors'
import { users, products, purchase, createUser, getAllUsers, createProduct, getAllProduct, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { TProduct, TPurchase, TUser, CATEGORY } from './types';
import { toASCII } from 'punycode';

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
  try{
  res.status(200).send(users)
} catch (error) {
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})

app.post("/users", (req: Request, res: Response) => {

  try {
    const { id, email, password } = req.body

  if(!id){
    res.status(400)
    throw new Error (" É necessário passar uma 'id")
  }

  if(id !== undefined){
  if(typeof id !== "string"){
    res.status(400)
    throw new Error ("A 'id' precisa ser do tipo 'string'")
  }}

  if(!email){
    res.status(400)
    throw new Error ("É necessário passar um 'email'")
  }

  if(email !== undefined){
  if(typeof email !== "string"){
    res.status(400)
    throw new Error ("O 'email' precisa ser do tipo 'string'")
  }}

  if(!password){
    res.status(400)
    throw new Error("É necessário passar um 'password'")
  }

  if(password !== undefined){
  if(typeof password !== "string"){
    res.status(400)
    throw new Error ("O 'passaword' precisa ser do tipo 'string'")
  }}

    const userFindId = users.find( user => user.id === id)
    if( userFindId){
    res.status(400)
    throw new Error ("Já existe um 'user' com esta 'id'")
  }

  const userFindEmail = users.find(user => user.email === email)
  if( userFindEmail){
    res.status(400)
    throw new Error (" Já existe um 'user' com este 'email'")
  }

      const newUser: TUser = {
      id,
      email,
      password
    }
    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso")
  } catch (error) {
    if(res.statusCode === 200){
      res.status(500)
    }
    res.send(error.message)
  }
})

app.delete("/users/:id", (req: Request, res: Response) => {
 try{
  const {id} = req.params
  const userIdFind = users.find(item => item.id === id)

  if(!userIdFind){
    res.status(404)
    throw new Error ("Usuário inexistente. Verifique o 'id'")
  }

  const result = users.findIndex(item => item.id === id)
  users.splice(result, 1)
  res.status(200).send("Usuário apagado com sucesso")
  
 } catch (error) {
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})
  
app.put("/users/:id", (req:Request, res: Response) => {
try{
  const {id} = req.params

  const newId = req.body.id
  const newEmail = req.body.email
  const newPassword = req.body.password

  const userFind = users.find( user => user.id === id)

if(!userFind){
  res.status(404)
  throw new Error ("Usuário inexistente. Verifique o 'id'")
  }

  if(newId !== undefined){
  if(typeof newId !== "string"){
  res.status(400)
  throw new Error ("O 'id' precisa ser uma string")
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

  if (userFind){
    userFind.id = newId || userFind.id
    userFind.email = newEmail || userFind.email
    userFind.password = newPassword || userFind.password
  }

  res.status(200).send("Cadastro atualizado com sucesso")
} catch (error) {
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})

app.get("/products", (req:Request, res:Response) => {
  
  try{
    res.status(200).send(products)
  } catch (error) {
    if(res.statusCode === 200){
      res.status(500)
    }
    res.send(error.message)
  }
})

app.get("/products/search", (req:Request, res:Response) =>{
  try{
    const name = req.query.name as string
    const result = products.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
    
    if(name.length < 1){
      throw new Error ("query params deve possuir pelo menos um caractere")
    }
    
    res.status(200).send(result)
  
  } catch (error) {
    if(res.statusCode === 200){
      res.status(500)
    }
    res.send(error.message)
  }
})

app.get("/products/:id", (req:Request, res:Response) => {
 try{
 const {id} = req.params
 const result = products.find(product => product.id === id)
 
 if(!result){
  res.status(400)
  throw new Error ("Produto inexistente")
 }
 
  res.status(200).send (["Objeto 'product' encontrado", result ])

} catch (error) {
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})

app.post("/products", (req:Request, res:Response) => {
try{
 const {id, name, price, category} = req.body

 if(!id){
  res.status(400)
  throw new Error ("É necessário passar uma 'id'")
 }

 if(id !== undefined){
 if(typeof id !== "string"){
  res.status(400)
  throw new Error("A 'id' precisa ser do tipo 'string'")
 }}

 if(!name){
  res.status(400)
  throw new Error ("É necessário passar um 'name")
 }

 if(name !== undefined){
 if(typeof name !== "string"){
  res.status(400)
  throw new Error ("O 'name' precisa ser do tipo 'string")
 }}

 if(!price){
  res.status(400)
  throw new Error ("É necessário passar um 'price'")
 }

 if(price !== undefined){
 if(typeof price !== "number"){
  res.status(400)
  throw new Error ("O 'price' precisa ser do tipo 'number'")
 }}

 if(!category){
  res.status(400)
  throw new Error ("É necessário passar uma 'category'")
 }

 if(category !== undefined){
 if( category !== CATEGORY.LAMBE &&
     category !== CATEGORY.PORTACOPOS &&
     category !== CATEGORY.QUADROS
  ) {
  res.status(400)
  throw new Error ("A 'category' precisa ser do tipo válido (lambre-lambe, porta-copos ou quadros)")
 }}

const productFindId = products.find(product => product.id === id)

if (productFindId){
  res.status(400)
  throw new Error ("Já existe um produto com essa 'id' cadastrado")
}

const newProduct: TProduct ={
  id,
  name,
  price,
  category
}

products.push(newProduct)
res.status(201).send("Produto cadastrado com sucesso")
} catch (error) {
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})

app.delete("/products/:id", (req:Request, res:Response) => {
 try{
  const {id} = req.params
  const productIdFind = products.find(product => product.id === id)

  if(!productIdFind){
    res.status(404)
    throw new Error ("Produto inexistente. Verifique o 'id'")
  }
 
  const result = products.findIndex(product => product.id === id)
  products.splice(result, 1)
  res.status(200).send("Produto apagado com sucesso")

}catch (error){
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})

app.put("/products/:id", (req:Request, res:Response) => {
  try{
const {id} = req.params

  const newId = req.body.id
  const newName = req.body.name
  const newPrice = req.body.price
  const newCategory = req.body.category

  const productFind = products.find(product => product.id === id)

  if(!productFind){
    res.status(404)
      throw new Error ("Produto inexistente. Verifique o 'id'")
  }
  
  if(newId !== undefined){
  if(typeof newId !== "string"){
    res.status(400)
    throw new Error ("O 'id' deve ser do tipo 'string'")
  }}

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

  if(newCategory !== undefined){
  if(newCategory !== undefined){
    if(
        newCategory!== CATEGORY.LAMBE &&
        newCategory!== CATEGORY.PORTACOPOS &&
        newCategory!== CATEGORY.QUADROS
    ){
        res.status(400)
        throw new Error("'category' deve ser um tipo válido.lambe-lambe, porta-copos ou quadros")
    }}
  }

  if(productFind){
    productFind.id = newId || productFind.id
    productFind.name = newName || productFind.name
    productFind.price = newPrice || productFind.price
    productFind.category = newCategory || productFind.category
  }

  res.status(200).send("Produto atualizado com sucesso")
} catch (error) {
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})

app.get("/purchases", (req:Request, res:Response) => {
  try{
  res.status(200).send(purchase)
} catch (error) {
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})

app.post("/purchase", (req:Request, res:Response) => {
  try{
    const {userId,productId,quantity,totalPrice} = req.body
    
if(!userId){
  res.status(400)
  throw new Error ("É necessário passar um valor para 'userId'")
}

if(userId !== undefined){
if (typeof userId !== "string"){
  res.status(400)
  throw new Error ("O 'userId' precisa ser do tipo string")
}}

if(!productId){
  res.status(400)
  throw new Error ("É necesssário passar um valor para 'productId'")
}

if(productId !== undefined){
if(typeof productId !== "string"){
  res.status(400)
  throw new Error ("O 'productId' precisa ser do tipo string")
}}

if(!quantity){
  res.status(400)
  throw new Error ("É necessário passar um valor para 'quantity'")
}

if(quantity !== undefined){
if(typeof quantity !== "number"){
  res.status(400)
  throw new Error ("A 'quantity' precisa ser do tipo number")
}}

if(!totalPrice){
  res.status(400)
  throw new Error ("É necessário passar um valor para 'totalPrice'")
}

if(totalPrice !== undefined){
if(typeof totalPrice !== "number"){
  res.status(400)
  throw new Error ("O 'totalPrice' deve ser do tipo number")
}}

const IdUsuarioFind = users.find(user => user.id === userId)

if(!IdUsuarioFind){
  res.status(400)
  throw new Error ("O 'userId' deve existir no array 'users'")
}

const idProductFind = products.find(product => product.id === productId)

if(!idProductFind){
  res.status(400)
  throw new Error ("O 'produductId' deve existir no array 'products'")
}

  const total = quantity * idProductFind.price

  if (total !== totalPrice){
    res.status(400)
    throw new Error("O 'totalPrice' deve corresponder ao 'price' vezes a 'quantity'")
  }

const newPurhase: TPurchase = {
    userId,
    productId,
    quantity,
    totalPrice
}

purchase.push(newPurhase)
res.status(201).send("Compra realizada com sucesso")

} catch (error) {
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})

app.get("/users/:id/purchases", (req:Request, res: Response) => {
 try{
const {id} = req.params
const result = purchase.find(item => item.userId === id)

if (!result){
  res.status(400)
  throw new Error ("usuário inexistente")
}
res.status(200).send(result)

} catch (error) {
  if(res.statusCode === 200){
    res.status(500)
  }
  res.send(error.message)
}
})

