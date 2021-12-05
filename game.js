// Variables for players
let PLAYER_X = {
    name: "X",
    dumbCounter: 0,
    isTurn: false,
};
let PLAYER_O = {
    name: "O",
    dumbCounter: 0,
    isTurn: false,
};

const WIN_MESSAGE = " wins!";
const DRAW_MESSAGE = "It's a draw."

// Variables for gameplay
var allBoxes = document.querySelectorAll('.square');
var result = document.querySelector('.game-result');
var turnDisplay = document.querySelector('.turn');
var advice = document.querySelector('#advice');
var resetButton = document.querySelector('#reset-btn');
var xScore = document.querySelector('.xScore');
var oScore = document.querySelector('.oScore');


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

let currentPlayer = 1;

function initialise() {
    turnDisplay.textContent = PLAYER_X.name;
    PLAYER_X.isTurn = true;
    result.textContent = "";
}

initialise();

function handleClick(event) {
    let clickedSquare = event.target;
    if (clickedSquare.textContent !== "") {
        idiotCounter();
        return;
    }
    currentPlayer++;
    // Using datasets to get 'coordinates' with each click
    let clickedRow = Number(clickedSquare.dataset.row);
    let clickedColumn = Number(clickedSquare.dataset.column);
    if (PLAYER_X.isTurn) {
        clickedSquare.classList.add(PLAYER_X.name);
        boardArray[clickedRow-1][clickedColumn-1] = PLAYER_X.name  ;
        clickedSquare.textContent = PLAYER_X.name;
        checkWin();
        turnDisplay.textContent = PLAYER_O.name;
    } else if (PLAYER_O.isTurn) {
        boardArray[clickedRow-1][clickedColumn-1] = PLAYER_O.name;
        clickedSquare.textContent = PLAYER_O.name;
        checkWin();
        turnDisplay.textContent = PLAYER_X.name;
    } 
    PLAYER_X.isTurn = !PLAYER_X.isTurn;
    PLAYER_O.isTurn = !PLAYER_O.isTurn;
}

function idiotCounter() {
    if (PLAYER_X.isTurn) {
        handleDumbCounter(++PLAYER_X.dumbCounter);
    } else if (PLAYER_O.isTurn) {
        handleDumbCounter(++PLAYER_O.dumbCounter);
    }
}

function handleDumbCounter(dumbCounter) {
    advice.classList.add('animate__animated', 'animate__shakeX');
    switch (true) {
        case (dumbCounter >= 3 && dumbCounter < 5):
            advice.textContent = "Okay. Just play the game...";
            break;
        case (dumbCounter >= 5 && dumbCounter < 7):
            advice.textContent = "Pick a damn square!";
            break;
        case (dumbCounter >= 7 && dumbCounter < 9):
            advice.textContent = "Alright f****r. Move along...";
            break;
        case (dumbCounter >= 9 && dumbCounter < 15):
            advice.textContent = "Don't you have something better to be doing? Of course not. You're sad and alone.";
            break;
        case (dumbCounter >= 15):
            advice.textContent = "Repeatedly clicking a square in a game of TicTacToe? Is this really how you want to spend your miserable life?";
            break;
        default:
            advice.textContent = "You can't play a square that's already been played.";
            break;
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
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].className = "square";
    }
    turnDisplay.textContent = PLAYER_X.name;
    result.textContent = "";
    modal.style.display = "none";
    currentPlayer = 1;
    PLAYER_X.isTurn = true;
    PLAYER_O.isTurn = false;
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
        handleScore();
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
            if (checkBoardHorizontal == PLAYER_X.name) {
                xCountHorizontal++;
                if (xCountHorizontal == 3) {
                    showModal();
                    result.innerHTML = `${PLAYER_X.name} ${WIN_MESSAGE}`;
                    handleScore();
                    return;
                }
            } else if (checkBoardHorizontal == PLAYER_O.name) {
                oCountHorizontal++;
                if (oCountHorizontal == 3) {
                    showModal();
                    result.innerHTML = `${PLAYER_O.name} ${WIN_MESSAGE}`;
                    handleScore();
                    return;
                }
            } if (checkBoardVertical == PLAYER_X.name) {
                xCountVertical++;
                if (xCountVertical == 3) {
                    showModal();
                    result.innerHTML = `${PLAYER_X.name} ${WIN_MESSAGE}`;
                    handleScore();
                    return;
                }
            } else if (checkBoardVertical == PLAYER_O.name) {
                oCountVertical++;
                if (oCountVertical == 3) {
                    showModal();
                    result.innerHTML = `${PLAYER_O.name} ${WIN_MESSAGE}`;
                    handleScore();
                    return;
                }
            }
        }
    }
}

function handleScore() {
    let winner = result.innerHTML[0];
    if (winner == 'O') {
        oScore.innerText = Number(oScore.innerText) + 1;
    } else if (winner == 'X') {
        xScore.innerText = Number(xScore.innerText) + 1;
    }
}