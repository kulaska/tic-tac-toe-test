import {
    RESET_GAME,
    PROCESS_MOVE,
    SET_BOARD,
    FINISH_GAME
} from "../actions/actionTypes";
import { GameElement, Board, GameActions, ReduxState } from "../types";

const initialBoard: Board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

const initialState: ReduxState = {
    playerWins: 0,
    AiWins: 0,
    draw: 0,
    player: "X",
    currentBoard: [...initialBoard]
};

const getRowPosition = (index: number): number => {
    return Math.floor(index / 3);
};

const getColumnPosition = (index: number): number => {
    return index % 3;
};

const changePlayerSide = (currentSide: GameElement): GameElement => {
    return currentSide === "X" ? "O" : "X";
};

const setBoardItem = (board: Board, index: number, symbol: GameElement) => {
    const boardCopy = [...board];
    const row = getRowPosition(index);
    const column = getColumnPosition(index);
    boardCopy[row][column] = symbol;

    return boardCopy;
};

export default function (state: ReduxState = initialState, action: GameActions) {
    const { type, payload } = action;

    switch (type) {
        case RESET_GAME:
            return {
                ...state,
                currentBoard: [...initialBoard]
            };
        case PROCESS_MOVE:
            const newBoard = setBoardItem(
                [...state.currentBoard],
                payload.index,
                payload.symbol
            );
            return {
                ...state,
                currentBoard: newBoard
            };
        case SET_BOARD:
            return {
                ...state,
                currentBoard: payload.newBoard
            };
        case FINISH_GAME:
            let { draw, playerWins, AiWins } = state;

            let newPlayerSide = changePlayerSide(state.player);

            if (payload.isDraw) {
                return {
                    ...state,
                    player: newPlayerSide,
                    draw: draw + 1
                };
            } else {
                if (payload.winner === state.player) {
                    return {
                        ...state,
                        player: newPlayerSide,
                        playerWins: playerWins + 1
                    };
                } else {
                    return {
                        ...state,
                        player: newPlayerSide,
                        AiWins: AiWins + 1
                    };
                }
            }
        default:
            return state;
    }
}
