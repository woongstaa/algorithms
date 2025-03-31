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
