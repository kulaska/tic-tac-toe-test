import {
    PROCESS_MOVE,
    RESET_GAME,
    SET_BOARD,
    FINISH_GAME,
    PLAYER_MOVE,
    AI_MOVE
} from "../actions/actionTypes";

type LogMovePayload = {
    rowIndex: number;
    columnIndex: number;
};

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

type AiMoveAction = {
    type: typeof AI_MOVE;
    payload: LogMovePayload;
};

type PlayerMoveAction = {
    type: typeof PLAYER_MOVE;
    payload: LogMovePayload;
};

type ResetGameAction = {
    type: typeof RESET_GAME;
    payload: any;
};

export type GameElement = "X" | "O" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Board = Array<Array<GameElement>>;

export type ReduxState = {
    readonly playerWins: number;
    readonly AiWins: number;
    readonly draw: number;
    readonly currentBoard: Board;
    readonly player: GameElement;
    readonly log: Array<string>;
    readonly didGameEnd: boolean;
};

export type GameActions =
    | ProcessMoveAction
    | ResetGameAction
    | SetBoardAction
    | FinishGameAction
    | AiMoveAction
    | PlayerMoveAction;

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
