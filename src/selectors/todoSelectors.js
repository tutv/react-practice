import {createSelector} from "reselect";
import * as todo from '../reducers/todo';

const getTodos = (state) => state.get(todo.namespace);
const getItemId = (state, props) => props.id;

export const getTodoItem = createSelector([getTodos, getItemId], (state, id) => {
    const byIds = state.get('byIds');

    return byIds.get(id);
});

export const getListTodo = createSelector(getTodos, (state) => {
    return state;
});