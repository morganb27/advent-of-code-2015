const fs = require('fs');

function readFile(file_path) {
    const content = fs.readFileSync(file_path, 'utf-8');
    const lines = content.split('\n');
    return lines;
}

const data = readFile("input.txt");
console.log(data);

function matchsticks() {
    let codeCharacterCount = 0;
    let inMemoryCharacterCount = 0;
    for (let i = 0; i < data.length; i++) {
        codeCharacterCount+= countCodeCharacters(data[i]);
        inMemoryCharacterCount+= countInMemoryCharacters(data[i]);
    }
    return codeCharacterCount - inMemoryCharacterCount;
}

function countCodeCharacters(str) {
    return str.length;
}


function countInMemoryCharacters(str) {
    let result = "";
    const regex = /^[0-9A-Fa-f]+$/;
    for (let i = 0; i < str.length; i++) {
        if (i < str.length - 4 && str[i] == "\\") {
            let hexCode = str.substring(i, i + 4);
            if (regex.test(hexCode)) {
                const decimal = parseInt(hexCode, 16);
                result += String.fromCharCode(decimal);
                i+= 3;
            }
        } else if (str[i] == "\\" && str[i+1] == "\"") {
            result += "\""
        }
    }
    return result.length;
}


console.log(matchsticks());