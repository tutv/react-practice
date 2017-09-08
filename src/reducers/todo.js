import {createReducer} from "redux-create-reducer";
import {fromJS, List} from "immutable";

import {ADD_TODO, COMPLETE_TODO, INCOMPLETE_TODO, REMOVE_TODO, UPDATE_LIST_TODOS} from "../constants/types";

const initState = List();

export const namespace = 'todo';

export const reducer = createReducer(initState, {
    [UPDATE_LIST_TODOS](state, action) {
        const {data} = action;

        let list = [];
        for (let id in data) {
            let todo = {...data[id], id};

            list.push(fromJS(todo));
        }

        return List(list);
    },

    [ADD_TODO](state, action) {
        const {todo} = action;

        return state.push(fromJS(todo));
    },

    [COMPLETE_TODO](state, action) {
        const {todo} = action;

        return state.update(state.findIndex((_todo) => {
            return _todo === todo;
        }), (todo) => {
            return todo.set('complete', true);
        });
    },

    [INCOMPLETE_TODO](state, action) {
        const {todo} = action;

        return state.update(state.findIndex((_todo) => {
            return _todo === todo;
        }), (todo) => {
            return todo.set('complete', false);
        });
    },

    [REMOVE_TODO](state, action) {
        const {todo} = action;

        return state.delete(state.findIndex(_todo => _todo === todo));
    }
});