class PriorityQueue {
  constructor() {
      this.items = [];
  }

  enqueue(element, priority) {
      const queueElement = { element, priority };
      let added = false;

      for (let i = 0; i < this.items.length; i++) {
          if (queueElement.priority < this.items[i].priority) {
              this.items.splice(i, 0, queueElement);
              added = true;
              break;
          }
      }

      if (!added) {
          this.items.push(queueElement);
      }
  }

  dequeue() {
      if (this.isEmpty()) {
          throw new Error("Queue is empty");
      }
      return this.items.shift().element;
  }

  isEmpty() {
      return this.items.length === 0;
  }

}

class Graph {
  constructor() {
    this.nodes = {};
    this.edges = {};
  }

  addNode(node) {
    if (!this.nodes[node]) {
      this.nodes[node] = [];
    }
  }


  addEdge(node1, node2, weight = 0) {
    this.addNode(node1);
    this.addNode(node2);
    this.nodes[node1].push(node2);
    this.edges[`${node1}-${node2}`] = weight;
  }

  // Métodos para implementar algoritmos de grafos...
  bfs(start) {
    const queue = [start];
    const visited = { [start]: true };
    const result = [];

    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node);

      this.nodes[node].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }

    return result;
  }
  dfs(start) {
    const visited = {};
    const result = [];

    const dfsVisit = (node) => {
      visited[node] = true;
      result.push(node);

      this.nodes[node].forEach(neighbor => {
        if (!visited[neighbor]) {
          dfsVisit(neighbor);
        }
      });
    };

    dfsVisit(start);
    return result;
  }

  dijkstra(start) {
    const distances = {};
    const predecessors = {};
    Object.keys(this.nodes).forEach(node => {
      distances[node] = Infinity;
      predecessors[node] = null;
    });
    distances[start] = 0;

    const visited = {};

    while (Object.keys(visited).length < Object.keys(this.nodes).length) {
      let closestNode = null;
      Object.keys(distances).forEach(node => {
        if (!visited[node] && (closestNode === null || distances[node] < distances[closestNode])) {
          closestNode = node;
        }
      });

      visited[closestNode] = true;

      this.nodes[closestNode].forEach(neighbor => {
        const distance = distances[closestNode] + this.edges[`${closestNode}-${neighbor}`];
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          predecessors[neighbor] = closestNode;
        }
      });
    }

    const paths = {};
    Object.keys(predecessors).forEach(node => {
      const path = [];
      let current = node;
      while (current !== null) {
        path.unshift(current);
        current = predecessors[current];
      }
      paths[node] = path;
    });

    return { distances, paths };
  }



  prim(startNode) {
    const minTree = new Graph();
    const edgeQueue = new PriorityQueue();
    const visited = new Set();

    visited.add(startNode);
    this.nodes[startNode].forEach(neighbor => {
      edgeQueue.enqueue([startNode, neighbor], this.edges[`${startNode}-${neighbor}`]);
    });

    while (!edgeQueue.isEmpty()) {
      const [node1, node2] = edgeQueue.dequeue();
      if (!visited.has(node2)) {
        visited.add(node2);
        minTree.addEdge(node1, node2, this.edges[`${node1}-${node2}`]);
        this.nodes[node2].forEach(neighbor => {
          if (!visited.has(neighbor)) {
            edgeQueue.enqueue([node2, neighbor], this.edges[`${node2}-${neighbor}`]);
          }
        });
      }
    }

    return minTree;
  }

  getAdjacencyMatrix() {
    const matrix = [];
    const nodeKeys = Object.keys(this.nodes);

    nodeKeys.forEach((node, i) => {
      matrix[i] = new Array(nodeKeys.length).fill(0);
      this.nodes[node].forEach(neighbor => {
        const j = nodeKeys.indexOf(neighbor);
        matrix[i][j] = this.edges[`${node}-${neighbor}`];
      });
    });

    return matrix;
  }
  
  hasNode(node) {
    return this.nodes.hasOwnProperty(node);
  }
  printAdjacencyMatrix() {
    const matrix = this.getAdjacencyMatrix();
    console.log('Matriz de Adjacência:');
    matrix.forEach(row => console.log(row.join(' ')));
  }

  topologicalSort() {
    let inDegree = {};
    let queue = [];
    let sort = [];

    Object.keys(this.nodes).forEach(node => {
      inDegree[node] = 0;
    });

    Object.keys(this.edges).forEach(edge => {
      inDegree[edge.split('-')[1]]++;
    });

    Object.keys(inDegree).forEach(node => {
      if (inDegree[node] === 0) {
        queue.push(node);
      }
    });

    while (queue.length) {
      let node = queue.shift();
      sort.push(node);

      this.nodes[node].forEach(neighbor => {
        inDegree[neighbor]--;
        if (inDegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      });
    }

    if (sort.length !== Object.keys(this.nodes).length) {
      throw new Error('O grafo possui um ciclo, portanto não é possível realizar a ordenação topológica.');
    }

    return sort;
  }
  hasEulerianCycle() {
    let oddDegreeCount = 0;

    for (let node in this.nodes) {
      if (this.nodes[node].length % 2 !== 0) {
        console.log()
        oddDegreeCount++;
      }
    }

    // Um grafo possui um ciclo euleriano se não houver vértices de grau ímpar
    return oddDegreeCount === 0;
  }
}
