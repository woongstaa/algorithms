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
