import {createReducer} from "redux-create-reducer";

import {ADD_TODO, COMPLETE_TODO, INCOMPLETE_TODO, UPDATE_LIST_TODOS} from "../actions/types";

const initState = {
    byIds: {},
    ids: []
};

export const namespace = 'todo';

export const reducer = createReducer(initState, {
    [UPDATE_LIST_TODOS](state, action) {
        const {data} = action;

        let byIds = {};
        let ids = [];
        for (let key in data) {
            ids.push(key);

            byIds[key] = {...data[key], id: key};
        }

        return {...state, byIds, ids};
    },

    [ADD_TODO](state, action) {
        const {data} = action;
        const {id} = data;
        const {byIds, ids} = state;
        byIds[id] = {...data};
        ids.push(id);

        return {...state, byIds, ids};
    },

    [COMPLETE_TODO](state, action) {
        const {id} = action;

        const {byIds, ids} = state;
        const todo = {...byIds[id]};
        todo['complete'] = true;
        byIds[id] = todo;

        return {...state, byIds, ids};
    },

    [INCOMPLETE_TODO](state, action) {
        const {id} = action;

        const {byIds, ids} = state;
        const todo = {...byIds[id]};
        todo['complete'] = false;
        byIds[id] = todo;

        return {...state, byIds, ids};
    }
});