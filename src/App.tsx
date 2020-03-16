import React from "react";
import { Provider } from "react-redux";
import Board from "./components/Board";
import store from "./store";
import "./App.css";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Board />
            </div>
            ;
        </Provider>
    );
}

export default App;
