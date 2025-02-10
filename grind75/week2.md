## Week 2

### 278. First Bad Version

#### description

You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

Example 1:

Input: n = 5, bad = 4
Output: 4
Explanation:
call isBadVersion(3) -> false
call isBadVersion(5) -> true
call isBadVersion(4) -> true
Then 4 is the first bad version.
Example 2:

Input: n = 1, bad = 1
Output: 1

Constraints:

1 <= bad <= n <= 231 - 1

#### solution

1. 이 문제는 처음에 이해하는 것이 어려웠는데, n의 값이 주어지고, isBadVersion이라는 함수가 주어지는데 n의 값이 잘못된 버전이라도 최초의 잘못된 버전이라는 보장이 없기 때문에 최초의 값을 찾아야 한다
2. 그리하여 그 값을 찾으려면 이진탐색을 이용해 찾아야한다.
3. 만약 isBadVersion이 참이면, 이후의 버전들은 모두 false가 리턴될 것이기 때문에 그 이하의 값들로 점점 추려내가고, 거짓이면 탐색 범위를 차근차근 올려서 찾아내야한다.

```js
function firstBadVersion(isBadVersion) {
  // 문제 자체에서 풀이가 되는 정답의 함수를 리턴해야한다
  return function (n) {
    // 이진탐색을 위해 탐색 영역을 설정해준다.
    let start = 0;
    let end = n;

    while (start < end) {
      // 중앙 값을 설정
      const mid = Math.floor(start + (end - start) / 2);

      // 중앙 값이 badVersion이면 end값을 낮춰 탐색 폭을 줄이고
      if (isBadVersion(mid)) {
        end = mid;
      } else {
        // false면 시작 값을 중앙 값 이상으로 올려 탐색 폭을 줄인다.
        start = mid + 1;
      }
    }

    return start;
  };
}
```

### 70. Climbing Stairs

#### description

You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Example 1:

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.

1. 1 step + 1 step
2. 2 steps
   Example 2:

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.

1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

Constraints:

1 <= n <= 45

#### solution

1. 피보나치 수열을 구현하는 문제
2. 이런 최적의 값, 경우의 수를 물어보는 문제는 DP를 이용해야한다
3. DP란 작은 문제를 활용해 큰 문제를 푸는 것이
4. 이 문제는 3가지의 값이 필요하며 점차 값이 쌓여 갱신하도록 유도해야한다

```js
function climbingStairs(n) {
  // n이 1이면 방법이 1개 밖에 없기 때문에 1을 리턴
  if (n === 1) {
    return 1;
  }

  let prev1 = 1;
  let prev2 = 2;

  // n이 2면 prev2가 바로 리턴, 3부터 반복문이 돌기 시작
  for (let i = 3; i < n; i++) {
    // 이 과정을 통해 값을 업데이트 시켜줌
    let curr = prev1 + prev2;
    let prev2 = prev1;
    let prev1 = curr;
  }

  // 마지막에는 결과 값 리턴
  return prev2;
}
```

### 409. Longest Palindrome

#### description

Given a string s which consists of lowercase or uppercase letters, return the length of the longest
palindrome
that can be built with those letters.

Letters are case sensitive, for example, "Aa" is not considered a palindrome.

Example 1:

Input: s = "abccccdd"
Output: 7
Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.
Example 2:

Input: s = "a"
Output: 1
Explanation: The longest palindrome that can be built is "a", whose length is 1.

Constraints:

1 <= s.length <= 2000
s consists of lowercase and/or uppercase English letters only.

#### solution

1. 이 문제는 주어진 스트링 s에서 좌우대칭이 되는 문자열의 최대길이가 얼마인가를 구하는 문제이다
2. 우선 해시테이블을 이용해 각각의 키워드가 몇개 있는지 파악
3. 키워드가 짝수라면 대칭을 이루기 때문에 정답에 포함
4. 정답이 주어진 스트링 길이보다 작다는 말은 정답 중에 홀수가 포함되었다는 의미가 되기 때문에 1을 더해준다

```js
function longestPalindrome(s) {
  let hashTable = {};
  let result = 0;

  for (const char of s) {
    hashTable[char] = (hashTable[char] || 0) + 1;

    // hashTable[char]가 홀수라고 해도 이 시점에 짝수라면 정답에 가산이 된다.
    if (hashTable[char] % 2 === 0) {
      result += 2;
    }
  }

  // s.length와 result를 비교함으로써 길이가 차이가 난다면, 반드시 정답에 홀수가 들어갔다는 의미가 되기 때문에 1을 더해준다
  return s.length > result ? result + 1 : result;
}
```
