import {combineReducers} from "redux";
import portfolio, * as fromPortfolio from "./portfolio";
import todo, * as fromTodo from "./todo";

const app = combineReducers({
    portfolio,
    todo
});

export default app;

export const funds = (state) => fromPortfolio.funds(state.portfolio);
export const getListTodo = (state) => fromTodo.listTodo(state.todo);
export const getTodoItem = (state, id) => fromTodo.getTodoItem(state.todo, id);