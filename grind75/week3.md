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
