
console.log("O app foi iniciado com sucesso!")

const teste = process.argv[2,3]

if(!teste){
    console.log ("Falta argumento")
}else{
    console.log(process.argv[2], process.argv[3])
}


