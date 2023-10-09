// Store the gameboard as an array inside of a Gameboard object
// Store player in objects
// Object to control the flow of the game itself

const gameboard = (function () {
    const MARKER_1 = "X";
    const MARKER_2 = "O";

    const gameArray = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
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
                gameArray[i][j] = "";
            }
        }
    }

    return { getMarker1, getMarker2, getArray, addValue, resetArray };

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

    let gameEnded = false;
    let isTied = false;
    let boardIsIncompleted = false;

    let currentPlayer = (Math.random() > 0.5) ? player1 : player2;

    const switchPlayer = function () {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const playRound = function () {
        while (!gameEnded) {
            console.log(`Current turn: ${currentPlayer.getName()}`);
            console.table(gameboard.getArray());
            let validPlay = false;
            do {
                let position = prompt("Which x, y positions would you like to play (x, y)?: ")
                let [posX, posY] = position.split(",");
                validPlay = gameboard.addValue(currentPlayer.getMarker(), posX, posY);

                if (!validPlay) {
                    console.log(`There is already a marker at [${posX}, ${posY}]`);
                }
            } while (!validPlay);
            console.table(gameboard.getArray());
            checkWin();
            boardIsIncompleted = gameboard.getArray().some((row) => row.some(value => value === ""));
            if (!gameEnded && !boardIsIncompleted) {
                gameEnded = true;
                isTied = true;
            }

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
        let newGame = prompt("Do you want to play another round? (y/n): ") === "y";
        if (newGame) {
            gameboard.resetArray();
            gameEnded = false;
            isTied = false;
            boardIsIncompleted = false;
            currentPlayer = (Math.random() > 0.5) ? player1 : player2;
            playRound();
        }
    }

    const checkWin = function () {
        const gameArray = gameboard.getArray();

        if (((gameArray[0][0] !== "" && gameArray[1][1] !== "" && gameArray[2][2] !== "") && (gameArray[0][0] === gameArray[1][1] && gameArray[1][1] === gameArray[2][2])) ||
            ((gameArray[2][0] !== "" && gameArray[1][1] !== "" && gameArray[0][2] !== "") && (gameArray[2][0] === gameArray[1][1] && gameArray[1][1] === gameArray[0][2])) ||
            ((gameArray[0][0] !== "" && gameArray[1][0] !== "" && gameArray[2][0] !== "") && (gameArray[0][0] === gameArray[1][0] && gameArray[1][0] === gameArray[2][0])) ||
            ((gameArray[0][1] !== "" && gameArray[1][1] !== "" && gameArray[2][1] !== "") && (gameArray[0][1] === gameArray[1][1] && gameArray[1][1] === gameArray[2][1])) ||
            ((gameArray[0][2] !== "" && gameArray[1][2] !== "" && gameArray[2][2] !== "") && (gameArray[0][2] === gameArray[1][2] && gameArray[1][2] === gameArray[2][2])) ||
            ((gameArray[0][0] !== "" && gameArray[0][1] !== "" && gameArray[0][2] !== "") && (gameArray[0][0] === gameArray[0][1] && gameArray[0][1] === gameArray[0][2])) ||
            ((gameArray[1][0] !== "" && gameArray[1][1] !== "" && gameArray[1][2] !== "") && (gameArray[1][0] === gameArray[1][1] && gameArray[1][1] === gameArray[1][2])) ||
            ((gameArray[2][0] !== "" && gameArray[2][1] !== "" && gameArray[2][2] !== "") && (gameArray[2][0] === gameArray[2][1] && gameArray[2][1] === gameArray[2][2]))) {
            gameEnded = true;
            isTied = false;
        }
    }

    return { playRound };
})();