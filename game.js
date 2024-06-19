const gameBoard = () => {
    let board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;
    const setBoard = (newBoard) => {
        board = newBoard;
    };

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
    boardGrid.innerHTML = "";
    gameInfo.textContent = `Player ${currPlayer.letter}'s Turn!`;

    for (let i = 0; i < board.length; i++) {
        const cell = document.createElement("div");
        cell.setAttribute("grid-num", i);
        cell.classList.add("cell");

         // Add a click event listener to each cell.
        cell.addEventListener("click", () => handleCellClick(i));

        // Display the player's letter if the cell is not empty.
        cell.textContent = board[i];

        boardGrid.append(cell);
    }
};

const handleCellClick = (index) => {
    if(gameOver) {return};

    const board = boardObject.getBoard();

    //Checking if the cell is empty
    if(board[index] === "") {
        //Update the board with the currPlayer's letter
        board[index] = currPlayer.letter;
        boardObject.setBoard(board);
        
        //Update interface with new board
        displayBoard();

        // Check if the current player has won or if it's a draw.
        if (checkWin(currPlayer.letter)) {
            gameInfo.textContent = `Player ${currPlayer.letter} wins!`;
            gameOver = true;
        }
        else if (checkDraw()) {
            gameInfo.textContent = `Draw!`;
            gameOver = true;
        }
        else {
            currPlayer = currPlayer === playerOne ? playerTwo : playerOne;
            displayBoard();
        }
    }
};

const checkWin = (letter) => {
    const board = boardObject.getBoard();

    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // Rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // Columns
        [0, 4, 8],
        [2, 4, 6], // Diagonals
    ];
    
    //check for winning combo
    for (const combo of winCombos) {
        const [cellOne, cellTwo, cellThree] = combo;

        if(board[cellOne] === letter && board[cellTwo] === letter && board[cellThree] === letter) {
            const winningCells = document.querySelectorAll(`[grid-num="${cellOne}"], [grid-num="${cellTwo}"], [grid-num="${cellThree}"]`);
            console.log(winningCells);
            winningCells.forEach((cell) => {
                cell.classList.add("winning-cell");
            });

            return true; // Player has won.
        }
    }
    return false; //No winning combo found
};

const checkDraw = () => {
    const board = boardObject.getBoard();

    if(!board.includes("")) {
        return true;
    }
    return false;
}

restartButton.addEventListener("click", () => {
    boardObject.resetBoard();
    gameOver = false;
    currPlayer = playerOne;
    displayBoard();

});


displayBoard();

