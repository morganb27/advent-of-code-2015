const fs = require('fs');

function readFile(file_path) {
    const content = fs.readFileSync(file_path, 'utf-8');
    const lines = content.split('\n');
    return lines;
}

const data = readFile("input.txt");

function decorateHouse() {
    let grid = Array.from({ length: 1000 }, () => new Array(1000).fill(0));
    for (let line of data) {
        const [instruction, startRow, startCol, endRow, endCol] = parseInput(line);
        for (let i = startRow; i <= endRow; i++) {
            for (let j = startCol; j <= endCol; j++) {
                if (instruction == "on") {
                    grid[i][j] = 1;
                } else if (instruction == "off") {
                    grid[i][j] = 0;
                } else if (instruction == "toggle") {
                    grid[i][j] = grid[i][j] == 0 ? 1 : 0;
                }
            }
        }
    }
    return countLightsOn(grid);
}

function decorateHousePartTwo() {
    let grid = Array.from({ length: 1000 }, () => new Array(1000).fill(0));
    for (let line of data) {
        const [instruction, startRow, startCol, endRow, endCol] = parseInput(line);
        for (let i = startRow; i <= endRow; i++) {
            for (let j = startCol; j <= endCol; j++) {
                if (instruction == "on") {
                    grid[i][j]++;
                } else if (instruction == "off") {
                    grid[i][j] = grid[i][j] > 0 ? grid[i][j] - 1 : 0;
                } else if (instruction == "toggle") {
                    grid[i][j]+=2;
                }
            }
        }
    }
    return calculateTotalBrightness(grid);
}

function parseInput(input) {
    let parsedInstruction = input.split(' ');
    let instruction;
    let startRow, startCol, endRow, endCol;
    if (parsedInstruction[0] == "turn") {
        instruction = parsedInstruction[1];
        [startRow, startCol] = parsedInstruction[2].split(",").map(Number);
        [endRow, endCol] = parsedInstruction[4].split(",").map(Number);
        } else if (parsedInstruction[0] == "toggle") {
            instruction = parsedInstruction[0];
            [startRow, startCol] = parsedInstruction[1].split(",").map(Number);
            [endRow, endCol] = parsedInstruction[3].split(",").map(Number);
        }
    return [instruction, startRow, startCol, endRow, endCol];
}

function countLightsOn(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] == 1) {
                count++;
            }
        }
    }
    return count;
}

function calculateTotalBrightness(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            count += arr[i][j];
        }
    }
    return count;
}

console.log(decorateHouse());
console.log(decorateHousePartTwo());