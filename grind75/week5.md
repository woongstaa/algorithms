## 33. Search in Rotated Sorted Array

There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

Example 1:

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
Example 2:

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
Example 3:

Input: nums = [1], target = 0
Output: -1

Constraints:

1 <= nums.length <= 5000
-104 <= nums[i] <= 104
All values of nums are unique.
nums is an ascending array that is possibly rotated.
-104 <= target <= 104

### solution

1. 이 문제는 정렬된 배열이 특정구간에 틀어져있는 배열이 주어지며, 타겟의 인덱스를 찾아 리턴하는 문제
2. 이진탐색을 이용해 구현

```js
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // mid 기준왼쪽이 정렬된 배열이라면
    if (nums[left] <= nums[mid]) {
      // target값이 mid기준 왼쪽에 위치한다면
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1; // 오른쪽 커서를 mid 보다 낮게 설정해 탐색 영역을 왼쪽으로 재설정
      } else {
        left = mid + 1; // 반대의 경우는 탐색 영역을 오른쪽으로 재설정
      }
    } else {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  // 위 루프에서 해결되지 않으면 찾고자하는 값이 없기 때문에 -1을 리턴
  return -1;
}
```

## 39. Combination Sum

Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

Example 1:

Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
Example 2:

Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
Example 3:

Input: candidates = [2], target = 1
Output: []

Constraints:

1 <= candidates.length <= 30
2 <= candidates[i] <= 40
All elements of candidates are distinct.
1 <= target <= 40

### solution

1. 이 문제는 트리구조처럼 하나씩 노드를 타고 내려가 조건에 맞는 값들을 찾고
2. 조건에 맞지 않으면 백트래킹 방법을 이용헤 직전 노드를 변경하여 기준에 맞는 값을 찾는 문제이다.
3. 백트래킹은 dfs를 이용하여 구현한다.

```js
function combinationSum(candidates, target) {
  const result = [];

  // backtrack을 구현하기 위해 dfs 함수 사용
  function backtrack(start, combi, sum) {
    // 결과값에 푸시하는 기준
    if (sum === target) {
      result.push([...combi]);
      return;
    }

    // 가지치기 기준
    if (sum > target) {
      return;
    }

    // i = start의 이유는 result에 푸시할 값의 중복을 피하기 위해
    for (let i = start; i < candidates.length; i++) {
      // 재귀 호출 전, 값을 추가
      combi.push(candidates[i]);
      // 재귀 호출
      backtrack(i, combi, sum + candidates[i]);
      // 재귀 호출한 함수가 여기까지 도달하면
      // pop()을 통해 candidates[i]값을 업데이트하기 위한 준비
      combi.pop();
    }
  }

  // initialize
  backtrack(0, [], 0);

  return result;
}
```

## 46. Permutations

Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

Example 1:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
Example 2:

Input: nums = [0,1]
Output: [[0,1],[1,0]]
Example 3:

Input: nums = [1]
Output: [[1]]

Constraints:

1 <= nums.length <= 6
-10 <= nums[i] <= 10
All the integers of nums are unique.

### solution

1. 이 문제 역시 백트래킹을 이용해 순열을 구현하는 문제
2. 핵심은 노드의 사용여부 체크

```js
function permute(nums) {
  const result = [];

  // 백트래킹을 위해 dfs 함수 생성
  // 인자는 조합을 위한 배열, 중복을 피하기 위해 원본 배열 속 특정 인덱스의 사용 유무
  function backtrack(combi, used) {
    // 결과값에 푸시하기 위한 기준
    if (combi.length === nums.length) {
      result.push([...combi]);
      return;
    }

    // 이번에는 결과값에 푸시하는 값이 순서가 다르기만해도 되기 때문에 0부터 시작
    for (let i = 0; i < nums.length; i++) {
      // 특정 인덱스를 사용했다면 스킵을 통해 다음 반복으로
      if (used[i]) continue;

      // 재귀 호출하기전 값 업데이트
      combi.push(nums[i]);
      used[i] = true;

      backtrack(combi, used);

      // 함수가 여기까지 도달했다는건 위 호출에서 조건에 만족하지 않았기 때문에
      // 다음 조합으로 넘어가기 위한 작업
      combi.pop();
      used[i] = false;
    }
  }

  // initialize
  backtrack([], Array(nums.length).fill(false));

  return result;
}
```

## 56. Merge Intervals

Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

Example 1:

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.

Constraints:

1 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 104

### solution

1. 이 문제는 이전 값과 다음 값이 겹치는 영역이 있으면 병합하는 문제이다.
2. 스택을 활용해 top을 다음 값과 비교하여 병합하도록 로직을 구성한다.
3. 또한 주어진 배열을 시작점 기준으로 오름차순 정렬시켜 계산을 보다 편하게 하도록 한다.

```js
function merge(interval) {
  // 우선 주어진 값의 시작점 기준 오름차순 정렬
  intervals.sort((a, b) => a[0] - b[0]);

  // 첫번째 값은 미리 넣어둠
  const result = [intervals[0]];

  // 미리 첫 값을 넣어뒀기 때문에 1부터 반복문 시작
  for (let i = 1; i < intervals.length; i++) {
    // 추적할 타겟 위치
    const last = result[result.length - 1];

    // 현재 커서의 시작 값이 stack의 top[1]값 보다 작다면 병합시켜야함
    if (last[1] >= intervals[i][0]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      // 그렇지 않다면 스택에 새로 push
      result.push(intervals[i]);
    }
  }

  return result;
}
```

## 236. Lowest Common Ancestor of a Binary Tree

Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

Example 1:

Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
Example 2:

Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.
Example 3:

Input: root = [1,2], p = 1, q = 2
Output: 1

Constraints:

The number of nodes in the tree is in the range [2, 105].
-109 <= Node.val <= 109
All Node.val are unique.
p != q
p and q will exist in the tree.

### solution

1. 이진 트리 구조에서 공통된 최소 트리 노드를 찾는 문제
2. 최소한의 트리를 찾는거기 때문에 p, q 둘 중 하나만 맞아도 우리가 원하는 값을 구할 수 있다.
3. dfs를 이용해 원하는 값이 있는지 찾자

```js
function lowestCommonAncestor(root, p, q) {
  // 노드가 비었거나, p 혹은 q와 같다면 노드를 리턴
  if (!root || root === p || root === q) {
    return root;
  }

  // 양 하위 노드를 재귀로 선언
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  // 양 하위 노드들이 p혹은 q와 일치하는 노드라면
  if (left && right) {
    // 지금 상위노드가 최소 공통 트리노드기 때문에 이 노드를 리턴
    return root;
  }

  // 양쪽 하위 노드가 다 일치하지는 않지만, 한 쪽이 일치한다면 그 노드가 최소공통노드가 되기 때문에 그 노드를 리턴
  return left || right;
}
```

## 981. Time Based Key-Value Store

Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.

Implement the TimeMap class:

TimeMap() Initializes the object of the data structure.
void set(String key, String value, int timestamp) Stores the key key with the value value at the given time timestamp.
String get(String key, int timestamp) Returns a value such that set was called previously, with timestamp_prev <= timestamp. If there are multiple such values, it returns the value associated with the largest timestamp_prev. If there are no values, it returns "".

Example 1:

Input
["TimeMap", "set", "get", "get", "set", "get", "get"]
[[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]
Output
[null, null, "bar", "bar", null, "bar2", "bar2"]

Explanation
TimeMap timeMap = new TimeMap();
timeMap.set("foo", "bar", 1); // store the key "foo" and value "bar" along with timestamp = 1.
timeMap.get("foo", 1); // return "bar"
timeMap.get("foo", 3); // return "bar", since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is "bar".
timeMap.set("foo", "bar2", 4); // store the key "foo" and value "bar2" along with timestamp = 4.
timeMap.get("foo", 4); // return "bar2"
timeMap.get("foo", 5); // return "bar2"

Constraints:

1 <= key.length, value.length <= 100
key and value consist of lowercase English letters and digits.
1 <= timestamp <= 107
All the timestamps timestamp of set are strictly increasing.
At most 2 \* 105 calls will be made to set and get.

### solution

1. 타임 스탬프가 있는 Map 자료구조를 만드는 문제
2. set(), get() 메서드를 만들어야함
   1. set()은 객체로 만들어 `{ [key]: { value, timestamp }[] }` 타입을 가진 자료구조로 생성
   2. get()은 조금 까다로운데, 조회하고자하는 key의 timestamp값이 기록된 값의 timestamp보다 높다면 가장 가까운 값을 리턴해야함
      1. 이 과정에서 그냥 for문을 돌리기보단 이진탐색을 이용해 보다 빠르게 탐색하도록한다.

```js
function TimeMap() {
  this.root = {};
}

TimeMap.prototype.set = function (key, value, timestamp) {
  // 우선 객체에 키, 밸류가 없으면 빈 배열을 생성해줌
  if (!this.root[key]) {
    this.root[key] = [];
  }
  // { value, timestamp } 값을 key 배열에 push해줌
  this.root[key].push({ value, timestamp });
};

TimeMap.prototype.get = function (key, timestamp) {
  // 해당 key에 대한 값 목록이 없다면 빈 문자열 반환
  const entries = this.root[key];
  if (!entries) return '';

  // 이진 탐색을 위한 커서 설정
  let left = 0;
  let right = entries.length - 1;

  // 조건을 만족하는 가장 최근 값(가장 큰 timestamp)을 저장할 변수
  let value = '';

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // 현재 timestamp가 target 이하라면 후보로 저장하고, 더 큰 값이 있는지 오른쪽 탐색
    if (entries[mid].timestamp <= timestamp) {
      value = entries[mid].value;
      left = mid + 1;
    } else {
      // timestamp가 더 작으면 왼쪽으로 탐색 범위 줄이기
      right = mid - 1;
    }
  }

  // 후보로 저장한 값 반환 (없으면 빈 문자열)
  return value;
};
```

### 721. Accounts Merge

Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails representing emails of the account.

Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name.

After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order. The accounts themselves can be returned in any order.

Example 1:

Input: accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
Output: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
Explanation:
The first and second John's are the same person as they have the common email "johnsmith@mail.com".
The third John and Mary are different people as none of their email addresses are used by other accounts.
We could return these lists in any order, for example the answer [['Mary', 'mary@mail.com'], ['John', 'johnnybravo@mail.com'], 
['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com']] would still be accepted.
Example 2:

Input: accounts = [["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]]
Output: [["Ethan","Ethan0@m.co","Ethan4@m.co","Ethan5@m.co"],["Gabe","Gabe0@m.co","Gabe1@m.co","Gabe3@m.co"],["Hanzo","Hanzo0@m.co","Hanzo1@m.co","Hanzo3@m.co"],["Kevin","Kevin0@m.co","Kevin3@m.co","Kevin5@m.co"],["Fern","Fern0@m.co","Fern1@m.co","Fern5@m.co"]]

Constraints:

1 <= accounts.length <= 1000
2 <= accounts[i].length <= 10
1 <= accounts[i][j].length <= 30
accounts[i][0] consists of English letters.
accounts[i][j] (for j > 0) is a valid email.

### solution

1. 중복된 이메일이 있으면 병합해야하기 때문에 유니온-파인드를 이용해서 푸는 것이 좋다

```js
const find = (parents, x) => {
  if (parents[x] === x) {
    return x;
  }

  // 부모 노드가 자기 자신이 아니라면, 재귀적으로 최상위 부모를 찾고,
  // 해당 노드의 부모를 최상위 부모로 설정함으로써 경로를 압축한다.
  parents[x] = find(parents, parents[x]);

  return parents[x];
};

const union = (parents, x, y) => {
  const root1 = find(parents, x);
  const root2 = find(parents, y);

  parents[root1] = root2;
};

const parents = {};
const emailToName = {};

for (const [name, ...emails] of accounts) {
  for (const email of emails) {
    if (!parents[email]) {
      // 집합 생성 처음에는 부모가 자기자신
      parents[email] = email;
    }

    emailToName[email] = name;
  }

  const firstEmail = emails[0];

  for (let i = 1; i < emails.length; i++) {
    // 해당 계정의 모든 이메일을 첫 번째 이메일과 같은 그룹으로 합쳐줌
    union(parents, firstEmail, emails[i]);
  }
}

const groups = {};

for (const email in parents) {
  // email 엮여있는 최종 부모값(첫 이메일)
  const root = find(parents, email);

  if (!groups[root]) {
    groups[root] = [];
  }

  // 최종 부모값 기준으로 연결된 메일들을 배열로 푸시
  groups[root].push(email);
}

const result = [];

// 각 그룹의 이메일들을 정렬하고, 이름을 붙여서 최종 결과에 추가
for (const group in groups) {
  const emails = groups[group];
  emails.sort();
  result.push([emailToName[group], ...emails]);
}

return result;
```

## 75. Sort Colors

Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

Example 1:

Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
Example 2:

Input: nums = [2,0,1]
Output: [0,1,2]

Constraints:

n == nums.length
1 <= n <= 300
nums[i] is either 0, 1, or 2.

Follow up: Could you come up with a one-pass algorithm using only constant extra space?

### solution

1. 주어진 배열 속 값은 0, 1, 2로 구성
2. 배열은 랜덤한 순서로 주어지는데 이를 오름차순 정렬하는 문제
3. 이 문제는 전형적인 네덜란드 국기 알고리즘 문제
4. 커서 3개(low, mid, high)를 이용해 문제를 해결

> 처음엔 정렬을 커서를 두개만 두고 양쪽을 비교하면 될 줄 알았지만, 제대로 동작하지 않았음

```js
function sortColors(nums) {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;

  // 항상 mid를 기준으로 값을 업데이트 하기 때문에 mid가 high보다 커지면 정렬을 완료했다 판단
  while (mid <= high) {
    // case1. nums[mid] === 0 이면 nums[mid]가 왼쪽으로 가야함
    if (nums[mid] === 0) {
      // 구조분해할당을 통해 스왑
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      // 값을 스왑했기 때문에 커서들을 업데이트
      low++;
      mid++;
    }
    // case2. nums[mid] === 1이면 올바르기 때문에 그대로 두고 mid 커서를 다음으로 옮김
    else if (nums[mid] === 1) {
      mid++;
    }
    // case3. nums[mid] === 2, 값이 오른쪽으로 가야함
    else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }

  return nums;
}
```
