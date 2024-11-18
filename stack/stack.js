function craneGame(board, moves) {
  // 1. board를 역순으로 만들면 간단하게 pop을 통해 배열을 관리할 수 있다.
  // 2. 반복문은 moves.length 만큼 돌면 된다.
  // 3. 뒤집은 board에서 빼낼 값과 stack의 top이 일치하면 stack을 pop, 정답에 +2

  let answer = 0;

  const r = [...new Array(board[0].length)].map(() => []);

  for (let i = board.length - 1; i > -1; i--) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j]) {
        r[j].push(board[i][j]);
      }
    }
  }

  const basket = [];

  for (const move of moves) {
    if (r[move - 1].length > 0) {
      const picked = r[move - 1].pop();

      if (basket.length > 0 && basket[basket.length - 1] === picked) {
        basket.pop();
        answer += 2;
      } else {
        basket.push(picked);
      }
    }
  }

  return answer;
}

// console.log(
//   craneGame(
//     [
//       [0, 0, 0, 0, 0],
//       [0, 0, 1, 0, 3],
//       [0, 2, 5, 0, 1],
//       [4, 2, 4, 4, 2],
//       [3, 5, 1, 3, 1]
//     ],
//     [1, 5, 3, 5, 1, 2, 1, 4]
//   )
// );

function editTable(n, k, cmd) {
  const up = [...new Array(n + 2)].map((_, i) => i - 1);
  const down = [...new Array(n + 1)].map((_, i) => i + 1);
  const deleted = [];

  k += 1;

  for (const c of cmd) {
    if (c === 'C') {
      deleted.push(k);
      up[down[k]] = up[k];
      down[up[k]] = down[k];
      k = n < down[k] ? up[k] : down[k];
    } else if (c === 'Z') {
      const restore = deleted.pop();
      up[down[k]] = restore;
      down[up[k]] = restore;
    } else {
      const [command, count] = c.split(' ');

      if (command === 'U') {
        for (i = 0; i < count; i++) {
          k = up[k];
        }
      } else {
        for (i = 0; i < count; i++) {
          k = down[k];
        }
      }
    }
  }

  const answer = new Array(n).fill('O');

  if (deleted.length > 0) {
    for (let i = 0; i < deleted.length; i++) {
      answer[deleted[i] - 1] = 'X';
    }
  }

  return answer.join('');
}

console.log(editTable(8, 2, ['D 2', 'C', 'U 3', 'C', 'D 4', 'C', 'U 2', 'Z', 'Z']));
console.log(editTable(8, 2, ['D 2', 'C', 'U 3', 'C', 'D 4', 'C', 'U 2', 'Z', 'Z']) === 'OOOOXOOO');
