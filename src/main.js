const Graph = require('./Graph'); // Substitua './Graph' pelo caminho correto do seu arquivo de classe Graph
const fs = require('fs');


function isUndirected(lines, numVertices) {
  for (let i = 1; i < numVertices; i++) {
      for (let j = 0; j < i; j++) {
          if (lines[i][j] !== 0) {
              return false;
          }
      }
  }
  return true;
}

function readFileData(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const lines = content.split('\n').map(line => line.trim().split(/\s+/).map(Number));
  const numVertices = lines.shift()[0];
  const graph = new Graph();
  const isGraphUndirected = isUndirected(lines, numVertices);

  for (let i = 0; i < numVertices; i++) {
      const row = lines[i];
      if (!graph.hasNode(`V${i + 1}`)) {
          graph.addNode(`V${i + 1}`);
      }

      for (let j = 0; j < numVertices; j++) {
          if (row[j] !== 999 && row[j] !== 0) {
              if (!graph.hasNode(`V${j + 1}`)) {
                  graph.addNode(`V${j + 1}`);
              }

              graph.addEdge(`V${i + 1}`, `V${j + 1}`, row[j]);
              if (isGraphUndirected) {
                  graph.addEdge(`V${j + 1}`, `V${i + 1}`, row[j]);
              }
          }
      }
  }

  return graph;
}


const graph = readFileData('input.txt');
console.log('Grafo:', graph);
graph.printAdjacencyMatrix();


console.log('BFS:', graph.bfs('V1'));
console.log('DFS:', graph.dfs('V1'));
console.log('Dijkstra:', graph.dijkstra('V1'));
console.log('Prim:', graph.prim('V1'));
try {
    console.log('Ordenação Topológica:', graph.topologicalSort());
} catch (error) {
    console.log(error.message);    
}
console.log('Ciclo Euleriano:', graph.hasEulerianCycle());
