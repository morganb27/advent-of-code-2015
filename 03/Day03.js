const fs = require('fs');

function readFile(file_path) {
    const content = fs.readFileSync(file_path, 'utf-8');
    const directions = content.split('');
    return directions;
}

const data = readFile("input.txt");


function calculateNumberOfHousesThatReceivedOnePresentOrMore() {
    let mySet = new Set();
    let x = 0;
    let y = 0;
    mySet.add(`${x},${y}`);

    const directions = {
        "^": [0, 1],
        ">": [1, 0],
        "v": [0, -1],
        "<": [-1, 0]
    }

    for (let char of data) {
        const [charX, charY] = directions[char];
        console.log("x", charX);
        console.log("y", charY)
        x+= charX;
        y += charY;
        mySet.add(`${x},${y}`);
    }

    return mySet.size;
}

function deliverPresentWithRoboSanta() {
    let visitedHouses = new Set();
    const directions = {
        "^": [0, 1],
        ">": [1, 0],
        "v": [0, -1],
        "<": [-1, 0]
    }
    visitedHouses.add("0,0");

    let santaCoordinates = [0, 0];
    let robotSantaCoordinates = [0, 0];

    for (let i = 0; i < data.length; i++) {
        if (i % 2 == 0) {
            let [x, y] = directions[data[i]];
            santaCoordinates[0]+= x;
            santaCoordinates[1] += y;
            visitedHouses.add(`${santaCoordinates[0]},${santaCoordinates[1]}`);
        } else if ( i % 2 != 0) {
            let [x, y] = directions[data[i]];
            robotSantaCoordinates[0]+= x;
            robotSantaCoordinates[1] += y;
            visitedHouses.add(`${robotSantaCoordinates[0]},${robotSantaCoordinates[1]}`);
        }
    }
    return visitedHouses.size;
}


// console.log(calculateNumberOfHousesThatReceivedOnePresentOrMore());
console.log(deliverPresentWithRoboSanta());