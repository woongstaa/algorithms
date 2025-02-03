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
