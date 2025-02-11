## week 1

### 733. Flood fill

#### description

You are given an image represented by an m x n grid of integers image, where image[i][j] represents the pixel value of the image. You are also given three integers sr, sc, and color. Your task is to perform a flood fill on the image starting from the pixel image[sr][sc].

To perform a flood fill:

Begin with the starting pixel and change its color to color.
Perform the same process for each pixel that is directly adjacent (pixels that share a side with the original pixel, either horizontally or vertically) and shares the same color as the starting pixel.
Keep repeating this process by checking neighboring pixels of the updated pixels and modifying their color if it matches the original color of the starting pixel.
The process stops when there are no more adjacent pixels of the original color to update.
Return the modified image after performing the flood fill.

Example 1:

Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2

Output: [[2,2,2],[2,2,0],[2,0,1]]

Explanation:

From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color.

Note the bottom corner is not colored 2, because it is not horizontally or vertically connected to the starting pixel.

Example 2:

Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0

Output: [[0,0,0],[0,0,0]]

Explanation:

The starting pixel is already colored with 0, which is the same as the target color. Therefore, no changes are made to the image.

Constraints:

m == image.length
n == image[i].length
1 <= m, n <= 50
0 <= image[i][j], color < 216
0 <= sr < m
0 <= sc < n

#### solution

1. 이 문제는 image[sr][sc]에 존재하는 값이 color로 값이 바뀌는 과정을 계산
2. 만약 바뀌게 된다면
   1. 인접 값이 image[sr][sc]와 같다면 같은 color로 바뀌어야함
   2. 다르다면 그대로 두어야함
3. 이 문제는 모든 영역을 탐색해야하기 때문에 dfs/bfs가 적합함
   1. dfs는 재귀
   2. bfs는 큐를 활용해 풀이
   3. 만약 dfs에서 시간이 너무 길어지면 bfs로 바꾸는게 좋음

```js
function floodFill(image, sr, sc, color) {
  const initialColor = image[sr][sc];

  // 만약 이미 원하는 색상으로 변경되어 있다면 변경할 필요 없음
  if (initialColor === color) {
    return image;
  }

  // 이미지 크기 저장 (배열의 범위 체크에 사용)
  const rows = image.length;
  const columns = image[0].length;

  // 4방향 (상, 하, 좌, 우) 탐색을 위한 방향 벡터
  const directions = [
    [-1, 0], // 위
    [1, 0], // 아래
    [0, -1], // 왼쪽
    [0, 1] // 오른쪽
  ];

  function dfs(r, c) {
    // 경계를 벗어나거나,
    // 현재 위치(image[r][c])가 최초 색상과 다른 색이라면 탐색 종료
    if (r < 0 || r >= rows || c < 0 || c >= columns || image[r][c] !== initialColor) {
      return;
    }

    // 현재 위치를 새로운 색으로 변경
    image[r][c] = color;

    // 4방향으로 탐색
    for (const [dr, dc] of directions) {
      dfs(r + dr, c + dc);
    }
  }

  // DFS 시작
  dfs(sr, sc);

  return image;
}
```

### 235. Lowest Common Ancestor of a Binary Search Tree

#### description

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

Example 1:

Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.
Example 2:

Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.
Example 3:

Input: root = [2,1], p = 2, q = 1
Output: 2

Constraints:

The number of nodes in the tree is in the range [2, 105].
-109 <= Node.val <= 109
All Node.val are unique.
p != q
p and q will exist in the BST.

#### solution

1. 이 문제는 이진탐색트리 자료구조를 활용한 문제
2. root, p, q 모두 트리노드 자료구조를 가지고 있음.
3. root보다 작은 값을 가진 하위 노드를 p
4. 그 반대 하위 노드를 q로 가정한다는 것이 문제에 적혀있다.
5. 따라서 p.val && q.val이 root.val보다 크거나 작으면, 하위 노드로 이동해 탐색을 다시 진행한다.
6. 둘 중 하나라도 위 조건에 맞지 않다면, 현재 속한 노드 중의 한 값이 p.val 혹은 q.val과 같고, 나머지 값이 하위에 존재한다는 의미가 되므로 곧 정답이 되는 것이다.

```js
function lowestCommonAncestor(root, p, q) {
  while (root) {
    if (p.val > root.val && q.val > root.val) {
      root = root.right;
    } else if (p.val < root.val && q.val < root.val) {
      root = root.left;
    } else {
      return root;
    }
  }
}
```

### 1. Two sum

#### description

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:

2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
Only one valid answer exists.

Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?

#### solution

1. 주어진 배열 내부의 값 중에서 두 값을 더했을 때 target과 일치하는 값의 index를 배열로 리턴하는 문제이다.
2. 이 문제는 결국 우리가 원하는 값은 nums[x] + nums[y] === target 일때 두 값의 인덱스
3. 그러므로 우리가 찾고자하는 값은 이미 정해져있기 때문에 해시테이블을 활용해 각각의 값을 기록해놓자
4. nums를 순회하면서 우리가 필요한 값은 해시테이블에 이 값이 존재하느냐?
5. 이를 위해 사전작업을 한다면, target - nums[i]를 통해 이 값이 해시테이블에 존재한다면, target과 일치하는 값을 구할 수 있다는 뜻이 되므로 정답을 리턴
6. 아직 그 값이 없다면, 해시테이블에 그 값의 인덱스를 기록

```js
function twoSum(nums, target) {
  const hash = {};

  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];

    if (hash.hasOwnProperty(diff)) {
      return [i, hash(diff)];
    }

    hash[nums[i]] = i;
  }
}
```

### 20. Valid Parentheses

#### description

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.

Example 1:

Input: s = "()"

Output: true

Example 2:

Input: s = "()[]{}"

Output: true

Example 3:

Input: s = "(]"

Output: false

Example 4:

Input: s = "([])"

Output: true

Constraints:

1 <= s.length <= 104
s consists of parentheses only '()[]{}'.

#### solution

1. 괄호가 열고 닫힘이 제대로 이루어져있는지 체크하는 문제
2. 스택 자료구조를 활용해 열린 괄호들을 스택에 쌓고,
3. 탑에 위치한 괄호를 매번 가져와 닫힌 괄호와 쌍이되면 팝시켜주는 로직으로 구현하면 해결

```js
// 먼저 간단하게 스택 자료구조 클래스를 생성
class Stack {
  this.items = [];

  push(data) {
    this.items.push(data);
  }

  pop() {
    return this.items.pop();
  }

  top() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length > 0
  }
}

function validParentheses(s) {
  const stack = new Stack()

  for (const char of s) {
    // 여는 괄호라면,
    if (char === '(' || char === '{' || char === '[') {
      // 스택에 푸시
      stack.push(char);
    } else {
      // top은 스택에서 가장 위에 존재하는 값을 의미
      const top = stack.top();

      if (top === '(' && char === ')') {
          stack.pop();
      } else if (top === '{' && char === '}') {
          stack.pop();
      } else if (top === '[' && char === ']') {
          stack.pop();
      } else {
        // 위 조건에 부합하지 않으면, 현재 char이 닫힌 괄호이며, 스택의 길이는 0이라는 의미가 되어 false를 바로 리턴
          return false
      }
    }
  }

  return stack.isEmpty();
}
```

### 141. Linked List Cycle

#### description

Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

Example 1:

Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
Example 2:

Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
Example 3:

Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.

Constraints:

The number of the nodes in the list is in the range [0, 104].
-105 <= Node.val <= 105
pos is -1 or a valid index in the linked-list.

Follow up: Can you solve it using O(1) (i.e. constant) memory?

#### solution

1. 링크드 리스트를 활용한 문제
2. 투포인터를 이용해 푸는 것이 최선의 방법
3. 하나의 커서는 한칸씩, 하나의 커서는 두칸씩 이동시키면서 일치되는지 비교한다
   1. 링크드 리스트가 순환된다면, 어느 순간에는 두 값이 일치될 것이기 떄문에
4. 아니라면 false를 리턴한다
5. 시간복잡도가 더 커지지만 Set을 이용해서 푸는것도 가능

```js
function linkedListCycle(head) {
  let fast = head;
  let slow = head;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;

    if (fast === slow) {
      return true;
    }
  }

  return false;
}
```

### 110. Balanced Binary Tree

#### description

Given a binary tree, determine if it is
height-balanced
.

Example 1:

Input: root = [3,9,20,null,null,15,7]
Output: true
Example 2:

Input: root = [1,2,2,3,3,null,null,4,4]
Output: false
Example 3:

Input: root = []
Output: true

Constraints:

The number of nodes in the tree is in the range [0, 5000].
-104 <= Node.val <= 104

#### solution

1. 높이가 균형이 잡혔다는 의미는 양쪽 노드의 깊이 차이가 1이내인 것을 의미한다.
2. dfs를 이용해 풀이한다.

```js
function balancedBinaryTree(root) {
  if (!root) return false;

  const getHeight = (node) => {
    if (!node) return 0;

    // 재귀를 통해 왼쪽 노드 가장 깊은 값과 오른쪽 노드 가장 깊은 값을 가져온다.
    let left = getHeight(node.left);
    let right = getHeight(node.right);

    // 재귀를 통해 하위 노드로 내려가다 양 노드의 값이 1이상 차이가 난다면 불균형이라는 의미
    if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
      return -1;
    }

    // 왼쪽과 오른쪽 노드 중 더 큰 값에 1을 더해준다
    // 1을 더해주는 이유는 현재 노드의 높이까지 필요하기 때문이다
    return Math.max(left, right) + 1;
  };

  return getHeight(root) !== -1;
}
```
