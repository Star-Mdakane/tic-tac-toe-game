const board = document.getElementById("board");
const restart = document.getElementById("restart");
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
        console.log(`${currentTurn} wins`);
    } else if (checkForDraw()) {
        console.log("draw");
    } else {

        currentTurn = currentTurn == "x" ? "o" : "x";

        board.classList.toggle("turn-x", currentTurn == "x");
        board.classList.toggle("turn-o", currentTurn == "o");
    }

}

function startGame() {
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
    startGame();
});







