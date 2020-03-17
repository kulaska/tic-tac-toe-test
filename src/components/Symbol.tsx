import React from "react";

export default function Symbol(props) {
    return (
        <div onClick={props.handleClick} className="symbol">
            {props.value === 'X' || props.value === 'O' ? props.value : ''}
        </div>
    );
}
