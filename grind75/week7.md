## 11. Container With Most Water

You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

Example 1:

Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
Example 2:

Input: height = [1,1]
Output: 1

Constraints:

n == height.length
2 <= n <= 105
0 <= height[i] <= 104

### solution

1. 이 문제는 투 포인터를 이용해 계산한 값 중 가장 큰 값을 리턴하는 방식으로 풀이한다

```js
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let max = 0;

  while (left < right) {
    const w = right - left;
    const h = Math.min(height[left], height[right]);
    const size = w * h;

    max = Math.max(max, size);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return max;
}
```

## 17. Letter Combinations of a Phone Number

Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

Example 1:

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Example 2:

Input: digits = ""
Output: []
Example 3:

Input: digits = "2"
Output: ["a","b","c"]

### solution

1. 숫자 키패드를 눌렸을때 어떤 키워드 조합이 나오는지 배열로 리턴하는 문제
2. 백트래킹을 이용해 완성된 조합을 만들자

```js
function letterCombinations(digits) {
  if (!digits.length) return [];

  const result = [];

  // 키패드 구조를 미리 객체로 생성
  const keypad = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz'
  };

  function backtrack(start, path) {
    // 키패드 눌린 길이와 조합한 값의 길이가 같을 때, 결과값에 푸시
    if (start === digits.length) {
      result.push(path);
      return;
    }

    const keys = keypad[digits[start]];

    for (const key of keys) {
      backtrack(start + 1, path + key);
    }
  }

  backtrack(0, '');

  return result;
}
```

## 79. Word Search

Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

Example 1:

Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
Example 2:

Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
Example 3:

Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false

Constraints:

m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board and word consists of only lowercase and uppercase English letters.

Follow up: Could you use search pruning to make your solution faster with a larger board?

### solution

1. 조건에 맞는 값을 추적하는 dfs를 이용해 백트래킹을 구현하는 것이 좋음

```js
function exist(board, word) {
  const m = board.length;
  const n = board[0].length;
  const directions = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0]
  ];

  function dfs(x, y, index) {
    // word 길이와 index의 값이 같다는것은 끝까지 도달했다는 의미기 때문에 true를 리턴
    if (index === word.length) return true;

    // dfs 탈출 조건인 매트릭스 범위 내 + 탐색하고자 하는 값이 현재 word의 순서와 다른지
    if (x < 0 || x >= m || y < 0 || y >= n || board[x][y] !== word[index]) return false;

    // 임시로 값을 복사한 뒤에 방문했다는 의미로 '#'으로 값을 잠시 바꿈
    const temp = board[x][y];
    board[x][y] = '#';

    // 인근 4방향으로 dfs를 재귀로 호출해 탐색
    for (const [dx, dy] of directions) {
      if (dfs(dx + x, dy + y, index + 1)) return true;
    }

    // 백트래킹을 위해 원래 값으로 되돌림
    board[x][y] = temp;

    return false;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 첫글자가 같아야 dfs를 동작시켜 이후를 탐색하도록 조건문을 걸어둠
      if (board[i][j] === word[0] && dfs(i, j, 0)) {
        return true;
      }
    }
  }

  // 위 이중 반복문에서 true를 리턴 못받으면 결국 word의 값이 없는거라는 의미
  return false;
}
```
