const aocClient = require('../aocClient');
const fs = require('fs');
const path = require('path');

class BinaryTreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }
}

function constructOperationBinaryTree(numbers, index = 0, result = numbers[0]) {
    if (index >= numbers.length-1) {
        return new BinaryTreeNode(result);
    }

    const node = new BinaryTreeNode(result);
    const nextNumber = numbers[index + 1];

    node.left = constructOperationBinaryTree(numbers, index + 1, result + nextNumber);
    node.right = constructOperationBinaryTree(numbers, index + 1, result * nextNumber);

    return node;
} 

function constructOperationTree(numbers, index = 0, result = numbers[0]) {
    if (index >= numbers.length-1) {
        return new TreeNode(result);
    }

    const node = new TreeNode(result);
    const nextNumber = numbers[index + 1];

    node.addChild(constructOperationTree(numbers, index + 1, result + nextNumber));
    node.addChild(constructOperationTree(numbers, index + 1, result * nextNumber));
    node.addChild(constructOperationTree(numbers, index + 1, parseInt("" + result + nextNumber)));

    return node;
} 

function findValidOperationBinaryTree(node, targetVal) {
    if (!node) return false;
    if (node.value === targetVal && (!node.left && !node.right)) return true;

    let left =  findValidOperationBinaryTree(node.left, targetVal);
    let right = findValidOperationBinaryTree(node.right, targetVal);
    return left || right;
}

function findValidOperation(node, targetVal) {
    if (!node) return false;
    if (node.value === targetVal && (node.children.length === 0)) return true;

    let valid = false;
    for (child in node.children) {
        valid |= findValidOperation(node.children[child], targetVal);
    }
    return valid;
}

function printBinaryTree(node, depth = 0) {
    if (!node) return;
    console.log(' '.repeat(depth * 2) + node.value); // Indent based on depth
    printBinaryTree(node.left, depth + 1);
    printBinaryTree(node.right, depth + 1);
}

function printTree(node, depth = 0) {
    if (!node) return;
    console.log(' '.repeat(depth * 2) + node.value); // Indent based on depth
    printTree(node.children[0], depth + 1);
    printTree(node.children[1], depth + 1);
    printTree(node.children[2], depth + 1);
}

const part1 = (equations) => {
    let sum = 0;
    equations.forEach(e => {
        const operationTree = constructOperationBinaryTree(e[1]);
        const targetVal = e[0];
        if (findValidOperationBinaryTree(operationTree, targetVal)) sum += targetVal;
    });

    return sum;
};

const part2 = (equations) => {
    let sum = 0;
    equations.forEach(e => {
        const operationTree = constructOperationTree(e[1]);
        const targetVal = e[0];
        if (findValidOperation(operationTree, targetVal)) sum += targetVal;
    });

    return sum;
};
  

async function main() {
    const input = await aocClient.fetchInput(7);
    const lines = input.split('\n');
    const testInput = fs
        .readFileSync(path.join(__dirname, 'test.txt'), 'utf8')
        .toString().trim().replace(/[\r]+/g, '').split('\n');
    const equations = lines.map(l => l.split(':').map((v, i) => {
        if (i == 1) {
            v = v.trim().split(' ').map(Number);
        } else {
            v = parseInt(v);
        }
        return v;
    }));
    console.log(part2(equations));
    // await aocClient.submit(1, part1());
    // await aocClient.submit(2, part2());
    process.exit();
}
main();