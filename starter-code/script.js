const board = document.getElementById("board");
const restart = document.getElementById("restart");
const cells = document.querySelectorAll("#board .cell");
const playerSelectBtns = document.querySelectorAll("input[name='playerMark']");


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
    placeMark(cell)
}

function placeMark(cell) {
    cell.classList.add(currentTurn);
    console.log(currentTurn);

    currentTurn = currentTurn == "x" ? "o" : "x";

    board.classList.toggle("turn-x", currentTurn == "x");
    board.classList.toggle("turn-o", currentTurn == "o");



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

restart.addEventListener("click", () => {
    startGame();
});







