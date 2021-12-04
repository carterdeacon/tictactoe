// Variables for players
const PLAYER_X = "X";
const PLAYER_O = "O";
const WIN_MESSAGE = " wins!";
const DRAW_MESSAGE = "It's a draw."

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
turnDisplay.textContent = PLAYER_X;
result.textContent = "";

function handleClick(event) {
    let clickedSquare = event.target;
    // Using datasets to get 'coordinates' with each click
    let clickedRow = Number(clickedSquare.dataset.row);
    let clickedColumn = Number(clickedSquare.dataset.column);
    if (clickedSquare.textContent == "" && currentPlayer % 2 !== 0) {
        clickedSquare.classList.add(PLAYER_X);
        handleTurn();
        boardArray[clickedRow-1][clickedColumn-1] = PLAYER_X  ;
        clickedSquare.textContent = PLAYER_X;
        checkWin();
        turnDisplay.textContent = PLAYER_O;
    } else if (clickedSquare.textContent == "" && currentPlayer % 2 == 0) {
        handleTurn();
        boardArray[clickedRow-1][clickedColumn-1] = PLAYER_O;
        clickedSquare.textContent = PLAYER_O;
        checkWin();
        turnDisplay.textContent = PLAYER_X;
    } else {
        advice.classList.add('animate__animated', 'animate__shakeX');
        advice.textContent = "You can't play a square that's already been played.";
    }
}

function handleTurn() {
    advice.textContent = "";
    advice.classList.remove('animate__animated', 'animate__shakeX');
    currentPlayer++;
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
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].className = "square";
    }
    turnDisplay.textContent = PLAYER_X;
    result.textContent = "";
    currentPlayer = 1;
    modal.style.display = "none";
}
  
resetButton.addEventListener('click', handleReset);

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
            if (checkBoardHorizontal == PLAYER_X) {
                xCountHorizontal++;
                if (xCountHorizontal == 3) {
                    showModal();
                    result.innerHTML = `${PLAYER_X} ${WIN_MESSAGE}`;
                    return;
                }
            } else if (checkBoardHorizontal == PLAYER_O) {
                oCountHorizontal++;
                if (oCountHorizontal == 3) {
                    showModal();
                    result.innerHTML = `${PLAYER_O} ${WIN_MESSAGE}`;
                    return;
                }
            } if (checkBoardVertical == PLAYER_X) {
                xCountVertical++;
                if (xCountVertical == 3) {
                    showModal();
                    result.innerHTML = `${PLAYER_X} ${WIN_MESSAGE}`;
                    return;
                }
            } else if (checkBoardVertical == PLAYER_O) {
                oCountVertical++;
                if (oCountVertical == 3) {
                    showModal();
                    result.innerHTML = `${PLAYER_O} ${WIN_MESSAGE}`;
                    return;
                }
            }
        }
    }
}