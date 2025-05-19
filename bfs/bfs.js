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

function solution(maps) {
  const m = maps.length;
  const n = maps[0].length;
  const maze = maps.map((row) => row.split(''));

  const directions = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0]
  ];

  let start;
  let lever;
  let end;

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
    const queue = new Queue();
    const visited = new Set();

    queue.push([...from, 0]);
    visited.add(`${from[0]} ${from[1]}`);

    while (!queue.isEmpty()) {
      const [x, y, time] = queue.pop();

      if (maze[x][y] === target) {
        return time;
      }

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx > -1 && ny > -1 && nx < m && ny < n && !visited.has(`${nx} ${ny}`) && maze[nx][ny] !== 'X') {
          visited.add(`${nx} ${ny}`);
          queue.push([nx, ny, time + 1]);
        }
      }
    }

    return -1;
  }

  const toLever = bfs(start, 'L');
  const toEnd = toLever !== -1 ? bfs(lever, 'E') : -1;

  return toLever !== -1 && toEnd !== -1 ? toLever + toEnd : -1;
}

function 