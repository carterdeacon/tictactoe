// Variables for players
let playerX = "X";
let playerO = "O";

const WIN_MESSAGE = "wins!";

// Variables for gameplay
var allBoxes = document.querySelectorAll('.square');
var result = document.querySelector('.game-result');
var turnDisplay = document.querySelector('.turn');
var advice = document.querySelector('#advice');
var resetButton = document.querySelector('#reset-btn');

//function to handle flow of the game, change player turn / playing of squares + eventListener loop for all divs clicked. Player handling idea: click adds 1 to player count and odd / even changes player.

// eventListener for all divs
for (let i = 0; i < allBoxes.length; i++) {
    allBoxes[i].addEventListener('click', handleClick)
}

// creating an array that takes in user inputs as well, this might help for win checking later on
var boardArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

// starting with odd player
let currentPlayer = 1;
turnDisplay.textContent = playerX;
result.textContent = "";

function handleClick(event) {
    let clickedSquare = event.target;
    //Using datasets to get 'coordinates' with each click
    let clickedRow = Number(clickedSquare.dataset.row);
    let clickedColumn = Number(clickedSquare.dataset.column);
    // user inputs - player 1 = 2 and player 2 = 5. THis allows no common denominators and we can calculate sum of array later on
    if (clickedSquare.textContent == "" && currentPlayer % 2 !== 0) {
      advice.textContent = ""
      boardArray[clickedRow-1][clickedColumn-1] = playerX;
      clickedSquare.textContent = playerX;
      turnDisplay.textContent = playerO;
      currentPlayer++;
      checkWin();
    } else if (clickedSquare.textContent == "" && currentPlayer % 2 == 0) {
      advice.textContent = ""
      boardArray[clickedRow-1][clickedColumn-1] = playerO;
      clickedSquare.textContent = playerO;
      turnDisplay.textContent = playerX;
      currentPlayer++;
      checkWin();
    } else {
        advice.textContent = "You can't play a square that's already been played."
    }
}

// function to handle reset button, reset playercount, clear the board (loop through divs) and restart the game + eventListener, also loops through and reset the board array  
function handleReset() {
    for (let i = 0; i < allBoxes.length; i++) {
    allBoxes[i].textContent = "";
    }
    // reset boardArray
    for (let j = 0; j < boardArray[0].length; j++) {
        for (let k = 0; k < boardArray[0].length; k++){
        boardArray[j][k] = "";
        }
    }
    turnDisplay.textContent = playerX;
    result.textContent = "";
    currentPlayer = 1;
}
  
resetButton.addEventListener('click', handleReset);

// will need a function to handle win checking and declare a winner or tie. Could be a bunch of if/if else statements nut will be long. Neither user can win until turn 5 at earliest. 

function checkWin() {
    // horizontal wins
    if (isEqual(boardArray[0][0], boardArray[0][1]) && isEqual(boardArray[0][0], boardArray[0][2])) {
        result.textContent = `${boardArray[0][0]} wins!`;
    } else if (isEqual(boardArray[1][0] == boardArray[1][1]) && isEqual(boardArray[1][0], boardArray[1][2])) {
        result.textContent = `${boardArray[1][0]} wins!`;
    } else if (isEqual(boardArray[2][0], boardArray[2][1]) && isEqual(boardArray[2][0], boardArray[2][2])) {
        result.textContent = `${boardArray[2][0]} wins!`;
    // vertical wins
    } else if (isEqual(boardArray[0][0], boardArray[1][0]) && isEqual(boardArray[0][0], boardArray[2][0])) {
        result.textContent = `${boardArray[0][0]} wins!`;
    } else if (isEqual(boardArray[0][1], boardArray[1][1]) && isEqual(boardArray[0][1], boardArray[2][1])) {
        result.textContent = `${boardArray[0][1]} wins!`;
    } else if (isEqual(boardArray[0][2], boardArray[1][2]) && isEqual(boardArray[0][2], boardArray[2][2])) {
        result.textContent = `${boardArray[0][2]} wins!`;
    // diagonal wins
    } else if (isEqual(boardArray[0][0], boardArray[1][1]) && isEqual(boardArray[0][0], boardArray[2][2])) {
        result.textContent = `${boardArray[0][0]} wins!`;
    } else if (isEqual(boardArray[0][2], boardArray[1][1]) && isEqual(boardArray[0][2], boardArray[2][0])) {
        result.textContent = `${boardArray[0][2]} wins!`;
    } else if (currentPlayer == 10) {
        result.textContent = "It's a draw."
    }
}

// function to ignore empty values in boardArray for if statements
function isEqual(val1, val2) {
    if (val1 == "" || val2 == "") {
        return false;
    }
    return val1 == val2;
}