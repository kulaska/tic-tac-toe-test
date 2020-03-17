import {
    RESET_GAME,
    PROCESS_MOVE,
    SET_BOARD,
    FINISH_GAME,
    PLAYER_MOVE,
    AI_MOVE
} from "../actions/actionTypes";
import { GameElement, Board, GameActions, ReduxState } from "../types";

const returnEmptyBoard = (): Board => [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const initialState: ReduxState = {
    playerWins: 0,
    AiWins: 0,
    draw: 0,
    player: "X",
    currentBoard: returnEmptyBoard(),
    log: []
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
    const row = getRowPosition(index - 1);
    const column = getColumnPosition(index - 1);
    boardCopy[row][column] = symbol;

    return boardCopy;
};

const getPlayerLog = (rowIndex, columnIndex) => `Player makes a move at row ${rowIndex + 1}, column ${columnIndex + 1}`

const getAILog = (rowIndex, columnIndex) => `AI makes a move at row ${rowIndex + 1}, column ${columnIndex + 1}`

const getAiWinLog = () => 'AI wins. bEwArE, pathetic homo sapiens';

const getPlayerWinLog = () => 'Player wins. There is still hope';

const getDrawLog = () => 'It\'s a draw. For now';

export default function (state: ReduxState = initialState, action: GameActions) {
    const { type, payload } = action;

    switch (type) {
        case PLAYER_MOVE:
            return {
                ...state,
                log: [...state.log, getPlayerLog(payload.rowIndex, payload.columnIndex)]
            }
        case AI_MOVE:
            return {
                ...state,
                log: [...state.log, getAILog(payload.rowIndex, payload.columnIndex)]
            }
        case RESET_GAME:
            return {
                ...state,
                currentBoard: returnEmptyBoard(),
                log: []
            };
        case PROCESS_MOVE:
            const newBoard = setBoardItem(
                state.currentBoard,
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
                    draw: draw + 1,
                    log: [...state.log, getDrawLog()]
                };
            } else {
                if (payload.winner === state.player) {
                    return {
                        ...state,
                        player: newPlayerSide,
                        playerWins: playerWins + 1,
                        log: [...state.log, getPlayerWinLog()]
                    };
                } else {
                    return {
                        ...state,
                        player: newPlayerSide,
                        AiWins: AiWins + 1,
                        log: [...state.log, getAiWinLog()]
                    };
                }
            }
        default:
            return state;
    }
}
