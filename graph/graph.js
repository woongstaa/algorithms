// 다익스트라 알고리즘을 풀기 위해서는 우선순위 큐나 힙 자료구조가 필요하다
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  push(value, priority) {
    this.queue.push({ value, priority });
    this.sort();
  }

  pop() {
    return this.queue.shift().value;
  }

  sort() {
    this.queue.sort((a, b) => a.priority - b.priority);
  }
}

class MinHeap {
  constructor() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  push(item) {
    this.items.push(item);
    this.bubbleUp();
  }

  pop() {
    if (this.size() === 0) {
      return null;
    }

    const min = this.items[0];
    this.items[0] = this.items[this.size() - 1];
    this.items.pop();
    this.bubbleDown();
    return min;
  }

  swap(a, b) {
    [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
  }

  bubbleUp() {
    let index = this.size() - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.items[parentIndex] <= this.items[index]) {
        break;
      }
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;

    while (index * 2 + 1 < this.size()) {
      let leftChild = index * 2 + 1;
      let rightChild = index * 2 + 2;

      let smallerChild =
        rightChild < this.size() && //
        this.items[rightChild] < this.items[leftChild]
          ? rightChild
          : leftChild;

      if (this.items[index] <= this.items[smallerChild]) {
        break;
      }

      this.swap(index, smallerChild);
      index = smallerChild;
    }
  }
}

function dijkstraExample(graph, start) {
  // 모든 노드의 거리 값을 무한대로 초기화
  const distances = {};

  for (const node in graph) {
    distances[node] = Infinity;
  }

  // 시작점은 0으로 초기화
  distances[start] = 0;

  // 최소 힙 생성 후, 시작 노드를 큐에 넣어줌
  const queue = new MinHeap();
  queue.insert([distances[start], start]); // [ 거리, 현재노드 ]

  // 시작 노드의 경로를 초기화
  const paths = { [start]: start };

  while (queue.size() > 0) {
    const [currDistance, currNode] = queue.pop();

    // 큐에서 팝한 값의 거리값이 더 크다면 이미 업데이트한거기 때문에 스킵
    if (distances[currNode] < currDistance) continue;

    // 변수로 주어진 그래프의 현재노드의 인접 값 거리 노드를 계산
    for (adj in graph[currNode]) {
      const weight = graph[currNode][adj]; // 인접 값의 가중치
      const distance = currDistance + weight; // 현재 거리와 가중치를 더한 값

      // 현제 거리와 가중치를 더한 값이 기록된 거리보다 작다면 값을 업데이트, 큐에 푸시
      if (distance < distances[adj]) {
        distances[adj] = distance;
        paths[adj] = [...paths[currNode], adj];
        queue.insert([distance, adj]);
      }
    }
  }

  // 리턴하는 값은 정렬되어 있어야하기 때문에 정렬 후 리턴값에 활용
  const sortedPaths = {};

  Object.keys(paths)
    .sort()
    .forEach((node) => (sortedPaths[node] = paths[node]));

  console.log('DIJKSTRA :::', [distances, sortedPaths]);
  return [distances, sortedPaths];
}

// dijkstraExample(
//   {
//     A: { B: 9, C: 3 },
//     B: { A: 5 },
//     C: { B: 1 }
//   },
//   'A'
// );

function bellmanFord(graph, source) {
  const numVertices = graph.length;

  const distance = Array(numVertices).fill(Infinity);
  distance[source] = 0;

  const predecessor = Array(numVertices).fill(null);

  for (let temp = 0; temp < numVertices - 1; temp++) {
    for (let u = 0; u < numVertices; u++) {
      for (const [v, weight] of graph[u]) {
        if (distance[u] + weight < distance[v]) {
          distance[v] = distance[u] + weight;
          predecessor[v] = u;
        }
      }
    }
  }

  for (let u = 0; u < numVertices; u++) {
    for (const [v, weight] of graph[u]) {
      if (distance[u] + weight < distance[v]) {
        return [-1];
      }
    }
  }

  console.log([distance, predecessor]);
}

// bellmanFord();

function gameMap(maps) {
  const m = maps.length;
  const n = maps[0].length;
  const directions = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0]
  ];
  const visited = new Set();
  const queue = [[0, 0, 1]];
  visited.add('0 0');

  while (queue.length) {
    const [x, y, time] = queue.shift();

    if (x === m - 1 && y === n - 1) return time;
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && ny >= 0 && nx < m && ny < n) {
        if (!visited.has(`${nx} ${ny}`) && maps[nx][ny] !== 0) {
          queue.push([nx, ny, time + 1]);
          visited.add(`${nx} ${ny}`);
        }
      }
    }
  }
}

console.log(
  gameMap([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1]
  ])
);

function network(n, computers) {
  const visited = Array(n).fill(false);

  function dfs(node) {
    visited[node] = true;

    for (let i = 0; i < n; i++) {
      if (!visited[i] && computers[node][i]) {
        dfs(i);
      }
    }
  }

  let count = 0;

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i);
      count++;
    }
  }

  return count;
}

network(3, [
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 1]
]);

function delivery(n, road, k) {
  const graph = Array.from({ length: n + 1 }, () => []);
  const hours = Array(n + 1).fill(Infinity);
  hours[1] = 0;

  for (const [from, to, hour] of road) {
    graph[from].push([to, hour]);
    graph[to].push([from, hour]);
  }

  const heap = new MinHeap();
  heap.push([1, 0]);

  while (heap.size() > 0) {
    const [node, hour] = heap.pop();

    for (const [nextNode, nextHour] of graph[node]) {
      const totalHour = hour + nextHour;

      if (totalHour < hours[nextNode]) {
        hours[nextNode] = totalHour;
        heap.push([nextNode, totalHour]);
      }
    }
  }

  return hours.filter((hour) => hour <= k).length;
}

console.log(
  'DELIVERY :::',
  delivery(
    5,
    [
      [1, 2, 1],
      [2, 3, 3],
      [5, 2, 2],
      [1, 4, 2],
      [5, 3, 1],
      [5, 4, 2]
    ],
    3
  )
);
