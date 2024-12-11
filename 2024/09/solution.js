const aocClient = require('../aocClient');
const path = require('path');
const fs = require('fs');

const getBlocks = (input) => {
    let blocks = new Array();
    let fileId = 0;
    for (let i = 0; i < input.length; i++) {
        const block = input[i];        
        for (let b = 0; b < block; b++) {
            if (i % 2 === 0) {
                blocks.push(fileId);
                if (b === block - 1) fileId += 1;
            } else {
                blocks.push('.');
            } 
        }
    }
    return blocks;
}

const fillFreeSpace = (blocks) => {
    let arrangedBlocks = [...blocks];
    for (let end = arrangedBlocks.length - 1; end >= 0; end--) {
        const fileToMove = blocks[end];
        if (fileToMove === '.') continue;
        for (let start = 0; start <= end; start++) {
            const possibleFreeSpace = arrangedBlocks[start]; 
            if (possibleFreeSpace !== '.') continue;
            arrangedBlocks[start] = fileToMove;
            arrangedBlocks[end] = '.';
            break;
        }
    }

    return arrangedBlocks;
}

const moveWholeFiles = (blocks) => {
    let arrangedBlocks = [...blocks];
    for (let end = arrangedBlocks.length - 1; end >= 0; end--) {

    }

    return arrangedBlocks;
}

const calculateChecksum = (memory) => {
    let checksum = 0;
    for (i in memory) {
        if (memory[i] === '.') break;
        checksum += (i * memory[i]);
    }
    return checksum;
}

const part1 = (input) => {
    let blocks = getBlocks(input);
    let blocksFreeSpaceFilled = fillFreeSpace(blocks);
    return calculateChecksum(blocksFreeSpaceFilled);
};

const part2 = (input) => {
    let blocks = getBlocks(input);

    return ;
};
  

async function main() {
    const input = await aocClient.fetchInput(9);
    const testInput = "2333133121414131402";
    let inputArray = input.split("").map(Number);
    console.log(inputArray)
    console.log(part1(inputArray));
    // await aocClient.submit(1, part1());
    // await aocClient.submit(2, part2());
    process.exit();
}
main();