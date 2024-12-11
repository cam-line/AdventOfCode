const aocClient = require('../aocClient');
const fs = require('fs');
const path = require('path');

const part1 = (rules, updates) => {
    let middleSum = 0;
    updates.forEach(u => {
        let correctOrder = true; 
        let middle = u[Math.floor(u.length / 2)];
        for (let i = 1; i < u.length; i++) {
            if (!rules.has(u[i])) continue;
            if (rules.get(u[i]).includes(u[i-1])) {
                correctOrder = false;
                break;
            }
        }
        if (correctOrder) {
            middleSum += middle;
        }
        
    });
    return middleSum;
};

const part2 = (rules, updates) => {
    let middleSum = 0;
    updates.forEach(u => {
        let correctOrder = true; 
        // Bubble sort :(
        for (let i = 0; i < u.length; i++) {
            for (let j = 1; j < u.length - i; j++) {
                if (!rules.has(u[j])) continue;
                if (rules.get(u[j]).includes(u[j-1])) {
                    correctOrder = false;
                    let tmp = u[j];
                    u[j] = u[j-1];
                    u[j-1] = tmp;
                }
            }
        }

        if (!correctOrder) {
            let middle = u[Math.floor(u.length / 2)];
            middleSum += middle;
        }
        
    });
    return middleSum;
};
  

async function main() {
    const input = await aocClient.fetchInput(5);
    const testInput = fs
        .readFileSync(path.join(__dirname, 'test.txt'), 'utf8')
        .toString()
        .trim()
        .replace(/[\r]+/g, '');
    const lines = input.split('\n');
    const ruleMap = new Map();
    const l = lines.slice(0, 1176).map(r => {
        r = r.split('|').map(Number);
        if (!ruleMap.has(r[0])) {
            ruleMap.set(r[0], []);    
        }
        ruleMap.get(r[0]).push(r[1]);
        return r;
    });
    console.log(ruleMap);

    const updates = lines.slice(1177).map(u => u.split(',').map(Number));


    await aocClient.submit(1, part1(ruleMap, updates));
    await aocClient.submit(2, part2(ruleMap, updates));
}
main();