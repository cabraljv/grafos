const Graph = require('./Graph'); // Substitua './Graph' pelo caminho correto do seu arquivo de classe Graph
const fs = require('fs');

function readFileData(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const lines = content.split('\n');
  const graph = new Graph();
  const numVertices = parseInt(lines[0], 10);
  
  for (let i = 1; i <= numVertices; i++) {
      const row = lines[i].trim().split(/\s+/).map(Number);
      for (let j = 0; j < numVertices; j++) {
          if (row[j] !== 999 && row[j] !== 0) {
              graph.addNode(`V${i}`);
              graph.addNode(`V${j+1}`);
              graph.addEdge(`V${i}`, `V${j+1}`, row[j]);
          }
      }
  }

  return graph;
}
const graph1 = readFileData('grafo_simples.txt');
console.log('Grafo Simples Valorado:', graph1);

// Testes para Grafo Simples Valorado
console.log('BFS:', graph1.bfs('V1'));
console.log('DFS:', graph1.dfs('V1'));
console.log('Dijkstra:', graph1.dijkstra('V1'));
console.log('Prim:', graph1.prim('V1'));
console.log('Ordenação Topológica:', graph1.topologicalSort());
console.log('Ciclo Euleriano:', graph1.hasEulerianCycle());

const graph2 = readFileData('digrafo_simples.txt');
console.log('\nDigrafo Simples Valorado:', graph2);

// Testes para Digrafo Simples Valorado
console.log('BFS:', graph2.bfs('V1'));
console.log('DFS:', graph2.dfs('V1'));
console.log('Dijkstra:', graph2.dijkstra('V1'));
// O Prim não é aplicável para digrafos
// Ordenação Topológica e Ciclo Euleriano podem ser testados se o digrafo for adequado
try {
  console.log('Ordenação Topológica:', graph2.topologicalSort());
} catch (error) {
  console.log(error.message)
}
try {
  console.log('Ciclo Euleriano:', graph2.hasEulerianCycle());
} catch (error) {
  console.log(error.message)
}
