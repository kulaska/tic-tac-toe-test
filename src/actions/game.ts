import Redux from "redux";
import axios from "../helpers/axios";
import {
    PROCESS_MOVE,
    RESET_GAME,
    SET_BOARD,
    FINISH_GAME
} from "./actionTypes";
import { GameElement, Board, ServerResponse } from "../types";
import { AxiosResponse } from "axios";

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
    let winnerElement = "";

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

export function processUserMove(index: number, symbol: GameElement) {
    const body = JSON.stringify({ index });

    return async function(dispatch: Redux.Dispatch) {
        dispatch(processMove(index, symbol));

        try {
            const response: AxiosResponse = await axios.post(
                "/api/game/move",
                body
            );

            const data: ServerResponse = response.data;

            dispatch(setBoard(data.result.board));

            if (data.result.end) {
                const isDraw = !!data.result.winner;
                dispatch(finishGame(isDraw, data.result.winner));
            }
        } catch (err) {
            console.log(err.message);
        }
    };
}

export function resetGame() {
    return async function(dispatch: Redux.Dispatch) {
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
