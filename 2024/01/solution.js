const aocClient = require('../aocClient');

const part1 = (list1, list2) => {
    var sum = 0;
    list1.map((value, index) => {
        const secondValue = list2[index];
        const difference = Math.abs(value - secondValue);
        sum += difference;
    });

    return sum;
};

const part2 = (list1, list2) => {
    const list2FrequencyMap = new Map();
    list2.forEach(num => {
        list2FrequencyMap.set(num, (list2FrequencyMap.get(num) || 0) + 1);
    });

    var similarityScore = 0;
    list1.forEach(num => {
        similarityScore += (num * (list2FrequencyMap.get(num) || 0));
    });

    return similarityScore;
};

const getLists = (lines) => {
    const list1 = [];
    const list2 = [];

    lines.forEach(pair => {
        const [first, second] = pair.trim().split(/\s+/).map(Number);
        list1.push(first);
        list2.push(second);
    });
    list1.sort((a, b) => a - b);
    list2.sort((a, b) => a - b);
      
    return [list1, list2];
};
  

async function main() {
    const input = await aocClient.fetchInput(1);
    const lines = input.split('\n');
    const [list1, list2] = getLists(lines);

    part2(list1, list2);
    await aocClient.submit(1, part1(list1, list2));
    await aocClient.submit(2, part2(list1, list2));
}
main();