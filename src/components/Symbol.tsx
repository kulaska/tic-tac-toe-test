import React from "react";
import { useTheme, useMediaQuery } from "@material-ui/core";

import useStyles from "./Board.styles";

export default function Symbol(props) {
    const theme = useTheme();
    const classes = useStyles(theme)();

    return (
        <div onClick={props.handleClick} className={classes.symbolContainer}>
            <span className={classes.symbol}>
                {props.value === "X" || props.value === "O" ? props.value : ""}
            </span>
        </div>
    );
}
