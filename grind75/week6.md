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
