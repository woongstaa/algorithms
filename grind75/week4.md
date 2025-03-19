## Week 4

### 207. Course Schedule

There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.

Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take.
To take course 1 you should have finished course 0. So it is possible.
Example 2:

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take.
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

Constraints:

1 <= numCourses <= 2000
0 <= prerequisites.length <= 5000
prerequisites[i].length == 2
0 <= ai, bi < numCourses
All the pairs prerequisites[i] are unique.

#### solution

1. 이 문제는 위상정렬이라는것을 이용해 풀어야한다.
2. 위상정렬은 순서가 정해져있는 작업을 차례로 수행해야할때 그 순서를 결정하기 위해 사용하는 기법
3. 위상정렬을 위해 일의 우선순위를 정할 값과, 사전수강과목과 수강과목의 순환참조가 일어나거나 변수로 주어지는 전체 강의 갯수를 체크하기 위해 `adjacent`, `indegree`, `count` 같은 값들이 필요하다
   1. adjacent: 현재 값과 인접 값의 간선을 구현할 그래프 노드, 이 문제에서는 강의 이름이 숫자기 때문에 배열의 인덱스를 활용하여 간단하게 구현
   2. inDegree: 위상정렬을 위한 강의의 우선순위를 기록하는 값, 여기서는 필요한 선행 강의의 갯수가 됨
   3. count: 위 두 값들을 이용하여 큐를 생성하고 bfs를 이용하는데 이때 순회한 횟수만큼 값을 올려 인자로 받은 `numCourses`랑 비교하게 될 값

```js
function canFinish(numCourses, prerequisites) {
  // 인접 리스트(adjacent): 각 코스 b가 선행되어야 하는 코스 a들의 리스트
  const adjacent = Array.from({ length: numCourses }, () => []);
  // 진입차수(indegree): 각 코스 a가 듣기 위해 필요한 선행 코스의 수
  const indegree = Array(numCourses).fill(0);

  // 그래프 구성: prerequisites[i] = [a, b]는 "코스 a를 듣기 위해 코스 b를 먼저 들어야 한다"는 의미
  for (const [a, b] of prerequisites) {
    adjacent[b].push(a); // 코스 b를 선행으로 해야 코스 a 수강 가능
    indegree[a]++; // 코스 a의 진입차수를 1 증가시킴
  }

  // 진입차수가 0인 코스(선행 조건이 없는 코스)를 큐에 추가
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) {
      queue.push(i);
    }
  }

  let count = 0; // 처리한 코스 수

  // BFS를 통해 위상 정렬 수행
  while (queue.length) {
    const curr = queue.shift();
    count++; // 현재 코스 처리 완료

    // 현재 코스에 연결된 모든 후속 코스의 진입차수를 줄임
    for (const neighbor of adjacent[curr]) {
      indegree[neighbor]--;
      // 만약 neighbor의 진입차수가 0이 되면, 해당 코스는 이제 수강 가능하므로 큐에 추가
      if (indegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  // 모든 코스를 처리했다면 count가 numCourses와 같아야 함
  return count === numCourses;
}
```

### 208. Implement Trie (Prefix Tree)

A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

Trie() Initializes the trie object.
void insert(String word) Inserts the string word into the trie.
boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.

Example 1:

Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple"); // return True
trie.search("app"); // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app"); // return True

Constraints:

1 <= word.length, prefix.length <= 2000
word and prefix consist only of lowercase English letters.
At most 3 \* 104 calls in total will be made to insert, search, and startsWith.

#### solution

1. 이 문제는 트라이라고 부르는 스트링을 키워드 단위로 아래로 내려가 트리구조 노드를 구현하는 문제다
2. 인스턴스를 생성하고, insert, search, startsWith 메서드들을 구현하는 것이 목표이다.

```js
function Trie() {
  // 루트 노드를 만들어준다.
  this.root = {};
}

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let node = this.root;
  // 키워드단위로 반복문을 돌린다.
  for (const char of word) {
    // 노드에 키워드 값이 없으면 만들어줌
    if (!node[char]) {
      node[char] = {};
    }
    // 다음 반복문에 노드 위치를 하위 노드로 변경
    node = node[char];
  }
  // 마지막에 단어가 끝났음을 알려주는 값을 추가해줌
  node.end = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let node = this.root;

  for (const char of word) {
    // 현재 노드의 값이 트라이에 없으면 이 단어가 등록되지 않았다는 의미기 때문에 false 리턴
    if (!node[char]) {
      return false;
    }

    node = node[char];
  }

  // 모든 과정을 통과하고, 현재 노드에 end값이 존재한다면 true를 리턴
  return node.end === true;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let node = this.root;

  for (const char of prefix) {
    // 노드의 값이 일치하는게 없으면 false리턴
    if (!node[char]) {
      return false;
    }

    node = node[char];
  }

  // 현재까지 들어온 키워드들이 트리에 존재하면 true 리턴
  return true;
};
```

### 322. Coin Change

You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

Example 1:

Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
Example 2:

Input: coins = [2], amount = 3
Output: -1
Example 3:

Input: coins = [1], amount = 0
Output: 0

Constraints:

1 <= coins.length <= 12
1 <= coins[i] <= 231 - 1
0 <= amount <= 104

#### solution

1. 이 문제는 DP를 이용해서 풀이하는 것이 좋다
2. 0부터 amount까지의 값들을 쌓아 올리면서 최소 코인 갯수를 쌓아올려 이전값을 활용해 계산하도록한다

```js
function coinChange(coins, amount) {
  // dp[i]는 금액 i를 만들기 위해 필요한 최소 동전 수를 저장하는 배열입니다.
  // 최대 동전 수는 amount보다 클 수 없으므로, 초기값으로 amount+1 (실제 가능한 최대값보다 큰 값)을 사용합니다.
  const dp = new Array(amount + 1).fill(amount + 1);

  // 금액 0을 만드는 데는 동전이 필요 없으므로 dp[0]은 0입니다.
  dp[0] = 0;

  // 금액 1부터 amount까지 차례로 최소 동전 수를 계산합니다.
  for (let i = 1; i <= amount; i++) {
    // 각 동전 coin을 사용해 현재 금액 i를 만들 수 있는지 확인합니다.
    for (let j = 0; j < coins.length; j++) {
      // 동전 coin을 사용할 수 있으려면, 현재 금액 i가 coin보다 크거나 같아야 합니다.
      if (i - coins[j] >= 0) {
        // 만약 동전 coin을 사용한다면, 남은 금액은 i - coins[j]가 됩니다.
        // 이미 dp[i - coins[j]]에는 금액 i - coins[j]를 만드는 데 필요한 최소 동전 수가 계산되어 있습니다.
        // 여기에 동전 coin 하나를 추가하면, 금액 i를 만드는 데 필요한 동전 수는 dp[i - coins[j]] + 1이 됩니다.
        // 이 값과 현재 dp[i] 값을 비교하여 더 작은 값으로 업데이트합니다.
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
      }
    }
  }

  // dp[amount]가 초기값(amount+1)과 같다면, 금액 amount를 만들 수 있는 조합이 없음을 의미하므로 -1을 반환합니다.
  // 그렇지 않으면 dp[amount]를 반환합니다.
  return dp[amount] !== amount + 1 ? dp[amount] : -1;
}
```

### 155. Min Stack

Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:

MinStack() initializes the stack object.
void push(int val) pushes the element val onto the stack.
void pop() removes the element on the top of the stack.
int top() gets the top element of the stack.
int getMin() retrieves the minimum element in the stack.
You must implement a solution with O(1) time complexity for each function.

Example 1:

Input
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

Output
[null,null,null,null,-3,null,0,-2]

Explanation
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top(); // return 0
minStack.getMin(); // return -2

Constraints:

-231 <= val <= 231 - 1
Methods pop, top and getMin operations will always be called on non-empty stacks.
At most 3 \* 104 calls will be made to push, pop, top, and getMin.

#### solution

1. 스택 자료구조를 구현하는 문제
2. 기존 스택과의 차이점은 최소값도 필요하다는 것
3. 전체 값에 필요한 스택과 최소 값에 필요한 스택 두가지를 관리하는 것이 포인트

```js
var MinStack = function () {
  this.root = [];
  this.minRoot = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.root.push(val);

  if (this.minRoot.length === 0 || this.getMin() >= val) {
    this.minRoot.push(val);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  const pop = this.root.pop();

  if (pop === this.getMin()) {
    this.minRoot.pop();
  }

  return pop;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.root[this.root.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.minRoot[this.minRoot.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
```

### 238. Product of Array Except Self

Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

Example 1:

Input: nums = [1,2,3,4]
Output: [24,12,8,6]
Example 2:

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]

Constraints:

2 <= nums.length <= 105
-30 <= nums[i] <= 30
The input is generated such that answer[i] is guaranteed to fit in a 32-bit integer.

Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)

#### solution

1. 이 문제는 자기 자신을 제외한 배열의 값들의 곱들을 결과물로 리턴해야하는 문제
2. 이 문제의 풀이는 주어진 배열 길이와 같은 1로 채운 배열을 생성한 뒤에
3. 왼쪽에서 한칸씩 이동하면서 그 값을 곱해가며 한칸씩 이동해주고
4. 오른쪽에서도 마찬가지로 한칸씩 이동하면서 값을 곱해가면서 한칸씩 이동해주면
5. 자기 자신을 제외한 모든 값들을 곱한 것과 결과값이 같아진다.

```js
function productExceptSelf(nums) {
  const result = new Array(nums.length).fill(1);

  let left = 1;
  for (let i = 0; i < nums.length; i++) {
    result[i] *= left;
    left *= nums[i];
  }

  let right = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= right;
    right *= nums[i];
  }

  return result;
}
```

### 98. Validate Binary Search Tree

Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.

Example 1:

Input: root = [2,1,3]
Output: true
Example 2:

Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.

Constraints:

The number of nodes in the tree is in the range [1, 104].
-231 <= Node.val <= 231 - 1

#### solution

1. 주어진 이진트리 구조에서 하위 값들이 올바르게 되어있는지 체크하는 문제
2. dfs를 이용해 존재하는 트리들을 재귀로 조건들을 체크하여 풀이

```js
function isValidBST(root) {
  const dfs = (node, lower, upper) => {
    // 노드가 없어도 유효한 BST로 간주
    if (!node) return true;

    // 노드의 값이 설정한 범위 바깥이면 false 리턴
    if (node.val <= lower || node.val >= upper) {
      return false;
    }
    // 왼쪽 하위노드와 오른쪽 하위노드를 재귀적으로 호출
    return dfs(node.left, lower, node.val) && dfs(node.right, node.val, upper);
  };

  // 첫 범위는 음의 무한대와 양의 무한대 값을 활용
  return dfs(root, -Infinity, Infinity);
}
```
