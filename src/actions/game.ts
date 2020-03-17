import Redux from "redux";
import axios from "../helpers/axios";
import {
    PROCESS_MOVE,
    RESET_GAME,
    SET_BOARD,
    FINISH_GAME,
    AI_MOVE,
    PLAYER_MOVE
} from "./actionTypes";
import { getScore, setHistory } from './score';
import store from '../store';
import getBoardDifference from '../helpers/getBoardDifference';
import { GameElement, Board, ServerResponse } from "../types";
import { AxiosResponse } from "axios";

const getElementIndex = (rowIndex: number, columnIndex: number): number => {
    return 3 * rowIndex + columnIndex + 1;
};

function logPlayerMove(rowIndex: number, columnIndex: number) {
    return {
        type: PLAYER_MOVE,
        payload: {
            rowIndex,
            columnIndex
        }
    }
}

function logAiMove(previousBoard: Board, newBoard: Board) {
    const [rowIndex, columnIndex] = getBoardDifference(previousBoard, newBoard);

    return {
        type: AI_MOVE,
        payload: {
            rowIndex,
            columnIndex
        }
    }
}

function processMove(index: number, symbol: GameElement) {
    return {
        type: PROCESS_MOVE,
        payload: {
            index,
            symbol
        }
    };
}

function setBoard(newBoard: Board, isEnd?: boolean, winner?: GameElement) {
    return {
        type: SET_BOARD,
        payload: {
            newBoard: [...newBoard]
        }
    };
}

function finishGame(isDraw: boolean, winner: GameElement | undefined) {
    let winnerElement: GameElement;

    if (winner) {
        winnerElement = winner;
    }

    return {
        type: FINISH_GAME,
        payload: {
            isDraw,
            winner: winnerElement
        }
    };
}

export function processUserMove(rowIndex: number, columnIndex: number, symbol: GameElement) {
    const index = getElementIndex(rowIndex, columnIndex)
    const body = JSON.stringify({ index });

    return async function (dispatch: Redux.Dispatch) {
        dispatch(processMove(index, symbol));
        dispatch(logPlayerMove(rowIndex, columnIndex))

        try {
            const response: AxiosResponse = await axios.post(
                "/api/game/move",
                body
            );

            const data: ServerResponse = response.data;

            const previousState = store.getState().gameReducer.currentBoard;
            dispatch(setBoard(data.result.board));

            if (data.result.end) {
                const isDraw = !data.result.winner;
                dispatch(finishGame(isDraw, data.result.winner));
                const { result } = await getScore();

                dispatch(setHistory(result));
            } else {
                dispatch(logAiMove(previousState, store.getState().gameReducer.currentBoard))
            }
        } catch (err) {
            console.log(err.message);
        }
    };
}

export function resetGame() {
    return async function (dispatch: Redux.Dispatch) {
        try {
            const response: AxiosResponse = await axios.post("/api/game/reset");
        } catch (err) {
            console.log(err);
        }
        dispatch({
            type: RESET_GAME,
            payload: {}
        });
    };
}

export function getCurrentGameState() {
    return async function (dispatch: Redux.Dispatch) {
        try {
            const response: AxiosResponse = await axios.get('/api/game');

            const data: ServerResponse = response.data;

            dispatch(setBoard(data.result.board));
        } catch (err) {
            console.log(err);
        }
    }
}

export function startNextGame() {
    return async function (dispatch: Redux.Dispatch) {
        try {
            const response: AxiosResponse = await axios.get(
                "/api/game/next"
            );

            const data: ServerResponse = response.data;

            dispatch(setBoard(data.result.board));
        } catch (err) {
            console.log(err)
        }
    }
}
