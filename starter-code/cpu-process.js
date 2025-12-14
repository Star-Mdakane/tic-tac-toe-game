function againstCpu() {
    overlay.classList.remove("show");
    board.classList.remove("turn-x", "turn-o");

    currentTurn = "x";

    cells.forEach(cell => {
        cell.classList.remove("x", "o");
        cell.removeEventListener("click", handleCellClick);
        cell.addEventListener("click", handleCellClick, { once: true });


        if (playerTurn == "x" && currentTurn == "x") {
            //player turn
            console.log("player turn");
        } else if (playerTurn == "o" && currentTurn == "o") {
            //player turn
            console.log("player turn");

        } else {
            //computer turn
            console.log("cpu turn");
        }


    });

    if (currentTurn == "x") {
        board.classList.add("turn-x");
    } else {
        board.classList.add("turn-o");
    }
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

function smartMove(emptyCells) {
    if (emptyCells.length <= 3) {
        randomIndex
    } else {
        checkFOrTwo()
    }
}

function checkFOrTwo() {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cpuCell = emptyCells[randomIndex];
    if (emptyCells.length <= 3) {
        placeMark(cpuCell);
    } else {
        combinations.some(combination => {
            if (combination.length == 1) {
                placeMark(cpuCell)
            }
            else if (combination.length == 2) {
                combination.every(c => {
                    if (cells[c].classList.contains(currentTurn)) {
                        placeMark()
                    }
                })
            }
        })
    }
}