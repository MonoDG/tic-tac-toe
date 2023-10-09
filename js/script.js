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