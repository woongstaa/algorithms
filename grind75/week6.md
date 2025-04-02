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
