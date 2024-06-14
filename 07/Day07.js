const fs = require('fs');

function readFile(file_path) {
    const content = fs.readFileSync(file_path, 'utf-8');
    const lines = content.split('\n');
    return lines;
}

const data = readFile("input.txt");
console.log(data);

function getWireASignal() {
    let queue = [];
    let myMap = new Map();
    for (let i = 0; i < data.length; i++) {
        const instruction = parseInput(data[i]);
        if (canExecute(instruction, myMap)) {
            execute(instruction, myMap);
        } else {
            queue.push(instruction);
        }
    }

    let didExecute;
    while (queue.length > 0) {
        console.log(queue.length)
        didExecute = false;
        for (let i = 0; i < queue.length; i++) {
            if (canExecute(queue[i], myMap)) {
                execute(queue[i], myMap);
                queue.splice(i, 1);
                i--;
                didExecute = true;
            }
        }
        if (!didExecute) {
            console.error("Stuck with unresolved dependencies, check the input instructions for errors.");
            break;
        }
    }
    return myMap;
}

function parseInput(instruction) {
    const line = instruction.split(" ");
    if (line.includes("AND") || line.includes("OR") || line.includes("RSHIFT") || line.includes("LSHIFT")) {
        return { operation: line[1], operand1: line[0], operand2: line[2], output: line[4] }
    } else if (line.includes("NOT")) {
        return { operation: line[0], operand: line[1], output: line[3] }
    } else {
        return { operation: "SET", value: line[0], output: line[2] }
    }
}

function canExecute(instruction, myMap) {
    switch (instruction.operation) {
        case 'SET':
            return true;
        case 'NOT':
            return myMap.has(instruction.operand);
        default:
            return myMap.has(instruction.operand1) && myMap.has(instruction.operand2);
    }
}

function execute(instruction, myMap) {
    console.log(instruction)
    switch (instruction.operation) {
        case 'AND':
            result = myMap.get(instruction.operand1) & myMap.get(instruction.operand2);
            break;
        case 'OR':
            result = myMap.get(instruction.operand1) | myMap.get(instruction.operand2);
            break;
        case 'LSHIFT':
            result = myMap.get(instruction.operand1) << myMap.get(instruction.operand2);
            break;
        case 'RSHIFT':
            result = myMap.get(instruction.operand1) >> myMap.get(instruction.operand2);
            break;
        case 'NOT':
            result = ~myMap.get(instruction.operand) & 0xFFFF;
            break;
            case 'SET':
                if (!isNaN(parseInt(instruction.value))) {
                    result = parseInt(instruction.value);
                } else {
                    if (myMap.has(instruction.value)) {
                        result = myMap.get(instruction.value);
                    } else {
                        console.log(`Dependency not met for: ${JSON.stringify(instruction)}`);
                        return false;
                    }
                }
            break;
    }
    myMap.set(instruction.output, result);
}


console.log(getWireASignal());