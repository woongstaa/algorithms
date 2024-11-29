class Queue {
  items = [];
  front = 0;
  rear = 0;

  constructor(array) {
    this.items = array;
    this.rear = array.length;
  }

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
  first() {
    return this.items[this.front];
  }
}

function josephusProblem(n, k) {
  const queue = new Queue();

  for (let i = 1; i <= n; i++) {
    queue.push(i);
  }

  while (queue.size() > 1) {
    for (i = 0; i < k - 1; i++) {
      queue.push(queue.pop());
    }

    queue.pop();
  }

  return queue.pop();
}

// console.log(josephusProblem(5, 2));

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

// console.log(featureDevelopment([93, 30, 55], [1, 30, 5]));

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

// console.log(cardsBundle(['i', 'drink', 'water'], ['want', 'to'], ['i', 'want', 'to', 'drink', 'water']));

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

console.log(trucksOnTheBridge(2, 10, [7, 4, 5, 6]));
