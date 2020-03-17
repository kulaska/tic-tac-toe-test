import { Board } from '../types'

export default function getBoardDifference(previousBoard: Board, newBoard: Board) {
    let elementRow, elementColumn;

    if (previousBoard.length !== newBoard.length) {
        throw new Error('One of the elements is not of type board')
    }

    for (let row in previousBoard) {
        for (let column in previousBoard) {
            if (previousBoard[row][column] !== newBoard[row][column]) {
                elementColumn = column;
                elementRow = row;
                break;
            }
        }
    }

    return [parseInt(elementRow, 10), parseInt(elementColumn, 10)];
}