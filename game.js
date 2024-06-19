const gameBoard = () => {
    let board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;
    const setBoard = (newBoard) => {
        board = newBoard;
    }

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    }

    return {getBoard, setBoard, resetBoard};

};

const player = (user) => {
    return {user};
};

const boardObject = gameBoard();
const playerOne = player("X");
const playerTwo = player("O");

const gameInfo = document.querySelector(".game-info");
const boardGrid = document.querySelector(".board-container");
const restartButton = document.querySelector(".restart-button");

let gameOver = false;
let currPlayer = playerOne;

restartButton.addEventListener("click", () => {
    boardObject.resetBoard();
    boardGrid.innerHtml= ""

});

