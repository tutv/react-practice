import {combineReducers} from "redux-immutable";

import todo from "./todo";

const app = combineReducers({
    todo
});

export default app;