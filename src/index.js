import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import allReducers from "./reducers";

let middlewareWrapper = applyMiddleware(thunk);
if (process.env.NODE_ENV !== 'production') {
    middlewareWrapper = composeWithDevTools(middlewareWrapper);
}

const store = createStore(allReducers, middlewareWrapper);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, document.getElementById("root")
);
registerServiceWorker();
