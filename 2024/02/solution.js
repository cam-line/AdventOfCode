const aocClient = require('../aocClient');

const part1 = (input) => {
    let safeReportCount = 0;
    input.forEach(report => {
        if (checkReportSafety(report)) {
            safeReportCount += 1;
        }
    });
    return safeReportCount;
};

const part2 = (input) => {
    let safeReportCount = 0;
    input.forEach(report => {
        let safe = checkReportSafety(report);
        if (!safe) { // Problem dampener brute force
            for (let i = 0; i < report.length; i++) {
                const reducedReport = report.filter((_, j) => j != i);
                safe |= checkReportSafety(reducedReport);
            }
        }

        if (safe) {
            safeReportCount +=1;
        }
    })
    return safeReportCount;
};

const checkReportSafety = (report) => {
    let increasing = true;
    let decreasing = true;
    let inBounds = true;

    for (let i = 1; i < report.length; i++) {
        const curr = report[i];
        const prev = report[i - 1];
        if (curr < prev) {
            increasing = false;
        } else if (curr > prev) {
            decreasing = false;
        }

        const difference = Math.abs(curr - prev);
        if (difference > 3 || difference == 0) {
            inBounds = false;
        }
    }

    return (increasing || decreasing) && inBounds;
}
  

async function main() {
    const input = await aocClient.fetchInput(2);
    const lines = input.split('\n');
    const arrays = lines.map(str => str.split(' ').map(Number));

    await aocClient.submit(1, part1(arrays));
    await aocClient.submit(2, part2(arrays));
}
main();
