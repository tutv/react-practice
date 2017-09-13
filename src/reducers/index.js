import {combineReducers} from "redux-immutable";

import todo from "./todo";
import auth from "./auth";

const app = combineReducers({
    auth,
    todo,
});

export default app;