// ASYNC AWAIT

async function buscaEndereco(cep) {

    try {
        let buscaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json`);
        let buscaCEPConvertido = await buscaCEP.json();
    
        if (buscaCEPConvertido.error) {
            throw new Error('CEP não encontrado');
        }
        
        return buscaCEPConvertido;
    } catch (error) {
        console.log(error);
    }
}

let ceps = ['01001000', '89258650', '01001010'];
let conjuntoCeps = ceps.map(cep => buscaEndereco(cep));
Promise.all(conjuntoCeps).then(respostas => console.log(respostas));


console.log(conjuntoCeps);
