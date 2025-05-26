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

  insert(item) {
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
        this.items[rightChild][0] < this.items[leftChild][0]
          ? rightChild
          : leftChild;

      if (this.items[index][0] <= this.items[smallerChild][0]) {
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

dijkstraExample(
  {
    A: { B: 9, C: 3 },
    B: { A: 5 },
    C: { B: 1 }
  },
  'A'
);
