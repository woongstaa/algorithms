### 33. Search in Rotated Sorted Array

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

#### solution

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

### 39. Combination Sum

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

#### solution

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

### 46. Permutations

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

#### solution

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

### 56. Merge Intervals

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

#### solution

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
