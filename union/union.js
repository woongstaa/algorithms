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

console.log('PHONE_BOOK :::', contacts(['119', '97674223', '1195524421']));
