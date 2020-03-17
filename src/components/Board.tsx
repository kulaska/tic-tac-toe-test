import React, { useEffect } from "react";
import { connect } from "react-redux";
import { processUserMove, resetGame, getCurrentGameState, startNextGame } from "../actions/game";

import Symbol from "./Symbol";

function Board({
    reducer: { currentBoard, player, log },
    processUserMove,
    resetGame,
    getCurrentGameState,
    startNextGame
}) {
    useEffect(() => {
        getCurrentGameState();
    }, [getCurrentGameState]);

    const symbolClickHandler = (rowIndex: number, symbolIndex: number): void => {
        if (currentBoard[rowIndex][symbolIndex] !== 'X' && currentBoard[rowIndex][symbolIndex] !== 'O') {
            processUserMove(rowIndex, symbolIndex, player);
        }
    };

    return (
        <div>
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
            <div className="resetButton">
                <button onClick={() => resetGame()}>Reset game</button>
            </div>
            <div className="startNextButton">
                <button onClick={() => startNextGame()}>Start next game</button>
            </div>
            <div className="logdesk">
                {log.map((logRecord) => (
                    <div>
                        {logRecord}
                    </div>
                ))}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        reducer: state.gameReducer
    };
};

export default connect(mapStateToProps, { processUserMove, resetGame, getCurrentGameState, startNextGame })(Board);
