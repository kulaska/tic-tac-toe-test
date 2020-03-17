import React, { useRef, useState } from "react";
import { Provider } from "react-redux";
import { Button, Container } from '@material-ui/core';
import Board from "./components/Board";
import Score from "./components/Score";
import store from "./store";
import useStyles from "./App.styles";

function App() {
    const [isBoardActive, setIsBoardActive] = useState(true);

    const classes = useStyles();

    const switchToBoard = () => {
        if (isBoardActive) return;
        setIsBoardActive(true);
    }

    const switchToScore = () => {
        if (!isBoardActive) return;
        setIsBoardActive(false)
    }

    return (
        <Provider store={store}>
            <div className={classes.root}>
                <Container maxWidth="sm">
                    <header>
                        <nav className={classes.nav}>
                            <div className={classes.navElement}><Button fullWidth={true} onClick={switchToBoard}>Board</Button></div>
                            <div className={classes.navElement}><Button fullWidth={true} onClick={switchToScore}>Score</Button></div>
                        </nav>
                    </header>
                    {isBoardActive && (
                        <div>
                            <Board />
                        </div>
                    )}
                    {!isBoardActive && (
                        <div>
                            <Score />
                        </div>
                    )}
                </Container>
            </div>
        </Provider>
    );
}

export default App;
