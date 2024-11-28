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

console.log(josephusProblem(5, 2));
