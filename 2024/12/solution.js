const aocClient = require('../aocClient');
const utils = require('../utils');
const path = require('path');
const fs = require('fs');


const getNeighborCount = (row, col, type, grid, rows, cols) => {
    let count = 0;
    const directions = [
                 [-1, 0],
        [0, -1],          [0, 1],
                 [1, 0],
    ];

    for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (outOfBounds(newRow, newCol, rows, cols)) continue;
        if (grid[newRow][newCol] === type) count += 1;
    }
    return count;
}

const outOfBounds = (row, col, rows, cols) => {
    return row < 0 || row >= rows || col < 0 || col >= cols;
}

const part1 = (grid) => {
    let rows = grid.length;
    let cols = grid[0].length;
    const visited = Array.from({length: rows}, () => Array(cols).fill(false));

    const getPlot = (row, col, type, dimens) => {
        if (outOfBounds(row, col, rows, cols) || visited[row][col] || grid[row][col] !== type) return ;

        let area = dimens[0];
        let perim = dimens[1];
        visited[row][col] = true;
        area += 1; 
        const neighborCount = getNeighborCount(row, col, type, grid, rows, cols);
        perim += 4 - neighborCount;
        dimens[0] = area;
        dimens[1] = perim;

        getPlot(row - 1, col, type, dimens);
        getPlot(row, col + 1, type, dimens);
        getPlot(row, col - 1, type, dimens);
        getPlot(row + 1, col, type, dimens);
    }
    
    let price = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (!visited[r][c]) {
                let area = 0;
                let perim = 0;
                let dimens = [area, perim];
                getPlot(r, c, grid[r][c], dimens);
                price += dimens[0] * dimens[1];
            }
        }
    }

    return price;
};

const part2 = () => {

    return ;
};
  

async function main() {
    const input = await aocClient.fetchInput(12);
    lines = input.split('\n');
    // const testInput = fs.readFileSync(path.join(__dirname, 'test.txt'), 'utf8').toString().trim().replace(/[\r]+/g, '').split('\n');
    let grid = lines.map(l => l.split(""));
    console.log(part1(grid));

    process.exit();
}
main();