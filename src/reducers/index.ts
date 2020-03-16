import { combineReducers } from "redux";
import gameReducer from "./game";

// Combining reducers is not really needed right now, but could be of use in the future
export default combineReducers({ gameReducer });
