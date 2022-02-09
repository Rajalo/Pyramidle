'use strict';

let cursorId = 11;

let letters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
    "A", "S", "D", "F", "G", "H", "J", "K",
    "Z", "X", "C", "V", "B", "N", "M"];
// Letters lists from https://www.bestwordlist.com/6letterwords.htm

let sixWords = ["PRICES","PROMOS", "PRIMES", "BEGGER", "WHISPS"];
let fiveWords = ["PRICE", "PROMO", "PRIME", "BEGIN", "ENTER"];
let fourWords = ["PRIM","PROS", "EGGS"];
let solutions = ["EGGS"];
let answer = solutions[0];

let inputLetter = (letter) => {
    switch (cursorId) {
        case 17:
        case 27:
        case 37:
        case 46:
        case 56:
            return;
    }
    let cursorElement = document.getElementById("box" + cursorId);
    cursorElement.innerText = letter;
    cursorId++;
}

let backspace = () => {
    switch (cursorId) {
        case 11:
        case 21:
        case 31:
        case 41:
        case 51:
            return;
    }
    cursorId--;
    let cursorElement = document.getElementById("box" + cursorId);
    cursorElement.innerText = "";
}
let enter = async () => {
    switch (cursorId) {
        case 17:
        case 27:
        case 37:
        case 46:
        case 56:
        case 65:
            let rowNumber = Math.floor(cursorId / 10);
            let row = document.getElementById("row" + Math.floor(cursorId / 10));
            let word = "";
            for (let child of row.childNodes) {
                if (child.innerText != undefined) {
                    word += child.innerText;
                }
            }
            if ((rowNumber <= 3 && sixWords.includes(word))
                || (rowNumber > 3 && rowNumber <= 5 && fiveWords.includes(word))
                || (rowNumber >= 6 && fourWords.includes(word))
            ) {
                let i = 0;
                for (let child of row.childNodes) {
                    if (child.innerText == undefined || child.className.includes("invalid")) {
                        continue;
                    }
                    child.className = "box";
                    if (word.charAt(i) == answer.charAt(i)) {
                        child.className += " correct";
                    }
                    else if (answer.includes(word.charAt(i))) {
                        child.className += " partial";
                    }
                    else {
                        child.className += " incorrect";
                    }
                    i++;
                }
                cursorId = (rowNumber + 1) * 10 + 1;
                if (cursorId < 70) {
                    let newRow = document.getElementById("row" + (rowNumber + 1));
                    for (let child of newRow.childNodes) {
                        if (child.innerText == undefined || child.className.includes("invalid")) {
                            continue;
                        }
                        child.className = "box selected";
                    }
                }
            }
            else {
                for (let child of row.childNodes) {
                    if (child.innerText == undefined) {
                        continue;
                    }
                    if (!child.className.includes("invalid")) {
                        child.className += " wrong";
                    }
                }
                await new Promise(r => setTimeout(r, 2000));
                for (let child of row.childNodes) {
                    if (child.innerText == undefined) {
                        continue;
                    }
                    if (child.className.includes("wrong")) {
                        child.className = child.className.substring(0, child.className.length - 6);
                    }
                }
            }
            if (word.includes(answer)) {
                document.getElementById("banner").className = "centered";
                document.getElementById("banner").innerText = "YOU WON!"
                cursorId = 71;
            }
            else if (cursorId >= 71)
            {
                document.getElementById("banner").className = "centered";
                document.getElementById("banner").innerText = "YOU LOSE!"
            }
            break;
    }
}

for (let letter of letters) {
    let keyElement = document.getElementById(letter);
    keyElement.onclick = () => { inputLetter(letter); };
}
let backElem = document.getElementById("Back");
backElem.onclick = backspace;
let enterElem = document.getElementById("Enter");
enterElem.onclick = enter;