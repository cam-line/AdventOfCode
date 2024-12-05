const aocClient = require('../aocClient');
const fs = require('fs');
const path = require('path');

const part1 = (grid) => {
	let ans = 0;
	grid.forEach((v, k) => {
		if (v === 'X') {
			const coordinate = unformatKey(k);
			ans += checkNeighbors(coordinate, grid, Direction.NORTH) ? 1 : 0;
			ans += checkNeighbors(coordinate, grid, Direction.NORTHEAST) ? 1 : 0;
			ans += checkNeighbors(coordinate, grid, Direction.EAST) ? 1 : 0;
			ans += checkNeighbors(coordinate, grid, Direction.SOUTHEAST) ? 1 : 0;
			ans += checkNeighbors(coordinate, grid, Direction.SOUTH) ? 1 : 0;
			ans += checkNeighbors(coordinate, grid, Direction.SOUTHWEST) ? 1 : 0;
			ans += checkNeighbors(coordinate, grid, Direction.WEST) ? 1 : 0;
			ans += checkNeighbors(coordinate, grid, Direction.NORTHWEST) ? 1 : 0;
		}
	});
    return ans;
};

const part2 = (grid) => {
	let ans = 0;
	grid.forEach((v, k) => {
		if (v === 'A') {
			const coordinate = unformatKey(k);
			ans += findXmas(coordinate, grid) ? 1 : 0;
		}
	});

    return ans;
};
  
const checkNeighbors = (coordinate, grid, direction) => {
	// Saw an opportunity for recursion here but got lazy
	let target = ['M', 'A', 'S'];
	let hit = true;
	let currentY = coordinate[0];
	let currentX = coordinate[1];
	for (c in target) {
		currentY += direction[0];
		currentX += direction[1];

		if (getGridVal(currentY, currentX, grid) === target[c]) {
			hit &= true;
		} else {
			hit &= false;
		}
	}
	return hit;
}

const findXmas = (coordinate, grid) => {
	let currentY = coordinate[0];
	let currentX = coordinate[1];

	let diagonals = [
		getGridVal(currentY - 1, currentX - 1, grid), 
		getGridVal(currentY - 1, currentX + 1, grid),
		getGridVal(currentY + 1, currentX + 1, grid),
		getGridVal(currentY + 1, currentX - 1, grid),
	]

	if (diagonals[0] === diagonals[2] || diagonals[1] === diagonals[3]) return false;
	if (diagonals.some(x => x !== 'M' && x !== 'S')) return false;

	return true;
}

const formatKey = (y, x) => `${y},${x}`;
const unformatKey = key => key.split(',').map(Number);

const Direction = {
	NORTH: [-1, 0],
	NORTHEAST: [-1, 1],
	EAST: [0, 1],
	SOUTHEAST: [1, 1],
	SOUTH: [1, 0],
	SOUTHWEST: [1, -1],
	WEST: [0, -1],
	NORTHWEST: [-1, -1],
}

const getGridVal = (y, x, grid, defaultVal=".") => {
	let val = grid.get(formatKey(y, x));
	if (val == undefined) val = defaultVal;
	return val;
}


async function main() {
    const input = await aocClient.fetchInput(4);
	const testInput = fs
	.readFileSync(path.join(__dirname, 'test.txt'), 'utf8')
	.toString()
	.trim()
	.replace(/[\r]+/g, '');

    const lines = input.split('\n').map(line => line.split(''));
	const grid = new Map();
	for (let y = 0; y < lines.length; y++) {
		for (let x = 0; x < lines[y].length; x++) {
			grid.set(formatKey(y, x), lines[y][x]);
		}
	}

    await aocClient.submit(1, part1(grid));
    await aocClient.submit(2, part2(grid));
}
main();