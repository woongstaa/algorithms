## 큐

### 큐의 ADT

- isFull
  - boolean
- isEmpty
  - boolean
  - front === rear
- push
  - void
- pop
  - return item
- front
  - number
- rear
  - number
- size
  - number

### 자바스크립트에서 큐 구현하는 방법

1. shift()

```js
const queue = [];

queue.push(1);
queue.push(2);
queue.push(3);

const firstItem = queue.shift(); // 1
```

2. 배열을 이용

```js
class Queue {
  items = [];
  front = 0;
  rear = 0;

  push(item) {
    this.items.push(item);
    this.rear++;
    return this.items;
  }
  pop() {
    return items[this.front++];
  }
  isEmpty() {
    return this.front === this.rear;
  }
}
```

3. 링크드리스트를 이용

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  pop() {
    if (!this.head) {
      return null;
    }

    const removedNode = this.head;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    this.size--;

    return removedNode.data;
  }

  isEmpty() {
    return this.size === 0;
  }
}
```

시간이 없거나 링크드 리스트를 활용한 큐가 기억이 안난다면 두번째의 방법으로 우선 풀이만이라도 하는 것이 좋다. 첫번째 방법은 메소드를 사용할 때마다 새로운 배열을 리턴해야하므로 시간복잡도가 높다.

### 요세푸스 문제

#### 문제

> N명의 사람이 원 형태로 서 있습니다. 각 사람은 1부터 N까지 번호표를 갖고 있습니다. 그리고 임
> 의의 숫자 K가 주어졌을 때 다음과 같이 사람을 없앱니다.
> ※ 이 문제는 유대인 역사가인 플라비우스 요세푸스가 만든 문제입니다.
> • 1번 번호표를 가진 사람을 기준으로 K번째 사람을 없앱니다.
> • 없앤 사람 다음 사람을 기준으로 하고 다시 K번째 사람을 없앱니다.
> N과 K가 주어질 때 마지막에 살아있는 사람의 번호를 반환하는 solution( ) 함수를 구현해주
> 세요.
>
> 제약 조건
> • N과 K는 1이상 1000이하의 자연수입니다.
>
> 입출력의 예
> N K return
> 5 2 3

#### 풀이

```js
class Queue {
  items = [];
  front = 0;
  rear = 0;

  push(item) {
    this.items.push(item);
    this.rear++;
    return this.items;
  }
  pop() {
    return this.items[this.front++];
  }
  isEmpty() {
    return this.front === this.rear;
  }
  size() {
    return this.rear - this.front;
  }
}

function josephusProblem(n, k) {
  const queue = new Queue();

  // 큐를 n만큼 쌓아준다
  for (let i = 1; i <= n; i++) {
    queue.push(i);
  }

  // 사이즈가 1이 될때까지 돌려준다
  while (queue.size() > 1) {
    // k번 새로 넣어서 큐에 쌓아준 뒤
    for (i = 0; i < k - 1; i++) {
      queue.push(queue.pop());
    }

    // 마지막 제외해야할 값은 제외시켜준다
    queue.pop();
  }

  // 마지막 값 리턴
  return queue.pop();
}
```
