function calcularDistancia(cidade1, cidade2) {
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

function tspNearestInsertion(cidades) {
    const numCidades = cidades.length;
    const rota = [];
    const visitado = new Array(numCidades).fill(false);

    // Começar a partir de uma cidade aleatória
    const cidadeInicial = Math.floor(Math.random() * numCidades);
    rota.push(cidadeInicial);
    visitado[cidadeInicial] = true;

    while (rota.length < numCidades) {
        let cidadeMaisProxima;
        let menorDistancia = Infinity;

        // Encontrar a cidade mais próxima não visitada de qualquer cidade no percurso
        for (let cidadeAtual of rota) {
            for (let proximaCidade = 0; proximaCidade < numCidades; proximaCidade++) {
                if (!visitado[proximaCidade]) {
                    const distancia = calcularDistancia(cidades[cidadeAtual], cidades[proximaCidade]);
                    if (distancia < menorDistancia) {
                        menorDistancia = distancia;
                        cidadeMaisProxima = proximaCidade;
                    }
                }
            }
        }

        // Encontrar a posição de inserção que gera a maior economia possível
        let melhorPosicao = 0;
        let maiorEconomia = -Infinity;

        for (let i = 0; i < rota.length; i++) {
            const cidadeA = rota[i];
            const cidadeB = rota[(i + 1) % rota.length];
            const economia = calcularDistancia(cidades[cidadeA], cidades[cidadeMaisProxima]) +
                             calcularDistancia(cidades[cidadeMaisProxima], cidades[cidadeB]) -
                             calcularDistancia(cidades[cidadeA], cidades[cidadeB]);
            if (economia > maiorEconomia) {
                maiorEconomia = economia;
                melhorPosicao = i + 1;
            }
        }

        // Inserir a cidade na melhor posição encontrada
        rota.splice(melhorPosicao, 0, cidadeMaisProxima);
        visitado[cidadeMaisProxima] = true;
    }

    return rota;
}

function compararHeuristicas(cidades) {
    const rotaBase = tspNearestNeighbor(cidades);
    const rotaAlternativa = tspNearestInsertion(cidades);

    const custoBase = calcularCustoTotal(rotaBase, cidades);
    const custoAlternativa = calcularCustoTotal(rotaAlternativa, cidades);

    console.log("Rota do TSP usando Vizinho Mais Próximo:", rotaBase);
    console.log("Custo total da rota usando Vizinho Mais Próximo:", custoBase);

    console.log("Rota do TSP usando Inserção Mais Próxima:", rotaAlternativa);
    console.log("Custo total da rota usando Inserção Mais Próxima:", custoAlternativa);
}

function calcularCustoTotal(rota, cidades) {
    if (!rota || rota.length === 0) {
        return 0;
    }

    let custoTotal = 0;
    for (let i = 0; i < rota.length - 1; i++) {
        custoTotal += calcularDistancia(cidades[rota[i]], cidades[rota[i + 1]]);
    }
    custoTotal += calcularDistancia(cidades[rota[rota.length - 1]], cidades[rota[0]]);
    return custoTotal;
}

// Exemplo de utilização
const cidadesExemplo = [
    { x: 0, y: 0 },
    { x: 1, y: 3 },
    { x: 5, y: 7 },
    { x: 2, y: 1 },
    // Adicione mais cidades conforme necessário
];

compararHeuristicas(cidadesExemplo);
