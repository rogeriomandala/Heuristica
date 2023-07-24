//implementação de heurística alternativa 


function calcularDistancia(cidade1, cidade2) {
  // Função para calcular a distância entre duas cidades (pode ser a distância euclidiana ou outra medida)
  // Aqui, cidade1 e cidade2 são objetos com coordenadas x e y, mas você pode modificar conforme suas necessidades.
  const distX = cidade1.x - cidade2.x;
  const distY = cidade1.y - cidade2.y;
  return Math.sqrt(distX * distX + distY * distY);
}

function tspNearestInsertion(cidades, calcularDistancia) {
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

// Exemplo de utilização
const cidades = [
    { x: 0, y: 0 },
    { x: 1, y: 3 },
    { x: 5, y: 7 },
    { x: 2, y: 1 },
    { x: 8, y: 3 },
  // Adicione mais cidades conforme necessário
];

const rotaTSP = tspNearestInsertion(cidades, calcularDistancia);
console.log("Rota do TSP usando Inserção Mais Próxima:", rotaTSP);

