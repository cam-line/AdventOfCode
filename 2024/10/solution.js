const aocClient = require('../aocClient');
const Vector = require('../utils').Vector;
const utils = require('../utils');
const path = require('path');
const fs = require('fs');

const directions = [
    new Vector(utils.Direction.NORTH[1], utils.Direction.NORTH[0]),
    new Vector(utils.Direction.EAST[1], utils.Direction.EAST[0]),
    new Vector(utils.Direction.SOUTH[1], utils.Direction.SOUTH[0]),
    new Vector(utils.Direction.WEST[1], utils.Direction.WEST[0])
]

const getTrailScore = (topoMap, position, elevation, visited) => {
    if (elevation === 9 && !visited.has(position.toString())) {
        visited.add(position.toString());
        return 1;
    }

    let trailScore = 0;
    for (let d in directions) {
        const direction = directions[d];
        const nextPosition = direction.add(position);
        if (nextPosition.checkBoundaries(topoMap.length - 1)) {
            const nextPositionElevation = topoMap[nextPosition.y][nextPosition.x];
            if (nextPositionElevation === elevation + 1) {
                trailScore += getTrailScore(topoMap, nextPosition, nextPositionElevation, visited);
            }
        }
    }
    return trailScore;
}


const getTrailScoreDistinctTrails = (topoMap, position, elevation) => {
    if (elevation === 9) return 1;

    let trailScore = 0;
    for (let d in directions) {
        const direction = directions[d];
        const nextPosition = direction.add(position);
        if (nextPosition.checkBoundaries(topoMap.length - 1)) {
            const nextPositionElevation = topoMap[nextPosition.y][nextPosition.x];
            if (nextPositionElevation === elevation + 1) {
                trailScore += getTrailScoreDistinctTrails(topoMap, nextPosition, nextPositionElevation);
            }
        }
    }
    return trailScore;
}

const part1 = (topoMap) => {
    let sum = 0;
    topoMap.forEach((line, y) => {
        line.forEach((position, x) => {
            if (position === 0) {
                const trailHead = new Vector(x, y);
                const visited = new Set();
                sum += getTrailScore(topoMap, trailHead, 0, visited);
            }
        })
    });
    return sum;
};

const part2 = (topoMap) => {
    let sum = 0;
    topoMap.forEach((line, y) => {
        line.forEach((position, x) => {
            if (position === 0) {
                const trailHead = new Vector(x, y);
                sum += getTrailScoreDistinctTrails(topoMap, trailHead, 0);
            }
        })
    });
    return sum;
};
  

async function main() {
    const input = await aocClient.fetchInput(10);
    lines = input.split('\n');
    // const testInput = fs.readFileSync(path.join(__dirname, 'test.txt'), 'utf8').toString().trim().replace(/[\r]+/g, '').split('\n');
    let topoMap = lines.map(l => l.split("").map(Number));

    // await aocClient.submit(1, part1());
    // await aocClient.submit(2, part2());
    process.exit();
}
main();