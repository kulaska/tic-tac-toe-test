import { SET_HISTORY } from "../actions/actionTypes";

const initialState = {
    ai: 0,
    player: 0,
    X: 0,
    O: 0,
    list: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_HISTORY:
            return payload
        default:
            return state
    }
}
