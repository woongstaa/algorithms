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
    console.log(y, x, k, time);

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

console.log(escapeFromMaze(['SOOOL', 'XXXXO', 'OOOOO', 'OXXXX', 'OOOOE']));
