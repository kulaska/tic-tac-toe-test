import React, { useEffect, Fragment } from "react";
import { Button } from '@material-ui/core';
import { connect } from "react-redux";
import { processUserMove, resetGame, getCurrentGameState, startNextGame } from "../actions/game";

import Symbol from "./Symbol";

function Board({
    reducer: { currentBoard, player, log, didGameEnd },
    processUserMove,
    resetGame,
    getCurrentGameState,
    startNextGame
}) {
    useEffect(() => {
        getCurrentGameState();
    }, [getCurrentGameState]);

    const symbolClickHandler = (rowIndex: number, symbolIndex: number): void => {
        if (didGameEnd) return;

        if (currentBoard[rowIndex][symbolIndex] !== 'X' && currentBoard[rowIndex][symbolIndex] !== 'O') {
            processUserMove(rowIndex, symbolIndex, player);
        }
    };

    return (
        <Fragment>
            <div className="board">
                {currentBoard.map((row, rowIndex) =>
                    row.map((symbol, symbolIndex) => (
                        <Symbol
                            value={symbol}
                            key={(rowIndex + 1) * 3 + symbolIndex}
                            handleClick={() =>
                                symbolClickHandler(rowIndex, symbolIndex)
                            }
                        />
                    ))
                )}
            </div>
            <Button variant="contained" color="primary" onClick={() => resetGame()}>
                Reset game
            </Button>
            <Button variant="contained" color="primary" onClick={() => startNextGame()}>
                Start next game
            </Button>
            <div className="logdesk">
                {log.map((logRecord) => (
                    <div>
                        {logRecord}
                    </div>
                ))}
            </div>
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        reducer: state.gameReducer
    };
};

export default connect(mapStateToProps, { processUserMove, resetGame, getCurrentGameState, startNextGame })(Board);
