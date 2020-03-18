import React, { useEffect, Fragment } from "react";
import {
    Button,
    Grid,
    Paper,
    useTheme,
    useMediaQuery
} from "@material-ui/core";
import { connect } from "react-redux";
import {
    processUserMove,
    resetGame,
    getCurrentGameState,
    startNextGame
} from "../actions/game";

import Symbol from "./Symbol";
import useStyles from "./Board.styles";

function Board({
    reducer: { currentBoard, log, didGameEnd },
    processUserMove,
    resetGame,
    getCurrentGameState,
    startNextGame
}) {
    useEffect(() => {
        getCurrentGameState();
    }, [getCurrentGameState]);

    const theme = useTheme();

    const classes = useStyles(theme)();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const symbolClickHandler = (
        rowIndex: number,
        symbolIndex: number
    ): void => {
        if (didGameEnd) return;

        if (
            currentBoard[rowIndex][symbolIndex] !== "X" &&
            currentBoard[rowIndex][symbolIndex] !== "O"
        ) {
            processUserMove(rowIndex, symbolIndex);
        }
    };

    return (
        <Fragment>
            <Grid className={classes.gridContainer} container spacing={0}>
                {currentBoard.map((row, rowIndex) =>
                    row.map((symbol, symbolIndex) => (
                        <Grid item xs={4}>
                            <Symbol
                                value={symbol}
                                key={(rowIndex + 1) * 3 + symbolIndex}
                                handleClick={() =>
                                    symbolClickHandler(rowIndex, symbolIndex)
                                }
                            />
                        </Grid>
                    ))
                )}
            </Grid>
            <Grid
                className={classes.gridContainer}
                container
                spacing={0}
                justify={isSmallScreen ? "center" : "space-between"}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => resetGame()}
                    disabled={didGameEnd}
                >
                    Reset game
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => startNextGame()}
                    disabled={!didGameEnd}
                >
                    Start next game
                </Button>
            </Grid>
            <div>
                {log.map(logRecord => (
                    <Paper className={classes.paper}>{logRecord}</Paper>
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

export default connect(mapStateToProps, {
    processUserMove,
    resetGame,
    getCurrentGameState,
    startNextGame
})(Board);
