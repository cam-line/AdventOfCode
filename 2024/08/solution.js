const aocClient = require('../aocClient');
const path = require('path');
const fs = require('fs');

class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    add(otherVector) {
      return new Vector(this.x + otherVector.x, this.y + otherVector.y);
    }

    subtract(otherVector) {
        return new Vector(this.x - otherVector.x, this.y - otherVector.y);
    }

    checkBoundaries(max) {
        const min = 0;
        return this.x <= max && this.x >= min && this.y <= max && this.y >= min;
    }

    toString() {
        return `${this.x},${this.y}`;
    }

    fromString(stringVector) {
        const vectorArray = stringVector.split(',');
        return new Vector(vectorArray[0], vectorArray[1]);
    }
}

const part1 = (vectorMap, gridLength) => {
    let antiNodeMap = [];
    for (let i = 0; i < gridLength; i++) {
        const row = [];
        for (let j = 0; j < gridLength; j++) {
            row[j] = ".";
        }
        antiNodeMap[i] = row;
    }

    const visited = new Set();
    for (const vectors of vectorMap.values()) {
        for (let i = 0; i < vectors.length; i++) {
            // Inner loop starts from the next index to avoid duplicate comparisons
            for (let j = i + 1; j < vectors.length; j++) {
                const difference = vectors[j].subtract(vectors[i]);

                const antiNode1 = vectors[i].subtract(difference);
                const antiNode2 = vectors[j].add(difference);

                if (antiNode1.checkBoundaries(gridLength - 1)) {
                    visited.add(antiNode1.toString());
                    antiNodeMap[antiNode1.y][antiNode1.x] = "#";
                }
                if (antiNode2.checkBoundaries(gridLength - 1)) {           
                    visited.add(antiNode2.toString()); 
                    antiNodeMap[antiNode2.y][antiNode2.x] = "#";
                }
            }
        }
    }
    antiNodeMap = antiNodeMap.map(l => l.join('').concat('\n'));

    console.log(antiNodeMap);
    return visited.size;
};

const part2 = (input) => {

    return ;
};
  

async function main() {
    const input = await aocClient.fetchInput(8);
    let lines = input.split('\n');
    const testInput = fs.readFileSync(path.join(__dirname, 'test.txt'), 'utf8').toString().trim().replace(/[\r]+/g, '').split('\n');
    let grid = lines.map(l => l.split(""));
    const vectorMap = new Map();
    grid.forEach((line, y) => {
        line.forEach((antenna, x) => {
            if (antenna !== ".") {
                const vector = new Vector(x, y);
                if (vectorMap.has(antenna)) {
                    vectorMap.get(antenna).push(vector);
                } else {
                    vectorMap.set(antenna, [vector]);
                }
            }
        })
    })
    const antiNodeCount = part1(vectorMap, grid.length);
    console.log(antiNodeCount);
    // await aocClient.submit(1, part1());
    // await aocClient.submit(2, part2());
    process.exit();
}
main();