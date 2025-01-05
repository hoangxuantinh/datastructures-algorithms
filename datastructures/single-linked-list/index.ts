class NodeE {
  value!: number;
  next!: NodeE | null;
  constructor(value: number) {
    this.value = value;
    this.next = null;
    return this;
  }
}

class SingleLinkedList {
  head: NodeE | null;
  tail: NodeE | null;
  length: number;
  constructor(value: number) {
    const newNode = new NodeE(value);
    this.head = newNode;
    this.tail = newNode;
    this.length = 1;
  }

  unshift(value: number): NodeE {
    const newNode = new NodeE(value);
    newNode.next = this.head;
    this.head = newNode;

    this.length++;
    return this.head;
  }

  push(value: number): NodeE {
    const newNode = new NodeE(value);
    if (this.tail) {
      this.tail.next = newNode;
    }

    this.tail = newNode;
    this.length++;
    return newNode;
  }

  getAt(index: number): NodeE | null {
    const position = index;
    if (index < 0 || index >= this.length) {
      return null;
    }

    if (index === 0) {
      return this.head;
    }

    if (index === this.length - 1) {
      return this.tail;
    }

    let temp = this.head;
    while (temp !== null && index > 0) {
      temp = temp.next;
      index--;
    }
    return temp;
  }

  insert(index: number, value: number): NodeE {
    if (index >= this.length) {
      return this.push(value);
    }
    if (index === 0) {
      return this.unshift(value);
    }

    const newNode = new NodeE(value);

    const leader = this.getAt(index - 1);
    if (leader) {
      leader.next = newNode;
      newNode.next = leader.next;
      this.length++;
    }
    return newNode;
  }

  remove(index: number) {
    if (index === 0) {
      this.head = this.head?.next || null;
      this.length--;
      return this.head;
    }

    const leader = this.getAt(index - 1);
    if (leader) {
      const temp = leader.next;
      leader.next =  null;
      this.length--;
      return temp;
    }
  }

  getLength(): number {
    console.log(this.length);
    return this.length;
  }

  printList() {
    const array: number[] = [];
    let currentNode: NodeE | null = this.head;
    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    console.log(array);
    return array;
  }
}

function main() {
  const myLinkedList = new SingleLinkedList(6);
  myLinkedList.unshift(5);
  myLinkedList.unshift(1);

  myLinkedList.push(7);
  myLinkedList.push(8);

  myLinkedList.remove(1)
  myLinkedList.remove(3)
  myLinkedList.printList();

  console.log("Value at position 3:", myLinkedList.getAt(3)?.value);
  console.log("Value at position 4:", myLinkedList.getAt(4)?.value);
  myLinkedList.getLength();
}

main();
