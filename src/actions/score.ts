import Redux from "redux";
import axios from "../helpers/axios";
import {
    SET_HISTORY
} from "./actionTypes";
import { AxiosResponse } from "axios"

export function setHistory(data) {
    return {
        type: SET_HISTORY,
        payload: data
    }
}

export async function getScore() {
    const response: AxiosResponse = await axios.get('/api/score');

    const { data } = response;

    return data;
}

export function getHistoryAndScore() {
    return async function (dispatch: Redux.Dispatch) {
        try {
            const data = await getScore();
            dispatch(setHistory(data.result));
        } catch (err) {
            console.log(err);
        }
    }
}