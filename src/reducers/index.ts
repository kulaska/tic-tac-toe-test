import { combineReducers } from "redux";
import gameReducer from "./game";
import scoreReducer from "./score";

export default combineReducers({ gameReducer, scoreReducer });
