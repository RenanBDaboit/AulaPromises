// Chamamos essa interação presencial e imediata no refeitório de SINCRONA - ou seja:
// é quando você e o atendente estão se comunicando ao mesmo tempo.

console.log('Enviando o pedido de refeição para o refeitório');

function mandaMensagem() {
    console.log('Gostaria de reservar o prato principal para hoje');
    console.log('Vou te mandar a solicitação da refeição');
    console.log('Voltando ao trabalho da fábrica enquanto aguardo o pedido');
}

mandaMensagem();

console.log('Pedido recebido pela cozinha do refeitório');

// FETCH API - CONSUMIR UMA API DO VIA CEP

// viacep.com.br/ws/01001000/json

// é uma interface de comunicação entre sistemas 
// faz duas coisas diferentes conversarem ela 
// permite que dois componentes de SW se comuniquem. Chamamos isso de: Client/Server.

let buscaCEP = fetch('https://viacep.com.br/ws/89258650/json')
.then(resposta => resposta.json())
.then(r => {
    if (r.erro) {
        throw new Error('Esse CEP não existe');
    } else {
        console.log(r);
    }
})
.catch(erro => console.log(erro));

/* O objeto RESPONSE/RESPOSTA/R nos trouxe um corpo de respostas que não censeguimos acessar. 
Ele trouxe um monte de bytes. Usamos o JSON para ele converter essa resposta em json que é um formato
muito usado em JS
*/

/* E seguindo a lógica do then(), sendo 'então', vamos colocar outro then() quando ele fechar o anterior.
Então no final vamos incluir .then(). Vamor pegar novamente uma resposta e colocar 'r' (r => ). É novamente uma 
arrow function console.log que vai imprimir esse 'r'.
*/

console.log(buscaCEP);

// then e json

// TRATAR ERROS COM CATCH

// Toda PROMISE retorna esses 2 métodos: Ela retorna THEN caso ela seja resolvida e retorna CATCH caso ela sea recusada

// Resumindo: Você pode interpretar assim: catch em português significa "pegue". Assim caso aconteça algum erro, ele 
// pega o erro e imprime na tela

// E o que é a mensagem: TypeError: filed to fetch: Imagine uma encomenda que saiu para a entrega e não é entregue no endereço 
// correto, eu gostaria de uma mensagem que avisasse o que ocorreu