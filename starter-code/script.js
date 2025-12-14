const board = document.getElementById("board");
const overlay = document.getElementById("overlay");
const restart = document.getElementById("restart");
const confirmBtn = document.getElementById("confirm");
const cancelBtn = document.getElementById("cancel");
const xScore = document.getElementById("x-count");
const oScore = document.getElementById("circle-count");
const tieScore = document.getElementById("tie-count");
const quitBtn = document.getElementById("quit");
const nextBtn = document.getElementById("next");
const restartPopup = document.querySelector(".restart-popup");
const gameResultPopup = document.querySelector(".game-result");
const cells = document.querySelectorAll("#board .cell");
const playerSelectBtns = document.querySelectorAll("input[name='playerMark']");
const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


const selectPlayerTurn = document.querySelector("input[name='playerMark']:checked");
let playerTurn = selectPlayerTurn ? selectPlayerTurn.value : null;
let currentTurn;
let xCount = 0;
let oCount = 0;
let tieCount = 0;
console.log(playerTurn);

playerSelectBtns.forEach(radio => {
    radio.addEventListener("change", (e) => {
        playerTurn = e.target.value;
    })
})

startGame();

function handleCellClick(e) {
    const cell = e.target;
    placeMark(cell);

}

function placeMark(cell) {
    cell.classList.add(currentTurn);

    if (checkForWin()) {
        overlay.classList.add("show");
        if (currentTurn == "x") {
            xCount++;
            xScore.value = xCount;
            restartPopup.classList.remove("show");
            gameResultPopup.classList.add("show");
        } else {
            oCount++;
            oScore.value = oCount;
            restartPopup.classList.remove("show");
            gameResultPopup.classList.add("show");
        }
        console.log(`${currentTurn} wins`);

    } else if (checkForDraw()) {
        overlay.classList.add("show");
        restartPopup.classList.remove("show");
        gameResultPopup.classList.add("show");

        tieCount++;
        tieScore.value = tieCount;

        console.log("draw");
    } else {

        currentTurn = currentTurn == "x" ? "o" : "x";

        board.classList.toggle("turn-x", currentTurn == "x");
        board.classList.toggle("turn-o", currentTurn == "o");
    }

}

function startGame() {
    overlay.classList.remove("show");
    board.classList.remove("turn-x", "turn-o");

    currentTurn = playerTurn;

    cells.forEach(cell => {
        cell.classList.remove("x", "o");
        cell.removeEventListener("click", handleCellClick);
        cell.addEventListener("click", handleCellClick, { once: true });
    })

    if (currentTurn == "x") {
        board.classList.add("turn-x");
    } else {
        board.classList.add("turn-o");
    }
}

function quitGame(xCount, oCount, tieCount) {

    overlay.classList.remove("show");
    board.classList.remove("turn-x", "turn-o");

    currentTurn = playerTurn;

    cells.forEach(cell => {
        cell.classList.remove("x", "o");
        cell.removeEventListener("click", handleCellClick);
        cell.addEventListener("click", handleCellClick, { once: true });
    })

    if (currentTurn == "x") {
        board.classList.add("turn-x");
    } else {
        board.classList.add("turn-o");
    }

    //Back to start screen

    xScore.value = xCount;
    oScore.value = oCount;
    tieScore.value = tieCount;
}

function checkForWin() {
    return combinations.some(combination => {
        return combination.every(c => {
            if (cells[c].classList.contains(currentTurn)) {
                return true;
            }

            return false;
        })
    })
}

function checkForDraw() {
    return Array.from(cells).every(cell => {
        if (cell.classList.contains("x") || cell.classList.contains("o")) {
            return true;
        }

        return false;
    })
}

restart.addEventListener("click", () => {
    gameResultPopup.classList.remove("show");
    overlay.classList.add("show");
    restartPopup.classList.add("show");
});

cancelBtn.addEventListener("click", () => {
    overlay.classList.remove("show");
})

confirmBtn.addEventListener("click", () => {
    startGame();
})

quitBtn.addEventListener("click", () => {
    xCount = 0;
    oCount = 0;
    tieCount = 0;
    quitGame(xCount, oCount, tieCount);
    console.log("game quit");
})

nextBtn.addEventListener("click", () => {
    startGame();
})







