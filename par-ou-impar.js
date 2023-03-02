const comando = process.argv[2]
const meuNumero = Number(process.argv[3])

function gerarNumero(min,max){
    return Math.floor(Math.random()*(max - min +1)) + min
}

const numeroDoComputador = Number(gerarNumero(0 ,10))
const resultado = meuNumero + numeroDoComputador

if(!comando || !meuNumero){
    console.log('Faltou todos os comandos necessários')
}else{
if((comando === 'par' && resultado % 2 === 0)|| (comando === 'impar' && resultado % 2 !== 0)){
    console.log(`Você jogou ${process.argv[3]} e o computador jogou ${numeroDoComputador}. Você ganhou!!`)
}else{
    console.log (`Você jogou ${process.argv[3]} e o computador jogou ${numeroDoComputador}. Você perdeu!!`)
}
}