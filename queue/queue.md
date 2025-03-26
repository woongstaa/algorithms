## 큐

## 큐의 ADT

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

## 자바스크립트에서 큐 구현하는 방법

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

## 요세푸스 문제

### 문제

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

### 풀이

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

## 기능개발

### 문제

> 프로그래머스 팀에서는 기능 개선 작업을 수행 중입니다. 각 기능은 진도가 100%일 때 서비스에 반영할 수 있습니다.
> 또, 각 기능의 개발속도는 모두 다르기 때문에 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있고, 이때 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포됩니다.
> 먼저 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열 progresses와 각 작업의 개발 속도가 적힌 정수 배열 speeds가 주어질 때 각 배포마다 몇 개의 기능이 배포되는지를 return 하도록 solution 함수를 완성하세요.
>
> 제한 사항
> 작업의 개수(progresses, speeds배열의 길이)는 100개 이하입니다.
> 작업 진도는 100 미만의 자연수입니다.
> 작업 속도는 100 이하의 자연수입니다.
> 배포는 하루에 한 번만 할 수 있으며, 하루의 끝에 이루어진다고 가정합니다. 예를 들어 진도율이 95%인 작업의 개발 속도가 하루에 4%라면 배포는 2일 뒤에 이루어집니다.
>
> 입출력 예
> progresses speeds return
> [93, 30, 55] [1, 30, 5] [2, 1] > [95, 90, 99, 99, 80, 99] [1, 1, 1, 1, 1, 1] [1, 3, 2]
>
> 입출력 예 설명
>
> 입출력 예 #1
> 첫 번째 기능은 93% 완료되어 있고 하루에 1%씩 작업이 가능하므로 7일간 작업 후 배포가 가능합니다.
> 두 번째 기능은 30%가 완료되어 있고 하루에 30%씩 작업이 가능하므로 3일간 작업 후 배포가 가능합니다. 하지만 이전 첫 번째 기능이 아직 완성된 상태가 아니기 때문에 첫 번째 기능이 배포되는 7일째 배포됩니다.
> 세 번째 기능은 55%가 완료되어 있고 하루에 5%씩 작업이 가능하므로 9일간 작업 후 배포가 가능합니다.
> 따라서 7일째에 2개의 기능, 9일째에 1개의 기능이 배포됩니다.
>
> 입출력 예 #2
> 모든 기능이 하루에 1%씩 작업이 가능하므로, 작업이 끝나기까지 남은 일수는 각각 5일, 10일, 1일, 1일, 20일, 1일입니다. 어떤 기능이 먼저 완성되었더라도 앞에 있는 모든 기능이 완성되지 않으면 배포가 불가능합니다.
> 따라서 5일째에 1개의 기능, 10일째에 3개의 기능, 20일째에 2개의 기능이 배포됩니다.

### 풀이

```js
function featureDevelopment(progresses, speeds) {
  const answer = [];
  const workDates = progresses.map((progress, index) => Math.ceil((100 - progress) / speeds[index]));

  let count = 0;
  let maxWorkDate = workDates[0];

  for (let i = 0; i < workDates.length; i++) {
    if (workDates[i] <= maxWorkDate) {
      count++;
    } else {
      answer.push(count);
      maxWorkDate = workDates[i];
      count = 1;
    }
  }

  answer.push(count);

  return answer;
}
```

- 문제 풀이의 핵심은 일할 수 있는 날짜를 구하는 것,
  - 100에서 현재 진행도를 뺀 뒤 속도로 나눠주면, 몇 일 뒤에 작업이 완료되는지 알 수 있다.
- 배포 가능한 날짜를 maxWorkDate로 명명하여 현재가 maxWorkDate보다 작다면 작업일이 다음 루프로 넘어가기 때문에 하나씩 올려준다

## 카드뭉치

### 문제

### 풀이

```js
function cardsBundle(cards1, cards2, goal) {
  cards1 = new Queue(cards1);
  cards2 = new Queue(cards2);
  goal = new Queue(goal);

  while (!goal.isEmpty()) {
    if (!cards1.isEmpty() && cards1.first() === goal.first()) {
      goal.pop();
      cards1.pop();
    } else if (!cards2.isEmpty() && cards2.first() === goal.first()) {
      goal.pop();
      cards2.pop();
    } else {
      break;
    }
  }

  return goal.isEmpty() ? 'Yes' : 'No';
}
```

## 다리를 지나는 트럭

### 문제

### 풀이

```js
function trucksOnTheBridge(bridgeLength, weight, truckWeights) {
  let time = 0;
  let currentWeight = 0;

  const truckQueue = new Queue(truckWeights);
  const bridgeQueue = new Queue([]);

  while (!truckQueue.isEmpty() || !bridgeQueue.isEmpty()) {
    time++;

    // 1. 다리를 건넌 트럭 제거
    if (!bridgeQueue.isEmpty() && bridgeQueue.first()[1] === 0) {
      const truck = bridgeQueue.pop();
      currentWeight -= truck[0];
    }

    // 2. 새로운 트럭 추가
    if (!truckQueue.isEmpty() && weight - currentWeight >= truckQueue.first()) {
      const truck = truckQueue.pop();
      bridgeQueue.push([truck, bridgeLength]); // push 메서드 호출
      currentWeight += truck;
    }

    // 3. 다리 위 트럭의 남은 시간 감소
    for (let i = bridgeQueue.front; i < bridgeQueue.rear; i++) {
      bridgeQueue.items[i][1]--; // items 배열에 직접 접근
    }
  }

  return time;
}
```
