class PriorityQueue {
  constructor() {
      this.items = [];
  }

  enqueue(element, priority) {
      const queueElement = { element, priority };
      let added = false;

      for (let i = 0; i < this.items.length; i++) {
          if (queueElement.priority < this.items[i].priority) {
              this.items.splice(i, 0, queueElement);
              added = true;
              break;
          }
      }

      if (!added) {
          this.items.push(queueElement);
      }
  }

  dequeue() {
      if (this.isEmpty()) {
          throw new Error("Queue is empty");
      }
      return this.items.shift().element;
  }

  isEmpty() {
      return this.items.length === 0;
  }

}


module.exports = PriorityQueue;