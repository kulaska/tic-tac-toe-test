import React from "react";

import useStyles from "./Board.styles";


export default function Symbol(props) {
    const classes = useStyles();

    return (
        <div onClick={props.handleClick} className={classes.symbolContainer}>
            <span className={classes.symbol}>{props.value === 'X' || props.value === 'O' ? props.value : ''}</span>
        </div>
    );
}
