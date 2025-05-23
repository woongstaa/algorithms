function find(parents, x) {
  if (parents[x] === x) {
    return x;
  }

  parents[x] = find(parents, parents[x]);

  return parents[x];
}

function union(parents, x, y) {
  const root1 = find(parents, x);
  const root2 = find(parents, y);

  parents[root2] = root1;
}

function solution(k, operations) {
  const parents = Array.from({ length: k }, (_, i) => i);
  let n = k;

  for (const op of operations) {
    if (op[0] === 'u') {
      union(parents, op[1], op[2]);
    } else if (op[0] === 'f') {
      find(parents, op[1]);
    }

    n = new Set(Array.from({ length: k }, (_, i) => find(parents, i))).size;
  }

  return n;
}

function engWordplay(n, words) {
  const dictionary = new Set();

  let turn = 0;

  for (let i = 0; i < words.length; i++) {
    const p = (i % n) + 1;
    if (p === 1) turn++;

    if (dictionary.has(words[i])) {
      return [p, turn];
    }

    if (i > 0) {
      const preChar = words[i - 1][words[i - 1].length - 1];
      const currChar = words[i][0];

      if (preChar !== currChar) {
        return [p, turn];
      }
    }

    dictionary.add(words[i]);
  }

  return [0, 0];
}

// console.log('WORD_PLAY :::', engWordplay(2, ['hello', 'one', 'even', 'never', 'now', 'world', 'draw']));

function contacts(phone_book) {
  const book = {};

  for (const number of phone_book) {
    let node = book;

    for (let i = 0; i < number.length; i++) {
      const char = number[i];

      if (node.end) {
        return false;
      }

      if (!node[char]) {
        node[char] = {};
      }

      node = node[char];
    }

    if (Object.keys(node).length > 0) return false;

    node.end = true;
  }

  return true;
}

// console.log('PHONE_BOOK :::', contacts(['119', '97674223', '1195524421']));

function connectIsland(n, costs) {
  const find = (parents, x) => {
    if (parents[x] === x) {
      return x;
    }

    parents = find(parents, parents[x]);

    return parents;
  };

  const union = (parents, rank, x, y) => {
    const rootX = find(parents, x);
    const rootY = find(parents, y);

    if (rank[rootX] < rank[rootY]) {
      parents[rootX] = rootY;
    } else if (rank[rootX] > rank[rootY]) {
      parents[rootY] = rootX;
    } else {
      parents[rootY] = rootX;
      rank[rootX]++;
    }
  };

  costs.sort((a, b) => a[2] - b[2]);

  const parents = Array.from({ length: n }, (_, i) => i);
  const rank = Array(n).fill(0);

  let minCost = 0;
  let edges = 0;

  for (const [from, to, cost] of costs) {
    if (edges === n - 1) break;

    const rootOfFrom = find(parents, from);
    const rootOfTo = find(parents, to);

    if (rootOfFrom !== rootOfTo) {
      union(parents, rank, rootOfFrom, rootOfTo);
      edges++;
      minCost += cost;
    }
  }

  console.log('CONNECT_ISLAND :::', minCost);
  return minCost;
}

connectIsland(4, [
  [0, 1, 1],
  [0, 2, 2],
  [1, 2, 5],
  [1, 3, 1],
  [2, 3, 8]
]);
