import {createSelector} from "reselect";

import * as todo from "../reducers/todo";

const getItemId = (state, props) => props.id;

export const getTodoItem = createSelector([todo.getState, getItemId], (state, id) => {
    const byIds = state.get('byIds');

    return byIds.get(id);
});

export const getListTodo = createSelector(todo.getState, (state) => {
    return state.get('allIds');
});