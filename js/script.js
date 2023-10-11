// Main goal: To have as little global code as possible

const gameboard = (function () {
    const MARKER_1 = "X";
    const MARKER_2 = "O";

    const gameArray = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ];

    const getMarker1 = function () {
        return MARKER_1;
    }

    const getMarker2 = function () {
        return MARKER_2;
    }

    const getArray = function () {
        return gameArray;
    }

    const addValue = function (value, i, j) {
        if (gameArray[i][j] === MARKER_1 || gameArray[i][j] === MARKER_2) {
            return false;
        }
        gameArray[i][j] = value;
        return true;
    }

    const resetArray = function () {
        for (let i = 0; i < gameArray.length; i++) {
            for (let j = 0; j < gameArray[i].length; j++) {
                gameArray[i][j] = " ";
            }
        }
    }

    const toString = function () {
        let result = "";
        for (let row of gameArray) {
            result += `${row[0]} | ${row[1]} | ${row[2]}\n`;
        }
        return result;
    }

    return { getMarker1, getMarker2, getArray, addValue, resetArray, toString };

})();

function createPlayer(name, marker) {
    let score = 0;
    const getName = function () {
        return name;
    }
    const getMarker = function () {
        return marker;
    }
    const getScore = function () {
        return score;
    }
    const incrementScore = function () {
        score++;
    }
    const resetScore = function () {
        score = 0;
    }
    return { getName, getMarker, getScore, incrementScore, resetScore };
}

const gameController = (function () {
    const player1 = createPlayer("Player 1", gameboard.getMarker1());
    const player2 = createPlayer("Player 2", gameboard.getMarker2());
    const gameArray = gameboard.getArray();

    let gameEnded = false;
    let isTied = false;
    let currentPlayer = (Math.random() > 0.5) ? player1 : player2;

    const switchPlayer = function () {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const isWinRound = function () {
        return isWinRow(gameArray[0][0], gameArray[1][1], gameArray[2][2]) ||
            isWinRow(gameArray[2][0], gameArray[1][1], gameArray[0][2]) ||
            isWinRow(gameArray[0][0], gameArray[1][0], gameArray[2][0]) ||
            isWinRow(gameArray[0][1], gameArray[1][1], gameArray[2][1]) ||
            isWinRow(gameArray[0][2], gameArray[1][2], gameArray[2][2]) ||
            isWinRow(gameArray[0][0], gameArray[0][1], gameArray[0][2]) ||
            isWinRow(gameArray[1][0], gameArray[1][1], gameArray[1][2]) ||
            isWinRow(gameArray[2][0], gameArray[2][1], gameArray[2][2]);
    }

    const isTieRound = function () {
        for (let i = 0; i < gameArray.length; i++) {
            for (let j = 0; j < gameArray.length; j++) {
                if (gameArray[i][j] == " ") {
                    return false;
                }
            }
        }
        return true;
    }

    const isWinRow = function (value1, value2, value3) {
        return (value1 !== " " && value2 !== " " && value3 !== " ") && (value1 === value2 && value2 === value3);
    }

    const playRound = function () {
        console.log("WELCOME TO TIC-TAC-TOE CONSOLE GAME!!!!");
        console.log("######################################\n");

        while (!gameEnded) {
            console.log(`${currentPlayer.getName()}'s turn`);
            console.log(gameboard.toString());
            let validPlay = false;

            do {
                let position = prompt("Which x, y positions would you like to play (x,y)?: ")
                let [posX, posY] = position.split(",");
                validPlay = gameboard.addValue(currentPlayer.getMarker(), posX, posY);
                if (!validPlay) {
                    console.log(`There is already a marker at [${posX}, ${posY}]`);
                }
            } while (!validPlay);

            console.log(gameboard.toString());

            gameEnded = isWinRound() || isTieRound();
            isTied = !isWinRound && isTieRound();

            if (!gameEnded) {
                switchPlayer();
            }
        }

        if (isTied) {
            console.log("Game is Tied!");
        } else {
            currentPlayer.incrementScore();
            console.log(`${currentPlayer.getName()} has won!`);
        }

        console.log(`${player1.getName()} has ${player1.getScore()} and ${player2.getName()} has ${player2.getScore()}`);

        if (prompt("Do you want to play another round? (y/n): ") === "y") {
            gameboard.resetArray();
            gameEnded = false;
            isTied = false;
            currentPlayer = (Math.random() > 0.5) ? player1 : player2;
            playRound();
        }
    }

    return { playRound };
})();


const displayController = (function () {
    const player1 = createPlayer("Player 1", gameboard.getMarker1());
    const player2 = createPlayer("Player 2", gameboard.getMarker2());
    const boardDOM = document.querySelector(".board");
    const gameArray = gameboard.getArray();

    let gameEnded = false;
    let isTied = false;
    let currentPlayer = (Math.random() > 0.5) ? player1 : player2;

    const switchPlayer = function () {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const initializeBoard = function () {
        for (let rowIndex in gameArray) {
            for (let colIndex in gameArray[rowIndex]) {
                const cell = document.createElement("button");
                cell.setAttribute("data-row", rowIndex);
                cell.setAttribute("data-col", colIndex);
                cell.classList.add("cell");
                cell.addEventListener("click", (e) => {
                    console.log(`Row: ${e.target.getAttribute("data-row")} Col: ${e.target.getAttribute("data-col")}`);
                });
                boardDOM.appendChild(cell);
            }
        }
    }

    const playRound = function () {
        initializeBoard();
    };

    return { playRound };

})();

displayController.playRound();
// gameController.playRound();