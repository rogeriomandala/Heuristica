const fs = require('fs');

// Função para escrever o extended abstract em um arquivo
function escreverExtendedAbstract() {
  const extendedAbstract = `
    Extended Abstract: Implementação de Heurísticas para o Problema do Caixeiro Viajante

    O Problema do Caixeiro Viajante (TSP - Traveling Salesman Problem) é um problema clássico 
    de otimização que envolve encontrar o menor caminho possível que visite todas as cidades 
    exatamente uma vez e retorne à cidade de origem.

    Neste trabalho, foram implementadas duas heurísticas para resolver o TSP: a heurística do 
    Vizinho Mais Próximo e a heurística da Inserção Mais Próxima. Ambas as heurísticas são 
    abordagens simples e gulosas para o problema.

    A heurística do Vizinho Mais Próximo começa a partir de uma cidade aleatória e, em cada 
    iteração, seleciona a cidade mais próxima que ainda não foi visitada. Esse processo continua 
    até que todas as cidades tenham sido visitadas, e então a rota é fechada voltando para a 
    cidade de origem. 

    A heurística da Inserção Mais Próxima também começa de uma cidade aleatória e, em cada 
    iteração, insere a cidade mais próxima não visitada na posição da rota que resulta na maior 
    economia de distância. Esse processo continua até que todas as cidades tenham sido visitadas.

    Ambas as heurísticas foram implementadas em JavaScript usando o Node.js. Foi feita uma 
    comparação entre as duas heurísticas em um conjunto de cidades de exemplo, e os resultados 
    foram apresentados na saída do console.

    Os resultados mostraram que a heurística do Vizinho Mais Próximo e a heurística da Inserção 
    Mais Próxima tiveram desempenho semelhante para o conjunto de cidades de exemplo, com 
    resultados de custo total de rota próximos.

    Em conclusão, as heurísticas do Vizinho Mais Próximo e da Inserção Mais Próxima são abordagens 
    eficientes e de fácil implementação para resolver o Problema do Caixeiro Viajante em conjuntos 
    de cidades pequenos ou médios.

    Palavras-chave: Problema do Caixeiro Viajante, TSP, Heurísticas, Vizinho Mais Próximo, 
    Inserção Mais Próxima, JavaScript, Node.js.
  `;

  fs.writeFile('extended_abstract.txt', extendedAbstract, (err) => {
    if (err) {
      console.error('Erro ao escrever o arquivo:', err);
    } else {
      console.log('Extended Abstract escrito com sucesso!');
    }
  });
}

// Chamada da função para escrever o extended abstract no arquivo
escreverExtendedAbstract();
