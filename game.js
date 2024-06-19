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

const player = (letter) => {
    return {letter};
};

const boardObject = gameBoard();
const playerOne = player("X");
const playerTwo = player("O");

const gameInfo = document.querySelector(".player-info");
const boardGrid = document.querySelector(".game-board");
const restartButton = document.querySelector(".restart-button");

let gameOver = false;
let currPlayer = playerOne;

const displayBoard = () => {
    const board = boardObject.getBoard();
    boardGrid.innerHtml= "";
    gameInfo.textContent = `Player ${currPlayer.letter}'s Turn!`;

    for (let i = 0; i < board.length; i++) {
        const cell = document.createElement("div");
        cell.setAttribute("grid-num", i);
        cell.classList.add("cell");

        cell.addEventListener("click", () => handleCellClick(i));

        cell.textContent = board[i];
        boardGrid.append(cell);
    }
};
restartButton.addEventListener("click", () => {
    boardObject.resetBoard();
    gameOver = false;
    currPlayer = playerOne;
    displayBoard();

});

displayBoard();

