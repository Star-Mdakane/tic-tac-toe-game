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
const roundWinner = document.getElementById("round-winner");
const turnDisplay = document.querySelector(".current-turn-svg");
const iconImage = document.querySelector(" .icon-image");
const winnerText = document.querySelector("#winText");
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
            iconImage.style.display = "block";

            iconImage.innerHTML = `<img src="./assets/icon-x.svg" alt="x icon">`
            winnerText.innerHTML = "Takes the round";
            winnerText.style.color = "rgb(49 195 189)";
        } else {
            oCount++;
            oScore.value = oCount;
            restartPopup.classList.remove("show");
            gameResultPopup.classList.add("show");
            iconImage.style.display = "block";
            iconImage.innerHTML = `<img src="./assets/icon-o.svg" alt="o icon">`
            winnerText.innerHTML = "Takes the round";
            winnerText.style.color = "rgb(242 177 55)";
        }
        console.log(`${currentTurn} wins`);

    } else if (checkForDraw()) {
        overlay.classList.add("show");
        restartPopup.classList.remove("show");
        gameResultPopup.classList.add("show");
        roundWinner.style.display = "none";
        iconImage.style.display = "none";
        winnerText.innerHTML = "Round tied";
        winnerText.style.color = "rgb(168 191 201)";

        tieCount++;
        tieScore.value = tieCount;

        console.log("draw");
    } else {
        const svgX = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
            <path fill="#31C3BD" fill-rule="evenodd"
                d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" />
        </svg>`;

        const svgO = `<svg width="64" height="64">
            <path fill="#F2B137"
                d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" />
        </svg>`;

        currentTurn = currentTurn == "x" ? "o" : "x";

        if (currentTurn == "x") {
            turnDisplay.innerHTML = svgX;
        } else {
            turnDisplay.innerHTML = svgO;
        }

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
})

nextBtn.addEventListener("click", () => {
    startGame();
})







