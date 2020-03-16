import React, { useEffect } from "react";
import { processUserMove } from '../actions/game';
import { connect } from 'react-redux';

import Symbol from "./Symbol";

function Board({ reducer: { currentBoard }, processUserMove }) {
    useEffect(() => {
        setTimeout(() => processUserMove(8, 'X'), 2000);
    }, [processUserMove])

    return (
        <div className="board">
            {currentBoard.map((row, rowIndex) =>
                row.map((symbol, symbolIndex) => (
                    <Symbol
                        value={symbol}
                        key={(rowIndex + 1) * 3 + symbolIndex}
                    />
                ))
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        //currentBoard: state.gameReducer.currentBoard,
        reducer: state.gameReducer
    }
};

export default connect(mapStateToProps, { processUserMove })(Board);
