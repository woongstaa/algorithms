## Week 3

### Insert Interval

#### description

You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return intervals after the insertion.

Note that you don't need to modify intervals in-place. You can make a new array and return it.

Example 1:

Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
Example 2:

Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

Constraints:

0 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 105
intervals is sorted by starti in ascending order.
newInterval.length == 2
0 <= start <= end <= 105

#### solution

1. 이 문제는 intervals라는 간격이 기록되어있는 배열 속에서, newInterval배열을 병합시키는 작업이 필요하다.
2. 반복문을 돌리면서 원하는 순서에 newInterval배열을 병합시켜야하므로 while문을 사용하도록한다.
3. 병합될 기준은
   1. intervals[i][1]\(끝나는 시간)이 newInterval[0]\(시작시간)보다 작다면 패스
   2. intervals[i][0]이 newInterval[1]이하라면 병합될 대상
      1. 시작시간과 끝나는 시간은 Math.min, Math.max를 이용해 최소 최대값으로 값을 업데이트
4. 나머지들은 이후에 차례대로 push()

```js
function insertInterval(intervals, newInterval) {
  const result = [];

  let start = 0;
  let end = intervals.length;

  // 조건부 반복문 시작
  // 이 조건문은 병합할 필요가 없는 interval들을 result에 push해준다
  while (start < end && intervals[start][1] < newInterval[0]) {
    result.push(intervals[start]);
    start++;
  }

  // 병합 기준에 부합하면 값들을 하나로 병합하기 위한 조건부 반복문 시작
  // 기존 시작시간이 새로운 종료시간에 포함된다면, 병합 기준이 됨
  // 이 기준은 위 while문 덕분에 병합기준에 부합하게 되는 것
  while (start < end && intervals[start][0] <= newInterval[1]) {
    // 병합할 값들 업데이트
    newInterval[0] = Math.min(intervals[start][0], newInterval[0]);
    newInterval[1] = Math.max(intervals[start][1], newInterval[1]);
    start++;
  }

  // 위 while문에서 만든 병합된 값 푸시
  result.push(newInterval);
  // 이후 값들 푸시
  result.push(...interval.slice(start));

  return result;
}
```

### 542. 01 Matrix

#### description

Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

The distance between two cells sharing a common edge is 1.

Example 1:

Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
Output: [[0,0,0],[0,1,0],[0,0,0]]
Example 2:

Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
Output: [[0,0,0],[0,1,0],[1,2,1]]

Constraints:

m == mat.length
n == mat[i].length
1 <= m, n <= 104
1 <= m \* n <= 104
mat[i][j] is either 0 or 1.
There is at least one 0 in mat.

#### solution

1. 이 문제는 주어진 매트릭스의 각 지점에서 가장 가까운 0이 몇 칸내에 인접해있는지 묻는 문제
2. 이런 최소범위 문제는 bfs로 풀어야한다
3. 주어진 매트릭스에서 각 지점이 0이면 이미 0이기 때문에 정답도 0이 됨
4. 그 외의 값은 Infinity로 최대값을 주어 탐색범위가 됐을 때, 비교를 통하여 최소값으로 계속 업데이트 시켜줌
5. 이를 위해 큐를 활용 0인 좌표를 넣어 네 방향으로 탐색하여 최소값을 업데이트 시켜준다.

```js
function matrix(mat) {
  const m = mat.length;
  const n = mat[0].length;

  // 결과 배열(result)을 무한대로 초기화.
  // 이 배열은 각 칸까지 0으로부터의 최단 거리를 저장하는 역할을 함.
  const result = Array.from({ length: m }, () => Array(n).fill(Infinity));
  const queue = []; // BFS 탐색을 위한 큐

  // 4방향(상, 하, 좌, 우) 이동을 위한 offset 배열
  const directions = [
    [0, 1], // 오른쪽
    [0, -1], // 왼쪽
    [-1, 0], // 위쪽
    [1, 0] // 아래쪽
  ];

  // 원본 매트릭스(mat)에서 값이 0인 위치는 이미 0에 인접한 것이므로
  // 결과 배열에 0으로 기록하고, 이 좌표들을 큐에 추가한다.
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        result[i][j] = 0;
        queue.push([i, j]);
      }
    }
  }

  // BFS 탐색: 큐에서 하나씩 좌표를 꺼내면서 인접한 칸들을 검사
  while (queue.length) {
    // 큐에서 현재 위치 [x, y]를 꺼낸다.
    const [x, y] = queue.shift();

    // 상하좌우 네 방향으로 이동하여 새로운 좌표를 계산한다.
    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      // 새로운 좌표가 행렬 범위 내에 있는지 확인
      if (newX >= 0 && newX < m && newY >= 0 && newY < n) {
        // 현재 위치까지의 최단 거리(result[x][y])에 한 칸 이동한 거리 1을 더한 값과,
        // 새 좌표의 기존 값(result[newX][newY])을 비교한다.
        // 만약 result[newX][newY]가 더 크다면, 더 짧은 경로를 찾은 것이므로 업데이트 한다.
        if (result[newX][newY] > result[x][y] + 1) {
          result[newX][newY] = result[x][y] + 1;
          // 업데이트된 좌표를 큐에 추가하여, 이 좌표를 기준으로 다시 탐색을 진행한다.
          queue.push([newX, newY]);
        }
      }
    }
  }

  return result;
}
```

### 973. K Closest Points to Origin

#### description

Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

Example 1:

Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation:
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
Example 2:

Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]
Explanation: The answer [[-2,4],[3,3]] would also be accepted.

Constraints:

1 <= k <= points.length <= 104
-104 <= xi, yi <= 104

#### solution

1. 이 문제는 주어진 좌표들이 원점(0, 0)으로 부터 유클리드 거리가 얼마나 되고, 그 중에 최소값을 k개 찾는 문제이다.
2. 유클리드 거리란 원점부터 좌표까자의 x, y 값의 차이를 각각 제곱하여 더한 값이다.

```js
function kClosest(points, k) {
  const result = [];
  const powPoints = [];

  // 유클리드 거리와 값의 인덱스를 기록해놓는다
  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i];
    powPoints.push([x * x + y * y, i]);
  }

  // 유클리드 거리 기준으로 올림차순 정렬을 한다
  const sorted = powPoints.sort((a, b) => a[0] - b[0]);

  // k값 만큼 결과값에 원본 좌표를 푸시해준다
  for (let i = 0; i < k; i++) {
    result.push(points[sorted[i]]);
  }

  return result;
}
```

### 3. Longest Substring Without Repeating Characters

#### solution

1. 이 문제는 연속된 스트링 중에 중복 없이 가장 긴 스트링의 길이를 구하는 문제
2. 투포인터를 이용해 포인터를 동적으로 움직여 해결

```js
function lengthOfLongestSubstring(s) {
  let start = 0; // 시작 포인터
  let max = 0; // 가장 긴 스트링의 길이

  const set = new Set(); // 중복을 피하기위해 Set자료구조 선택

  // 끝 포인터를 반복문으로 돌려 한칸씩 이동시킴
  for (let end = 0; end < s.length; end++) {
    // 2. Set에 현재 s[end]와 같은 값이 있다면
    // 2-2. 중복이 없을 때까지 계속 이 동작을 한다
    while (set.has(s[end])) {
      // 2-1. 포인터의 시작 지점부터 하나씩 지운다
      set.delete(s[start]);
      start++;
    }

    // 1. s[end]를 Set에 넣음
    set.add(s[end]);

    // 기존 값과 최신 값 중 더 큰 값으로 갱신한다
    max = Math.max(max, end - start + 1);
  }

  return max;
}
```
