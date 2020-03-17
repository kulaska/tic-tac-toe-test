import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getHistoryAndScore } from '../actions/score';

function Score({
    getHistoryAndScore,
    score
}) {

    useEffect(() => {
        getHistoryAndScore();
    }, [getHistoryAndScore])

    return (
        <div>
            <div>AI won: {score.ai} times</div>
            <div>The player won: {score.player} times</div>

            <div>Team 'X' won: {score.X} times</div>
            <div>Team 'O' won: {score.O} times</div>

            <div>Game history: {score.list.map((item, i) => (<div>Game {i}: {item.ts}</div>))}</div>
        </div>
    )
}

const mapStateToProps = state => ({
    score: state.scoreReducer
})

export default connect(mapStateToProps, { getHistoryAndScore })(Score)