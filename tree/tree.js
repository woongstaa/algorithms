function preorder(nodes, idx) {
  if (idx < nodes.length) {
    let ret = `${nodes[idx]}`;
    ret += preorder(nodes, idx * 2 + 1);
    ret += preorder(nodes, idx * 2 + 2);
    return ret;
  }

  return '';
}

function inorder(nodes, idx) {
  if (idx < nodes.length) {
    let ret = inorder(nodes, idx * 2 + 1);
    ret += `${nodes[idx]}`;
    ret += inorder(nodes, idx * 2 + 2);
    return ret;
  }

  return '';
}

function postorder(nodes, idx) {
  if (idx < nodes.length) {
    let ret = postorder(nodes, idx * 2 + 1);
    ret += postorder(nodes, idx * 2 + 2);
    ret += `${nodes[idx]}`;
    return ret;
  }

  return '';
}

// console.log(inorder([1, 2, 3, 4, 5, 6, 7], 0));

// 이진탐색트리 노드
class Node {
  constructor(key) {
    this.left = null;
    this.right = null;
    this.val = key;
  }
}

// 이진 탐색 트리 클래스
class BST {
  constructor() {
    // 루트 노드를 생성자에서 만들어 줌
    this.root = null;
  }

  // 탐색 트리 생성 메서드
  insert(key) {
    // 루트 노드가 없으면 새로운 노드 생성
    if (!this.root) {
      this.root = new Node(key);
    } else {
      // 루트 노드가 있다면, 루트 노드를 현재 루트 노드 기준으로 설정
      let curr = this.root;

      while (true) {
        // 들어온 값이 현재 루트 노드의 밸류보다 작으면 왼쪽 노드로 배치
        if (key < curr.val) {
          // 현재 노드에 왼쪽 노드에 값이 있으면, 루트 노드의 기준을 왼쪽으로 옮겨줌
          if (curr.left) {
            curr = curr.left;
          } else {
            // 값이 없으면 새로운 노드를 생성하고 반복문 탈출
            curr.left = new Node(key);
            break;
          }
        } else {
          // 오른쪽 노드 생성, 방식은 위와 동일
          if (curr.right) {
            curr = curr.right;
          } else {
            curr.right = new Node(key);
            break;
          }
        }
      }
    }
  }

  // 탐색 메서드
  search(key) {
    let curr = this.root;

    // 노드가 존재하고, 찾으려는 값이 현재 노드의 밸류랑 같지 않으면 반복함
    while (curr && curr.val !== key) {
      // 만약 현재 루트 노의 밸류보다 찾는 값이 작다면, 왼쪽 노드로 현재 루트 노드를 이동
      if (key < curr.val) {
        curr = curr.left;
      } else {
        // 반대의 경우 오른쪽 노드로 이동
        curr = curr.right;
      }
    }

    return curr;
  }
}

function bstTest(list, searchList) {
  const bst = new BST();
  const result = [];

  for (const key of list) {
    bst.insert(key);
  }

  for (const key of searchList) {
    if (bst.search(key)) {
      result.push(true);
    } else {
      result.push(false);
    }
  }

  return result;
}

// bstTest([5, 3, 8, 4, 2, 1, 7, 10], [1, 2, 5, 6]);
// bstTest([1, 3, 5, 7, 9], [2, 4, 6, 8, 1]);

function referralSell(enroll, referral, seller, amount) {
  let parent = {};

  for (let i = 0; i < enroll.length; i++) {
    parent[enroll[i]] = referral[i];
  }

  console.log('PARENT :::', parent);

  let total = {};

  for (const name of enroll) {
    total[name] = 0;
  }

  for (let i = 0; i < seller.length; i++) {
    let money = amount[i] * 100;
    let currName = seller[i];

    while (money > 0 && currName != '-') {
      total[currName] += money - Math.floor(money / 10);
      currName = parent[currName];

      money = Math.floor(money / 10);
    }
  }

  return enroll.map((name) => total[name]);
}

// referralSell(['john', 'mary', 'edward', 'sam', 'emily', 'jaimie', 'tod', 'young'], ['-', '-', 'mary', 'edward', 'mary', 'mary', 'jaimie', 'edward'], ['young', 'john', 'tod', 'emily', 'mary'], [12, 4, 2, 5, 10]);

class Queue {
  items = [];
  front = 0;
  rear = 0;

  push(data) {
    this.items.push(data);
    this.rear++;

    return this.items;
  }

  pop() {
    return this.items[this.front++];
  }

  isEmpty() {
    return this.front === this.rear;
  }
}

function isValidMove(ny, nx, n, m, maps) {
  return ny >= 0 && ny < n && nx >= 0 && nx < m && maps[ny][nx] !== 'X';
}

function appendToQueue(ny, nx, k, time, visited, q) {
  if (!visited[ny][nx][k]) {
    visited[ny][nx][k] = true;
    q.push([ny, nx, k, time + 1]);
  }
}

function escapeFromMaze(maps) {
  const n = maps.length;
  const m = maps[0].length;
  const visited = Array.from(Array(n), () =>
    Array(m)
      .fill(false)
      .map(() => Array(2).fill(false))
  );

  const dy = [-1, 1, 0, 0];
  const dx = [0, 0, -1, 1];
  const q = new Queue();
  let endY = -1;
  let endX = -1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (maps[i][j] === 'S') {
        q.push([i, j, 0, 0]);
        visited[i][j][0] = true;
      }

      if (maps[i][j] === 'E') {
        endY = i;
        endX = j;
      }
    }
  }

  while (!q.isEmpty()) {
    const [y, x, k, time] = q.pop();
    // console.log(y, x, k, time);

    if (y === endY && x === endX && k === 1) {
      return time;
    }

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (!isValidMove(ny, nx, n, m, maps)) {
        continue;
      }
      if (maps[ny][nx] === 'L') {
        appendToQueue(ny, nx, 1, time, visited, q);
      } else {
        appendToQueue(ny, nx, k, time, visited, q);
      }
    }
  }

  return -1;
}

console.log(escapeFromMaze('MAZE_1 :::', ['SOOOL', 'XXXXO', 'OOOOO', 'OXXXX', 'OOOOE']));

function escapeFromMaze2(maps) {
  // 핵심은 S > L 이 선행되고,  L > E 가 되어야한다
  // 각각의 도달 기준이 정해져있기 때문에 bfs가 더 적합
  // maps가 m * n 매트릭스가 아니기 때문에 재가공 후에 작업
  const maze = maps.map((row) => row.split(''));
  const m = maze.length;
  const n = maze[0].length;

  const directions = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0]
  ];

  let start, lever, end;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (maze[i][j] === 'S') {
        start = [i, j];
      } else if (maze[i][j] === 'L') {
        lever = [i, j];
      } else if (maze[i][j] === 'E') {
        end = [i, j];
      }
    }
  }

  function bfs(from, target) {
    const queue = [[...from, 1]];
    const visited = new Set();
    visited.add(`${from[0]} ${from[1]}`);

    while (queue.length) {
      const [x, y, time] = queue.shift();

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx >= 0 && ny >= 0 && nx < m && ny < n) {
          if (maze[nx][ny] !== 'X' && !visited.has(`${nx} ${ny}`)) {
            if (maze[nx][ny] === target) {
              return time;
            }

            queue.push([nx, ny, time + 1]);
            visited.add(`${nx} ${ny}`);
          }
        }
      }
    }

    return -1;
  }

  const startToLever = bfs(start, 'L');
  const leverToEnd = startToLever !== -1 ? bfs(lever, 'E') : -1;

  return startToLever !== -1 && leverToEnd !== -1 ? startToLever + leverToEnd : -1;
}

// console.log('MAZE_2 :::', escapeFromMaze2(['SOOOL', 'XXXXO', 'OOOOO', 'OXXXX', 'OOOOE']));

function sheepAndWolf(info, edges) {
  // 모든 노드를 탐색해서 최대값을 찾아야하기 때문에 DFS가 적합
  // 또한 기준에 맞지 않으면 노드를 되돌리고 다음 하위노드로 가야하기 때문에 백트래킹이 적합
  // 노드간 관계를 나타낸 edges가 있기 때문에 인접리스트로 그래프를 표현하는것이 적합
  // 인접리스트는 index가 노드, 내부 값은 자식노드로 표현된다
  const graph = Array.from({ length: info.length }, () => []);
  let maxSheep = 0;

  for (const [parent, child] of edges) {
    graph[parent].push(child);
  }

  // 여기서 path는 앞으로 탐색할 노드를 의미한다
  function dfs(sheep, wolf, path) {
    if (sheep <= wolf) return;

    maxSheep = Math.max(sheep, maxSheep);

    for (let i = 0; i < path.length; i++) {
      const node = path[i];
      const childNode = graph[node];

      path.splice(i, 1); // 자신을 제외하고 새로운 노드를 만듦
      path.push(...childNode);

      if (info[node] === 0) {
        dfs(sheep + 1, wolf, path);
      } else {
        dfs(sheep, wolf + 1, path);
      }
    }
  }

  dfs(1, 0, graph[0]);

  return maxSheep;
}

// console.log(
//   'SHEEP_WOLF :::',
//   sheepAndWolf(
//     [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
//     [
//       [0, 1],
//       [1, 2],
//       [1, 4],
//       [0, 8],
//       [8, 7],
//       [9, 10],
//       [9, 11],
//       [4, 3],
//       [6, 5],
//       [4, 6],
//       [8, 9]
//     ]
//   )
// );

class TreeNode {
  constructor(index, x, y, left = null, right = null) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.left = left;
    this.right = right;
  }

  insert(child) {
    if (child.x < this.x) {
      if (!!this.left) {
        this.left.insert(child);
      } else {
        this.left = child;
      }
    } else {
      if (!!this.right) {
        this.right.insert(child);
      } else {
        this.right = child;
      }
    }
  }
}

function routeFindGame(nodeInfo) {
  // 주어진 nodeInfo의 index + 1이 노드의 value
  // y가 높으면 상위노드
  // y가 같으면, x의 크고 작음으로 노드의 좌우를 결정
  // 이진트리를 구현한 뒤, 전위, 후위순회를 리턴
  const pre = [];
  const post = [];
  const nodes = nodeInfo.map(([x, y], index) => new TreeNode(index + 1, x, y));
  nodes.sort((a, b) => b.y - a.y || a.x - b.x);

  const root = nodes[0];

  for (let i = 1; i < nodes.length; i++) {
    root.insert(nodes[i]);
  }

  function preOrder(node) {
    if (!node) return;

    pre.push(node.index);

    preOrder(node.left);
    preOrder(node.right);
  }

  function postOrder(node) {
    if (!node) return;

    postOrder(node.left);
    postOrder(node.right);

    post.push(node.index);
  }

  preOrder(root);
  postOrder(root);

  return [pre, post];
}

// console.log(
//   'FIND_ROUTE :::',
//   routeFindGame([
//     [5, 3],
//     [11, 5],
//     [13, 3],
//     [3, 5],
//     [6, 1],
//     [1, 3],
//     [8, 6],
//     [7, 2],
//     [2, 2]
//   ])
// );
