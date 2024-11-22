function craneGame(board, moves) {
  // 1. board를 역순으로 만들면 간단하게 pop을 통해 배열을 관리할 수 있다.
  // 2. 반복문은 moves.length 만큼 돌면 된다.
  // 3. 뒤집은 board에서 빼낼 값과 stack의 top이 일치하면 stack을 pop, 정답에 +2

  let answer = 0;
  const r = [...new Array(board[0].length)].map(() => []);

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j]) {
        r[i].push(board[i][j]);
      }
    }
  }

  const stack = [];

  for (const move of moves) {
    if (r[move - 1].length > 0) {
      const picked = r[move - 1].pop();

      if (stack.length > 0 && stack[stack.length - 1] === picked) {
        stack.pop();
        answer += 2;
      } else {
        stack.push(picked);
      }
    }
  }

  return answer;
}

console.log(
  'CRANE :::',
  craneGame(
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 3],
      [0, 2, 5, 0, 1],
      [4, 2, 4, 4, 2],
      [3, 5, 1, 3, 1]
    ],
    [1, 5, 3, 5, 1, 2, 1, 4]
  )
);

function editTable(n, k, cmd) {
  // 항상 문제를 풀때, 인덱스 계산으로만 해결할 수 있는지 판단해보기
  const deleted = [];
  const up = [...new Array(n + 2)].map((_, i) => i - 1);
  const down = [...new Array(n + 1)].map((_, i) => i + 1);

  k += 1;

  for (let c of cmd) {
    if (c === 'C') {
      deleted.push(k);
      up[down[k]] = up[k];
      down[up[k]] = down[k];
      k = n < down[k] ? up[k] : down[k];
    } else if (c === 'Z') {
      const pop = deleted.pop();
      up[down[pop]] = pop;
      down[up[pop]] = pop;
    } else {
      const [command, count] = c.split(' ');

      if (command === 'U') {
        for (let i = 0; i < count; i++) {
          k = up[k];
        }
      } else if (command === 'D') {
        for (let i = 0; i < count; i++) {
          k = down[k];
        }
      }
    }
  }

  const answer = new Array(n).fill('O');

  for (const i of deleted) {
    answer[i - 1] = 'X';
  }

  return answer.join('');
}

// console.log(editTable(8, 2, ['D 2', 'C', 'U 3', 'C', 'D 4', 'C', 'U 2', 'Z', 'Z']));
// console.log(editTable(8, 2, ['D 2', 'C', 'U 3', 'C', 'D 4', 'C', 'U 2', 'Z', 'Z']) === 'OOOOXOOO');

function parentheses(s) {
  const stack = [];

  for (string of s) {
    if (string === '(') {
      stack.push(string);
    } else {
      if (stack.length > 0) {
        stack.pop();
      }
    }
  }

  return stack.length === 0;
}

function binary(decimal) {
  const stack = [];

  while (decimal > 0) {
    const remain = decimal % 2;
    stack.push(remain);
    decimal = Math.floor(decimal / 2);
  }

  return stack.reverse().join('');
}

function rotateParentheses(s) {
  // s의 길이만큼 돌려서 괄호가 쌍이 맞는지 체크해야함
  // s를 직접 돌리기보단 인덱스를 활용해서 돌린걸 가정해서 계산하는 것이 좋은 방법
  const rotateLength = s.length;
  let answer = 0;

  // for 문을 이중으로 돌리는 이유는 인덱스로만 돌린걸 계산하기 위함임
  // 또한 i 를 s.length만큼 돌리는 이유는 마지막 루프가 즉 s.length이기 때문에
  // s.length만큼 회전한 것을 의미하기 때문이다.
  for (let i = 0; i < s.length; i++) {
    const stack = [];
    let isCorrect = true;

    for (let j = 0; j < rotateLength; j++) {
      // (i + j) % rotateLength의 이유는 rotateLength를 벗어났을때를 방지하기 위함이다
      const cursor = s[(i + j) % rotateLength];

      if (cursor === '(' || cursor === '{' || cursor === '[') {
        stack.push(cursor);
      } else {
        if (stack.length === 0) {
          isCorrect = false;
          break;
        } else {
          const top = stack[stack.length - 1];

          if (cursor === ')' && top === '(') {
            stack.pop();
          } else if (cursor === '}' && top === '{') {
            stack.pop();
          } else if (cursor === ']' && top === '[') {
            stack.pop();
          } else {
            isCorrect = false;
          }
        }
      }
    }

    // 매 루프가 종료 될때마다 isCorrect를 먼저 체크한다.
    // !isCorrect의 의미는 맞출 괄호가 없다
    if (isCorrect && stack.length === 0) {
      answer += 1;
    }
  }

  return answer;
}

function pairChecker(s) {
  const stack = [];

  for (char of s) {
    if (stack.length > 0 && stack[stack.length - 1] === char) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0 ? 1 : 0;
}

// pairChecker('cdcd');

function stock(prices) {
  const answer = new Array(prices.length).fill(0);
  const n = prices.length;
  const stack = [0];

  for (let i = 1; i < n; i++) {
    while (stack.length > 0 && prices[i] < prices[stack[stack.length - 1]]) {
      const j = stack.pop();
      answer[j] = i - j;
    }
    stack.push(i);
  }

  while (stack.length > 0) {
    const j = stack.pop();
    answer[j] = n - 1 - j;
  }

  return answer;
}

// stock([1, 2, 3, 2, 3]);
