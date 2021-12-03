// Variables for players
let playerX = "X";
let playerO = "O";

const WIN_MESSAGE = "wins!";
const DRAW_MESSAGE = "It's a draw. Nobody wins."

// Variables for gameplay
var allBoxes = document.querySelectorAll('.square');
var result = document.querySelector('.game-result');
var turnDisplay = document.querySelector('.turn');
var advice = document.querySelector('#advice');
var resetButton = document.querySelector('#reset-btn');

// modal variables
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];


// eventListener for all divs
for (let i = 0; i < allBoxes.length; i++) {
    allBoxes[i].addEventListener('click', handleClick)
}

// creating an array that takes in user inputs as well, for checking winner later
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
    // Using datasets to get 'coordinates' with each click
    let clickedRow = Number(clickedSquare.dataset.row);
    let clickedColumn = Number(clickedSquare.dataset.column);
    if (clickedSquare.textContent == "" && currentPlayer % 2 !== 0) {
        advice.textContent = "";
        boardArray[clickedRow-1][clickedColumn-1] = playerX;
        clickedSquare.textContent = playerX;
        currentPlayer++;
        checkWin();
        turnDisplay.textContent = playerO;
    } else if (clickedSquare.textContent == "" && currentPlayer % 2 == 0) {
        advice.textContent = "";
        boardArray[clickedRow-1][clickedColumn-1] = playerO;
        clickedSquare.textContent = playerO;
        currentPlayer++;
        checkWin();
        turnDisplay.textContent = playerX;
    } else {
        advice.textContent = "You can't play a square that's already been played.";
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
    modal.style.display = "none";
}
  
resetButton.addEventListener('click', handleReset);

// updated checkWin to loop so it's tidier

function showModal() {
    modal.style.display = "block";
}

function checkWin() {
    // if statement to manually check diagonals within boardArray
    var centralPlayer = boardArray[1][1];
    if ((centralPlayer !== "") && ((centralPlayer == boardArray[0][0] && centralPlayer == boardArray[2][2]) || (centralPlayer == boardArray[0][2] && centralPlayer == boardArray[2][0]))) {
        showModal();
        result.innerHTML = `${centralPlayer} ${WIN_MESSAGE}`;
    } else if (currentPlayer == 10) {
        showModal();
        result.innerHTML = DRAW_MESSAGE;
    }
    // for loop to check horizontally and vertically (i & j switch)
    for (let i = 0; i < boardArray.length; i++) {
        let xCountHorizontal = 0;
        let oCountHorizontal = 0;
        let xCountVertical = 0;
        let oCountVertical = 0;
        for (let j = 0; j < boardArray[0].length; j++) {
            var checkBoardHorizontal = boardArray[i][j];
            var checkBoardVertical = boardArray[j][i];
            if (checkBoardHorizontal == playerX) {
                xCountHorizontal++;
                if (xCountHorizontal == 3) {
                    showModal();
                    result.innerHTML = `${playerX} ${WIN_MESSAGE}`;
                    return;
                }
            } else if (checkBoardHorizontal == playerO) {
                oCountHorizontal++;
                if (oCountHorizontal == 3) {
                    showModal();
                    result.innerHTML = `${playerO} ${WIN_MESSAGE}`;
                    return;
                }
            } if (checkBoardVertical == playerX) {
                xCountVertical++;
                if (xCountVertical == 3) {
                    showModal();
                    result.innerHTML = `${playerX} ${WIN_MESSAGE}`;
                    return;
                }
            } else if (checkBoardVertical == playerO) {
                oCountVertical++;
                if (oCountVertical == 3) {
                    showModal();
                    result.innerHTML = `${playerO} ${WIN_MESSAGE}`;
                    return;
                }
            }
        }
    }
}