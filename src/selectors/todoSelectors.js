import {createSelector} from "reselect";
import * as todo from '../reducers/todo';

const getTodos = (state) => state[todo.namespace];
const getItemId = (state, props) => props.id;

export const getTodoItem = createSelector([getTodos, getItemId], (state, id) => {
    const {byIds} = state;

    return byIds[id];
});

export const getListTodo = createSelector(getTodos, (state) => {
    return state.ids;
});