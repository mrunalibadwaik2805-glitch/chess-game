const board = document.getElementById("board");
const turnText = document.getElementById("turn");

let turn = "white";
let selected = null;

const startingBoard = [
    ["♜","♞","♝","♛","♚","♝","♞","♜"],
    ["♟","♟","♟","♟","♟","♟","♟","♟"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["♙","♙","♙","♙","♙","♙","♙","♙"],
    ["♖","♘","♗","♕","♔","♗","♘","♖"]
];

let chessBoard = JSON.parse(JSON.stringify(startingBoard));

const whitePieces = ["♙","♖","♘","♗","♕","♔"];
const blackPieces = ["♟","♜","♞","♝","♛","♚"];


function createBoard() {

    board.innerHTML = "";

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const square = document.createElement("div");

            square.classList.add("square");

            if ((row + col) % 2 === 0) {
                square.classList.add("light");
            } else {
                square.classList.add("dark");
            }

            square.textContent = chessBoard[row][col];

            square.dataset.row = row;
            square.dataset.col = col;

            square.onclick = () => selectSquare(row, col);

            board.appendChild(square);
        }
    }
}


function selectSquare(row, col) {

    const piece = chessBoard[row][col];

    // Select a piece
    if (selected === null) {

        if (piece === "") {
            return;
        }

        if (!isMyPiece(piece)) {
            alert("It's not your piece!");
            return;
        }

        selected = {
            row: row,
            col: col
        };

        createBoard();

        highlightSelected();

        return;
    }


    // Move piece
    const fromRow = selected.row;
    const fromCol = selected.col;

    if (isValidMove(fromRow, fromCol, row, col)) {

        chessBoard[row][col] = chessBoard[fromRow][fromCol];

        chessBoard[fromRow][fromCol] = "";

        changeTurn();

    } else {

        alert("Invalid move!");
    }

    selected = null;

    createBoard();
}


function isMyPiece(piece) {

    if (turn === "white") {
        return whitePieces.includes(piece);
    }

    return blackPieces.includes(piece);
}


function isValidMove(fromRow, fromCol, toRow, toCol) {

    const piece = chessBoard[fromRow][fromCol];
    const target = chessBoard[toRow][toCol];

    // Cannot capture your own piece
    if (target !== "" && isMyPiece(target)) {
        return false;
    }


    // Pawn
    if (piece === "♙") {

        return toRow === fromRow - 1 &&
               toCol === fromCol;
    }

    if (piece === "♟") {

        return toRow === fromRow + 1 &&
               toCol === fromCol;
    }


    // King
    if (piece === "♔" || piece === "♚") {

        return Math.abs(toRow - fromRow) <= 1 &&
               Math.abs(toCol - fromCol) <= 1;
    }


    // Knight
    if (piece === "♘" || piece === "♞") {

        const rowDifference =
            Math.abs(toRow - fromRow);

        const colDifference =
            Math.abs(toCol - fromCol);

        return (
            rowDifference === 2 && colDifference === 1 ||
            rowDifference === 1 && colDifference === 2
        );
    }


    // Rook
    if (piece === "♖" || piece === "♜") {

        return (
            fromRow === toRow ||
            fromCol === toCol
        );
    }


    // Bishop
    if (piece === "♗" || piece === "♝") {

        return (
            Math.abs(toRow - fromRow) ===
            Math.abs(toCol - fromCol)
        );
    }


    // Queen
    if (piece === "♕" || piece === "♛") {

        return (
            fromRow === toRow ||
            fromCol === toCol ||
            Math.abs(toRow - fromRow) ===
            Math.abs(toCol - fromCol)
        );
    }

    return false;
}


function changeTurn() {

    if (turn === "white") {
        turn = "black";
        turnText.textContent = "Black's Turn";
    } else {
        turn = "white";
        turnText.textContent = "White's Turn";
    }
}


function highlightSelected() {

    const squares = document.querySelectorAll(".square");

    squares.forEach(square => {

        const row = Number(square.dataset.row);
        const col = Number(square.dataset.col);

        if (
            row === selected.row &&
            col === selected.col
        ) {
            square.classList.add("selected");
        }
    });
}


function resetGame() {

    chessBoard = JSON.parse(JSON.stringify(startingBoard));

    turn = "white";

    selected = null;

    turnText.textContent = "White's Turn";

    createBoard();
}


createBoard();








