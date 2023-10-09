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

    return { getMarker1, getMarker2, getArray, addValue };

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

    let currentPlayer = (Math.random() > 0.5) ? player1 : player2;

    const switchPlayer = function () {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const playRound = function () {
        console.log(`Current turn: ${currentPlayer.getName()}`);
        console.table(gameboard.getArray());
        let position = prompt("Which x, y positions would you like to play (x, y)?: ")
        let [posX, posY] = position.split(",");
        gameboard.addValue(currentPlayer.getMarker(), posX, posY);
        console.table(gameboard.getArray());
        switchPlayer();
    }

    return { playRound, switchPlayer };
})();