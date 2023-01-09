const Node = require("./node");
const Tree = require("./tree");

const tree = new Tree();
console.log(tree, "1 tree ??");
tree.addNode(new Node(5));
console.log(tree, "2 tree ??");
tree.addNode(new Node(3));
console.log(tree, "3 tree ??");
tree.addNode(new Node(8));
console.log(tree, "4 tree ??");
