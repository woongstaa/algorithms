## 139. Word Break

Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

Example 1:

Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
Example 2:

Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false

Constraints:

1 <= s.length <= 300
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 20
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.

### solution

```js
function wordBreak(s, wordDict) {
  // 사전에 있는지 빠르게 확인하기 위해 Set 사용
  const wordSet = new Set(wordDict);

  // dp[i]는 s[0:i]까지의 문자열이 사전 단어로 나눌 수 있는지를 의미
  const dp = new Array(s.length + 1).fill(false);

  // 공백 문자열은 사전 단어 없이도 만들 수 있으므로 true로 설정
  dp[0] = true;

  // i는 문자열 s의 끝 인덱스 (exclusive)
  for (let i = 1; i <= s.length; i++) {
    // j는 단어를 자를 수 있는 지점을 하나씩 탐색 (s[0:j] + s[j:i])
    for (let j = 0; j < i; j++) {
      // s[0:j]까지 잘 나눌 수 있고, s[j:i]가 사전에 있으면
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = true; // s[0:i]까지 유효하게 나눌 수 있음
        break; // 더 이상 확인할 필요 없음 → 루프 탈출
      }
    }
  }

  // 문자열 전체(s[0:s.length])를 나눌 수 있는지 여부 반환
  return dp[s.length];
}
```

## 416. Partition Equal Subset Sum

Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

Example 1:

Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
Example 2:

Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.

Constraints:

1 <= nums.length <= 200
1 <= nums[i] <= 100

### solution

1. 부분합 문제로 찾고자하는 값은 주어진 값들의 총 합의 절반
2. 주어진 값의 총합이 짝수가 아니면 두 집합으로 분류가 불가능하기 때문에 false 리턴
3. 이후는 dp를 이용해 풀이

```js
function canPartition(nums) {
  // 총합을 계산
  const total = nums.reduce((prev, curr) => prev + curr, 0);

  // 총합이 홀수면 false로 리턴
  if (total % 2 !== 0) return false;

  // 찾고자 하는 값
  const target = total / 2;
  // dp 배열 설정 및 0은 true로 설정
  // dp의 기준은 찾고자 하는 값
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;

  // 주어진 배열의 조합이 필요하기 때문에 반복문을 돌림
  for (const num of nums) {
    // 중복을 피하기 위해 i는 반대로
    for (let i = target; i >= num; i--) {
      // dp[i]가 true면 그대로
      // dp[i - num]의 의미는 현재 커서인 num을 기존 계산에서 추가했을때 true가 되는지 여부를 체크하는 것, 즉 목표값에 포함이 될 수 있는지의 여부
      dp[i] = dp[i] || dp[i - num];
    }
  }

  return dp[target];
}
```

## 54. Spiral Matrix

Given an m x n matrix, return all elements of the matrix in spiral order.

Example 1:

Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
Example 2:

Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 10
-100 <= matrix[i][j] <= 100

### solution

```js
function spiralOrder(matrix) {
  // 매트릭스 외곽 영역 설정
  // 각각의 값은 매트릭스 기준 위/아래/왼쪽/오른쪽 영역의 인덱스를 의미
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  const result = [];

  // 반복문은 위/아래, 왼/오 가 같아질 때까지만
  // 방향은 항상 왼 > 오 > 아래 > 왼 > 위 순으로 루프하기 때문에 순서대로 작성
  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    top++;

    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;

    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--;
    }

    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }

  return result;
}
```

## 78. Subsets

Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

Example 1:

Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
Example 2:

Input: nums = [0]
Output: [[],[0]]

Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
All the numbers of nums are unique.

### solution

```js
function subsets(nums) {
  const result = [];

  function backtrack(start, path) {
    // 현재 path를 결과에 추가 (부분 집합 하나 생성됨)
    result.push([...path]);

    // 현재 인덱스부터 nums의 끝까지 반복
    for (let i = start; i < nums.length; i++) {
      // 현재 원소 추가
      path.push(nums[i]);

      // 다음 인덱스로 재귀 호출 → 더 깊은 조합 탐색
      backtrack(i + 1, path);

      // 마지막에 넣은 값을 제거해서 다음 조합 준비
      path.pop(); // 백트래킹
    }
  }

  // 백트래킹 시작
  backtrack(0, []);
  return result;
}
```

## 199. Binary Tree Right Side View

Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

Example 1:

Input: root = [1,2,3,null,5,null,4]

Output: [1,3,4]

Explanation:

Example 2:

Input: root = [1,2,3,4,null,null,null,5]

Output: [1,3,4,5]

Explanation:

Example 3:

Input: root = [1,null,3]

Output: [1,3]

Example 4:

Input: root = []

Output: []

Constraints:

The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100

### solution

1. 노드가 있으면 같은 레벨에서 가장 오른쪽 노드를 리턴하는 문제
2. DFS / BFS 모두 사용 가능

#### DFS

```js
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class Queue {
  items = [];
  front = 0;
  rear = 0;

  constructor(value) {
    this.items.push(value);
    this.rear++;
  }

  push(value) {
    this.items.push(value);
    this.rear++;
  }

  pop() {
    return this.items[this.front++];
  }

  size() {
    return this.rear - this.front;
  }

  isEmpty() {
    return this.rear === this.front;
  }
}
```

```js
function rightSideView(root) {
  const result = [];

  function dfs(node, depth) {
    if (!node) return;

    if (depth === result.length) {
      result.push(node.val);
    }

    dfs(node.right, depth + 1);
    dfs(node.left, depth + 1);
  }

  dfs(root, 0);

  return result;
}
```

#### BFS

```js
function rightSideView(root) {
  if (!root) return [];

  const result = [];
  const queue = new Queue(root);

  while (!queue.isEmpty()) {
    const levelSize = queue.size();

    for (let i = 0; i < levelSize; i++) {
      const node = queue.pop();

      if (i === levelSize - 1) {
        result.push(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}
```

## 5. Longest Palindromic Substring

Given a string s, return the longest palindromic substring in s.

Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"

Constraints:

1 <= s.length <= 1000
s consist of only digits and English letters.

### solution

1. 주어진 스트링에서 대칭을 이루는 '팰린드롬'을 리턴하는 문제
2. 풀이 방법은 투포인터를 이용해 중앙에서부터 좌우로 뻗어나가는 expand around center를 이용

#### two pointer

```js
var longestPalindrome = function (s) {
  let left = 0;
  let right = 0;

  // 주어진 인덱스를 중심으로 팰린드롬 확장
  function expandAroundCenter(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    // 한 칸 더 나갔기 때문에 한 칸씩 되돌림
    return [l + 1, r - 1];
  }

  for (let i = 0; i < s.length; i++) {
    let [l1, r1] = expandAroundCenter(i, i); // 홀수 길이
    let [l2, r2] = expandAroundCenter(i, i + 1); // 짝수 길이

    if (r1 - l1 > right - left) {
      [left, right] = [l1, r1];
    }
    if (r2 - l2 > right - left) {
      [left, right] = [l2, r2];
    }
  }

  return s.slice(left, right + 1);
};
```

## 62. Unique Paths

There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to 2 \* 109.

Example 1:

Input: m = 3, n = 7
Output: 28
Example 2:

Input: m = 3, n = 2
Output: 3
Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:

1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down

Constraints:

### solution

1. 이 문제는 m x n 매트릭스에서 시작점 [0, 0]에서 [m, n] 지점까지 갈 수 있는 방법의 갯수를 구하는 문제
2. 이동방향은 오직 오른쪽/아래쪽으로 제한됨
3. 처음 [0, 0]에서 왼쪽과 위쪽 외곽을 모두 1로 설정해준다
   1. 이동 방법이 한가지 밖에 없으므로
4. 이후의 값들은 이전의 왼쪽, 위쪽 값의 합으로 설정해준다.
   1. 좌표 [1, 1] 기준 2 [1, 3] 기준 3 이런식으로 늘어난다
5. dp를 이용해 매 순간의 값들을 기록해놓고 결과값을 리턴한다
6. 2차원 매트릭스로 푸는 방법이 있고, 1차원 매트릭스로 푸는 방법이 있다
   1. 진행 방향이 항상 왼 > 오, 위 > 아래로 고정되어있기 때문에 1차원으로 압축이 가능하다

#### 2D matrix

```js
function uniquePath(m, n) {
  // 모두 1로 채운 초기 매트릭스를 생성
  const dp = Array.from({ length: m }, () => Array(n).fill(1));

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // 이전 값들의 합으로 업데이트
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  // m * n 매트릭스의 마지막 값을 리턴
  // -1을 해주는 이유는 배열의 인덱스가 0부터 시작하기 떄문
  return dp[m - 1][n - 1];
}
```

#### 1D matrix

```js
function uniquePath(m, n) {
  // m은 압축하고
  // n의 길이만큼 배열을 생성
  const dp = Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // 현재 값은 이전 값과 현재 값으로 계산을 누적시킴
      dp[j] = dp[j] + dp[j - 1];
    }
  }

  return dp[n - 1];
}
```
