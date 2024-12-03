const aocClient = require('../aocClient');

const part1 = (input) => {
    const regexp = /mul\((\d+),(\d+)\)/g
    const matches = input.matchAll(regexp);
    let ans = 0;
    for (const match of matches) {
        ans += parseInt(match[1]) * parseInt(match[2]);
    }

    return ans;
};

const part2 = (input) => {
    const regexp = /mul\((\d+),(\d+)\)|(don't\(\)|do\(\))/g
    const matches = input.matchAll(regexp);
    let ans = 0;
    let doMul = true;
    for (const match of matches) {
        if (doMul && match[3] == undefined) {
            ans += parseInt(match[1]) * parseInt(match[2]);
        } else {
            if (match[3] == "do()") {
                doMul = true;
            } else {
                doMul = false;
            }
        }
    }

    return ans;
};
  

async function main() {
    const input = await aocClient.fetchInput(3);
    const test = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

    await aocClient.submit(1, part1(input));
    await aocClient.submit(2, part2(input));
}
main();