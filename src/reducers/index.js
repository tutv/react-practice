import {combineReducers} from "redux-immutable";

import * as todo from "./todo";

const app = combineReducers({
    [todo.namespace]: todo.reducer
});

export default app;