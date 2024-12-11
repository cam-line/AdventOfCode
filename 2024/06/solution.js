const aocClient = require('../aocClient');
const fs = require('fs');
const path = require('path');

const Direction = {
	NORTH: [-1, 0],
	EAST: [0, 1],
	SOUTH: [1, 0],
	WEST: [0, -1],
}


// const part1 = (start, map, nextChar = '.', direction = Direction.NORTH) => {
//     const newY = start[0] + direction[0];
//     const newX = start[1] + direction[1];
//     if(newY > map.length-1 || newY < 0 || newX > map[0].length-1 || newX < 0) return 1;
//     nextChar = map[newY][newX];

//     let newStart = [newY, newX];
//     let total = 0;
//     if (nextChar === '.') {
//         map[newY][newX] = 'X';
//         total += 1;
//     } else if (nextChar === '#') {
//         switch(direction) {
//             case Direction.NORTH:
//                 direction = Direction.EAST;
//                 break;
//             case Direction.EAST:
//                 direction = Direction.SOUTH;
//                 break;
//             case Direction.SOUTH:
//                 direction = Direction.WEST;
//                 break;
//             case Direction.WEST:
//                 direction = Direction.NORTH;
//                 break;
//         }
//         newStart = start;
//         nextChar = map[start[0] + direction[0]][start[1] + direction[1]];
//     }
//     // // console.clear();
//     // const printMap = map.map(m => m.join(' ')); 
//     // console.log(printMap);
//     return total += part1(newStart, map, nextChar, direction);
// };

const part1 = (start, map, nextChar = '.', direction = Direction.NORTH) => {
    let newY = start[0] + direction[0];
    let newX = start[1] + direction[1];
    let total = 1;

    while (!(newY > map.length-1 || newY < 0 || newX > map[0].length-1 || newX < 0)) {
        nextChar = map[newY][newX];
        let newStart = [newY, newX];
        if (nextChar === '.') {
            map[newY][newX] = 'X';
            total += 1;
            newY = newStart[0] + direction[0];
            newX = newStart[1] + direction[1];
        } else if (nextChar === '#') {
            switch(direction) {
                case Direction.NORTH:
                    direction = Direction.EAST;
                    break;
                case Direction.EAST:
                    direction = Direction.SOUTH;
                    break;
                case Direction.SOUTH:
                    direction = Direction.WEST;
                    break;
                case Direction.WEST:
                    direction = Direction.NORTH;
                    break;
            }
            
            newY = start[0] + direction[0];
            newX = start[1] + direction[1];
            // nextChar = map[start[0] + direction[0]][start[1] + direction[1]];
        } else {
            newY = newStart[0] + direction[0];
            newX = newStart[1] + direction[1];
        }
        start = newStart;

        console.clear();
        const printMap = map.map(m => m.join(' ')); 
        console.log(printMap);
    }
    return total;
};


const part2 = () => {
    
    return ;
};
  

async function main() {
    const input = await aocClient.fetchInput(6);
    const testInput = fs
        .readFileSync(path.join(__dirname, 'test.txt'), 'utf8')
        .toString()
        .trim()
        .replace(/[\r]+/g, '');
    let map = input.split('\n').map(line => line.split(''));
    let start = [];
    for (line in map) {
        start = map[line].indexOf('^') !== -1 ? [parseInt(line), map[line].indexOf('^')] : [];
        if (start.length !== 0) break;
    }
    console.log(part1(start, map));

    const printMap = map.map(m => m.join(' ')); 
    console.log(printMap);
    // await aocClient.submit(1, part1(start, map));
    // await aocClient.submit(2, part2());
    process.exit();
}
main();