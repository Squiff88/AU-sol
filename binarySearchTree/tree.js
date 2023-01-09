class Tree {
  constructor() {
    this.root = null;
  }

  growTree(parent, child) {
    if (child.data < parent.data) {
      if (parent.left) {
        this.growTree(parent.left, child);
      } else {
        parent.left = child;
      }
    }

    if (child.data > parent.data) {
      if (parent.right) {
        this.growTree(parent.right, child);
      } else {
        parent.right = child;
      }
    }
  }

  addNode(node) {
    if (this.root) {
      this.growTree(this.root, node);
    } else {
      this.root = node;
    }
  }

  hasNode(data, child = null) {
    if (child) {
      console.log(child, "child");
      console.log(data, "data");
      if (child.data < data) {
        if (child.right && child.right.data === data) {
          return true;
        }
        if (!child.right) {
          return false;
        }
      }

      if (child.data > data) {
        if (child.left && child.left.data === data) {
          return true;
        }
        if (!child.left) {
          return false;
        }
      }
    }

    if (data === this.root.data) {
      return true;
    }

    if (data < this.root.data) {
      if (!this.root.left) {
        return false;
      }

      if (this.root.left.data === data) {
        return true;
      }
      return this.hasNode(data, this.root.left);
    }

    if (data > this.root.data) {
      if (!this.root.right) {
        return false;
      }
      if (this.root.right.data === data) {
        return true;
      }
      return this.hasNode(data, this.root.right);
    }
  }
}

module.exports = Tree;
