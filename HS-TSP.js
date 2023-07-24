//implementação de heurística simples 


function calcularDistancia(cidade1, cidade2) {
    // Função para calcular a distância entre duas cidades (pode ser a distância euclidiana ou outra medida)
    // Aqui, cidade1 e cidade2 são objetos com coordenadas x e y, mas você pode modificar conforme suas necessidades.
    const distX = cidade1.x - cidade2.x;
    const distY = cidade1.y - cidade2.y;
    return Math.sqrt(distX * distX + distY * distY);
}

function tspNearestNeighbor(cidades) {
    const numCidades = cidades.length;
    const rota = [];
    const visitado = new Array(numCidades).fill(false);

    // Começar a partir da primeira cidade
    let cidadeAtual = 0;
    rota.push(cidadeAtual);
    visitado[cidadeAtual] = true;

    while (rota.length < numCidades) {
        let cidadeMaisProxima;
        let menorDistancia = Infinity;

        // Encontrar a cidade mais próxima não visitada
        for (let proximaCidade = 0; proximaCidade < numCidades; proximaCidade++) {
            if (!visitado[proximaCidade]) {
                const distancia = calcularDistancia(cidades[cidadeAtual], cidades[proximaCidade]);
                if (distancia < menorDistancia) {
                    menorDistancia = distancia;
                    cidadeMaisProxima = proximaCidade;
                }
            }
        }

        // Ir para a cidade mais próxima
        cidadeAtual = cidadeMaisProxima;
        rota.push(cidadeAtual);
        visitado[cidadeAtual] = true;
    }

    // Voltar para a primeira cidade para completar o ciclo
    rota.push(rota[0]);

    return rota;
}

// Exemplo de utilização
const cidades = [
    { x: 0, y: 0 },
    { x: 1, y: 3 },
    { x: 5, y: 7 },
    { x: 2, y: 1 },
    { x: 8, y: 3 },
    
    // Adicione mais cidades conforme necessário
];

const rotaTSP = tspNearestNeighbor(cidades);
console.log("Rota do TSP:", rotaTSP);
