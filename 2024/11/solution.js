const aocClient = require('../aocClient');
const Vector = require('../utils').Vector;
const utils = require('../utils');
const path = require('path');
const fs = require('fs');


const part1 = (blinks, input) => {
    let stones = input;
    for (let i = 0; i < blinks; i++) {
        const result = stones.flatMap((num) => {
            const strNum = `${num}`;
            if (num == 0) return 1;
            return strNum.length % 2 === 0 ? [+strNum.slice(0, strNum.length/2), +strNum.slice(strNum.length/2)] : num * 2024;
        });
        stones = result;
    }
    return stones.length;
};
  
const memo = new Map();
const part2 = (stone, blinks) => {
    if (blinks === 0) return 1;

    const key = `${stone},${blinks}`;    
    if (memo.has(key)) return memo.get(key);
    
    const stoneStr = `${stone}`;
    let result;
    if (stoneStr.length % 2 === 0) {
        const leftHalf = part2(+stoneStr.slice(0, stoneStr.length/2), blinks - 1);
        const rightHalf = part2(+stoneStr.slice(stoneStr.length/2), blinks - 1);
        result = leftHalf + rightHalf;
    } else if (stone === 0) {
        result = part2(1, blinks - 1);
    } else {
        result = part2(2024 * stone, blinks - 1);
    }
    memo.set(key, result);
    return result;
};

async function main() {
    const input = [1, 24596, 0, 740994, 60, 803, 8918, 9405859];
    const numBlinks = 75;
    let total = 0;
    for (const num of input) {
        total += part2(num, numBlinks);
    }
    // await aocClient.submit(1, part1());
    // await aocClient.submit(2, part2());
    process.exit();
}
main();