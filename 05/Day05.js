const fs = require('fs');

function readFile(file_path) {
    const content = fs.readFileSync(file_path, 'utf-8');
    const lines = content.split('\n');
    return lines;
}

const data = readFile("input.txt");
console.log(data.length);

function niceStringCounter(arr) {
    let count = 0;
    let countNewRules = 0;
    for (let element of arr) {
        if (isNiceString(element)) {
            count++;
        }
        if (isNiceStringNewRules(element)) {
            countNewRules++;
        }
    }
    return [count, countNewRules];
}

function isNiceString(str) {
    let vowelCount = 0;
    let vowels = ["a", "e", "i", "o", "u"];
    let forbiddenStrings = ["ab", "cd", "pq", "xy"];
    let hasContiguousDuplicateLetters = false;

    for (let i = 0; i < str.length; i++) {
        if (i < str.length - 1) {
            let contiguousPair = str[i] + str[i+1];
            if (str[i] == str[i+1]) {
                hasContiguousDuplicateLetters = true;
            }
            if (forbiddenStrings.includes(contiguousPair)) {
                return false;
            }
        }
        if (vowels.includes(str[i])) {
            vowelCount++;
        }
    }

    if (vowelCount >= 3 && hasContiguousDuplicateLetters) {
        return true;
    }
    return false;
}

function isNiceStringNewRules(str) {
    let myMap = new Map();
    let pairs;
    let isLetterRepeatedTwice = false;
    let isPairRepeatedTwice = false;
    for (let i = 0; i < str.length; i++) {
        if (i < str.length - 1) {
            pairs = str[i] + str[i+1];
            if (!myMap.has(pairs)) {
                myMap.set(pairs, i);
            } else if (myMap.has(pairs) && i >= myMap.get(pairs) + 2){
                isPairRepeatedTwice = true;
            }
        }
        if (str[i] == str[i+2]) {
            isLetterRepeatedTwice = true;
        }
    }
    return isLetterRepeatedTwice && isPairRepeatedTwice;
}

console.log(niceStringCounter(data));