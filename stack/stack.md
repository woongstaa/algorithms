## 스택

## 스택의 ADT

- isEmpty
  - boolean
- push
  - void
  - 가장 최근 값을 업데이트함
- pop
  - 최근 값을 제거하고 그 값을 리턴
- top
  - 현재 스택의 가장 최근 값
- size
  - 스택에 저장된 값의 크기

```js
class Count {
  constructor() {
    this.items = [];
  }

  push(x) {
    this.items.push(x);
    return this;
  }

  pop() {
    if (!this.isEmpty()) {
      return this.items.pop();
    } else {
      throw new Error('this stack is empty');
    }
  }

  top() {
    if (!this.isEmpty()) {
      return this.items[this.items.length - 1];
    } else {
      throw new Error('this stack is empty');
    }
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}
```

## 괄호 회전하기

### 문제

> 다음 규칙을 지키는 문자열을 올바른 괄호 문자열이라고 정의합니다.
> • “( )”, “[ ]”, “{ }”는 모두 올바른 괄호 문자열입니다.
> • 만약 A가 올바른 괄호 문자열이라면, “(A)”, “[A]”, “{A}”도 올바른 괄호 문자열입니다. 예를 들
> 어 “[ ]”가 올바른 괄호 문자열이므로, “( [ ] )”도 올바른 괄호 문자열입니다.
> • 만약 A, B가 올바른 괄호 문자열이라면, AB도 올바른 괄호 문자열입니다. 예를 들어 “{ }”와
> “( [ ] )”가 올바른 괄호 문자열이므로, “{ } ( [ ] )”도 올바른 괄호 문자열입니다.
> 대괄호, 중괄호, 그리고 소괄호로 이루어진 문자열 s가 매개변수로 주어집니다. 이 s를 왼쪽으로
> x (0 ≤ x < (s의 길이)) 칸만큼 회전시켰을 때 s가 올바른 괄호 문자열이 되게 하는 x의 개수를 반
> 환하는 solution( ) 함수를 완성하세요.

### 풀이

```js
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
```

## 짝지어 제거하기

### 문제

> 알파벳 소문자로 구성된 문자열에서 같은 알파벳이 2개 붙어 있는 짝을 찾습니다. 짝을 찾은 다음
> 에는 그 둘을 제거한 뒤 앞뒤로 문자열을 이어붙입니다. 이 과정을 반복해서 문자열을 모두 제거한
> 다면 짝지어 제거하기가 종료됩니다. 문자열 S가 주어졌을 때 짝지어 제거하기를 성공적으로 수행
> 할 수 있는지 반환하는 함수를 완성하세요. 성공적으로 수행할 수 있으면 1을, 아니면 0을 반환해
> 주면 됩니다. 예를 들어 문자열 S가 baabaa라면
> • baabaa → bbaa → aa
> 순서로 문자열을 모두 제거할 수 있으므로 1을 반환합니다

### 풀이

```js
// 문제의 핵심은 스택에 쌓인 top과 현재 값을 비교하는 것
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
```

## 주식 가격

### 문제

> n초 간의 주가를 초 단위로 기록한 배열 prices가 매개변수로 주어질 때, 각 초의 주가를 기준으로
> 해당 초부터 n초 사이에 가격이 떨어지지 않은 시간은 몇 초인지 배열에 담아 반환하는 solution( )
> 함수를 완성하세요

### 풀이

```js
function stock(prices) {
  // answer은 정답 제출을 위한 배열, 기본 값을 0으로 채워 놓음
  const answer = new Array(prices.length).fill(0);
  const n = prices.length;
  // 스택을 0을 미리 채워놓은 이유는 첫 값은 떨어지지 않기 때문
  const stack = [0];

  // 스택에는 가격이 유지된 길이를 계산하기 위해 루프 돌고 있는 인덱스를 채워준다
  for (let i = 1; i < n; i++) {
    // while 문으로 이전 값이랑 현재 값을 비교해 떨어졌는지에 대해 계속 비교해준다
    // stack은 인덱스를 담고 있기 때문에 top값을 이용해 대소를 비교,
    // 만약 가격이 떨어졌다면 스택에서 이전 인덱스를 제거 (가격이 떨어졌기 때문에)
    while (stack.length > 0 && prices[i] < prices[stack[stack.length - 1]]) {
      const j = stack.pop();
      // answer[j]의 값을 현재 인덱스 - 스택 top값으로 해주는 이유는
      // 그 만큼 가격이 유지됐다는 의미
      answer[j] = i - j;
    }
    // 모든 가격비교가 끝나면 현재 인덱스를 스택에 채워준다
    stack.push(i);
  }

  // 가격비교 이후에 스택을 이용헤 가격이 유지된 기간을 확정시켜준다
  while (stack.length > 0) {
    const j = stack.pop();
    answer[j] = n - 1 - j;
  }

  return answer;
}
```

## 크레인 인형 뽑기 게임

### 문제

> 게임개발자인 "죠르디"는 크레인 인형뽑기 기계를 모바일 게임으로 만들려고 합니다.
> "죠르디"는 게임의 재미를 높이기 위해 화면 구성과 규칙을 다음과 같이 게임 로직에 반영하려고 합니다.
>
> 게임 화면은 "1 x 1" 크기의 칸들로 이루어진 "N x N" 크기의 정사각 격자이며 위쪽에는 크레인이 있고 오른쪽에는 바구니가 있습니다. (위 그림은 "5 x 5" 크기의 예시입니다). 각 격자 칸에는 다양한 인형이 들어 있으며 인형이 없는 칸은 빈칸입니다. 모든 인형은 "1 x 1" 크기의 격자 한 칸을 차지하며 격자의 가장 아래 칸부터 차곡차곡 쌓여 있습니다. 게임 사용자는 크레인을 좌우로 움직여서 멈춘 위치에서 가장 위에 있는 인형을 집어 올릴 수 있습니다. 집어 올린 인형은 바구니에 쌓이게 되는 데, 이때 바구니의 가장 아래 칸부터 인형이 순서대로 쌓이게 됩니다. 다음 그림은 [1번, 5번, 3번] 위치에서 순서대로 인형을 집어 올려 바구니에 담은 모습입니다.
>
> 만약 같은 모양의 인형 두 개가 바구니에 연속해서 쌓이게 되면 두 인형은 터뜨려지면서 바구니에서 사라지게 됩니다. 위 상태에서 이어서 [5번] 위치에서 인형을 집어 바구니에 쌓으면 같은 모양 인형 두 개가 없어집니다.
>
> 크레인 작동 시 인형이 집어지지 않는 경우는 없으나 만약 인형이 없는 곳에서 크레인을 작동시키는 경우에는 아무런 일도 일어나지 않습니다. 또한 바구니는 모든 인형이 들어갈 수 있을 만큼 충분히 크다고 가정합니다. (그림에서는 화면표시 제약으로 5칸만으로 표현하였음)
>
> 게임 화면의 격자의 상태가 담긴 2차원 배열 board와 인형을 집기 위해 크레인을 작동시킨 위치가 담긴 배열 moves가 매개변수로 주어질 때, 크레인을 모두 작동시킨 후 터트려져 사라진 인형의 개수를 return 하도록 solution 함수를 완성해주세요.
>
> [제한사항]
> board 배열은 2차원 배열로 크기는 "5 x 5" 이상 "30 x 30" 이하입니다.
> board의 각 칸에는 0 이상 100 이하인 정수가 담겨있습니다.
> 0은 빈 칸을 나타냅니다.
> 1 ~ 100의 각 숫자는 각기 다른 인형의 모양을 의미하며 같은 숫자는 같은 모양의 인형을 나타냅니다.
> moves 배열의 크기는 1 이상 1,000 이하입니다.
> moves 배열 각 원소들의 값은 1 이상이며 board 배열의 가로 크기 이하인 자연수입니다.
>
> 입출력 예
> board moves result
> \[[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]] [1,5,3,5,1,2,1,4] 4

### 풀이

```js
function craneGame(board, moves) {
  // 1. board를 역순으로 만들면 간단하게 pop을 통해 배열을 관리할 수 있다.
  // 2. 반복문은 moves.length 만큼 돌면 된다.
  // 3. 뒤집은 board에서 빼낼 값과 stack의 top이 일치하면 stack을 pop, 정답에 +2
  let answer = 0;

  // board는 n x n의 2차원 배열이기 때문에 그 크기만큼 생성해준다.
  const r = [...new Array(board[0].length)].map(() => []);

  // board를 역순으로 돌리기 위해 board.length - 1부터 하나씩 줄여가면서 배열을 만든다
  for (let i = board.length - 1; i > -1; i--) {
    for (let j = 0; j < board.length; j++) {
      // 만약 board[4][0]의 값이 있다면?
      if (board[i][j]) {
        // r[0]에 그 값을 push
        // [[3], ... ]
        r[j].push(board[i][j]);
      }
    }
  }

  // 인형을 담을 stack
  const basket = [];

  for (const move of moves) {
    // 뒤집은 배열에 인덱스에 해당하는 move - 1 위치에 값이 있다면
    if (r[move - 1].length > 0) {
      // 뒤집은 배열을 pop해서 현황을 업데이트
      const picked = r[move - 1].pop();

      // 만약에 stack의 top 값과 pop한 값이 같다면
      // 서로 같은 값이기 때문에 pop하고 없어진 인형 갯수를 업데이트
      if (basket.length > 0 && basket[basket.length - 1] === picked) {
        basket.pop();
        answer += 2;
      } else {
        // 위 조건에 해당하지 않는다면 스택에 쌓아줌
        basket.push(picked);
      }
    }
  }

  return answer;
}
```
