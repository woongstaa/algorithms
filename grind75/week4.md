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
