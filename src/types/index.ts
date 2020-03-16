import {
    PROCESS_MOVE,
    RESET_GAME,
    SET_BOARD,
    FINISH_GAME
} from "../actions/actionTypes";

type ProcessMovePayload = {
    index: number;
    symbol: GameElement;
};

type SetBoardPayload = {
    newBoard: Board;
};

type FinishGamePayload = {
    isDraw: boolean;
    winner: GameElement;
};

type ProcessMoveAction = {
    type: typeof PROCESS_MOVE;
    payload: ProcessMovePayload;
};

type SetBoardAction = {
    type: typeof SET_BOARD;
    payload: SetBoardPayload;
};

type FinishGameAction = {
    type: typeof FINISH_GAME;
    payload: FinishGamePayload;
};

type ResetGameAction = {
    type: typeof RESET_GAME;
    payload: any
};

export type GameElement = "" | "X" | "O";

export type Board = Array<Array<GameElement>>;

export type ReduxState = {
    readonly playerWins: number;
    readonly AiWins: number;
    readonly draw: number;
    readonly currentBoard: Board;
    readonly player: GameElement;
};

export type GameActions = ProcessMoveAction | ResetGameAction | SetBoardAction | FinishGameAction;

export type ServerRequest = {
    index: number;
};

export type ServerResponse = {
    ok: boolean;
    result: {
        player: GameElement;
        ai: GameElement;
        board: Board;
        nextMove: GameElement;
        end?: boolean;
        winner?: GameElement;
    };
};
