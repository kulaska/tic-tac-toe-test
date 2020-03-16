import React, { useEffect } from "react";
import { processUserMove, resetGame } from "../actions/game";
import { connect } from "react-redux";

import Symbol from "./Symbol";

function Board({
    reducer: { currentBoard, player },
    processUserMove,
    resetGame
}) {
    const getElementIndex = (rowIndex: number, columnIndex: number): number => {
        return 3 * rowIndex + columnIndex + 1;
    };

    const symbolClickHandler = (rowIndex, symbolIndex) => {
        processUserMove(getElementIndex(rowIndex, symbolIndex), player);
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
        </div>
    );
}

const mapStateToProps = state => {
    return {
        reducer: state.gameReducer
    };
};

export default connect(mapStateToProps, { processUserMove, resetGame })(Board);
