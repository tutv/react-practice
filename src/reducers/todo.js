import {createReducer} from "redux-create-reducer";
import {combineReducers} from "redux-immutable";
import {fromJS, List, Map} from "immutable";

import {
    ADD_TODO, COMPLETE_TODO, EDIT_TITLE_TODO, INCOMPLETE_TODO, REMOVE_TODO,
    UPDATE_LIST_TODOS
} from "../constants/actionTypes";

const byIds = createReducer(Map(), {
    [UPDATE_LIST_TODOS](state, action) {
        const {data} = action;

        for (let id in data) {
            let todo = {...data[id], id};

            state = state.set(id, fromJS(todo));
        }

        return state;
    },

    [ADD_TODO](state, action) {
        const {todo} = action;

        return state.set(todo.id, fromJS(todo));
    },

    [COMPLETE_TODO](state, action) {
        const {id} = action;

        return state.setIn([id, 'complete'], true);
    },

    [INCOMPLETE_TODO](state, action) {
        const {id} = action;

        return state.setIn([id, 'complete'], false);
    },

    [REMOVE_TODO](state, action) {
        const {id} = action;

        return state.delete(id);
    },
    [EDIT_TITLE_TODO](state, action) {
        const {id, title} = action;

        return state.setIn([id, 'title'], title);
    }
});

const allIds = createReducer(List(), {
    [UPDATE_LIST_TODOS](state, action) {
        const {data} = action;

        for (let id in data) {
            state = state.push(id);
        }

        return state;
    },

    [REMOVE_TODO](state, action) {
        const {id} = action;

        return state.filter((_id) => {
            return id !== _id;
        });
    },

    [ADD_TODO](state, action) {
        const {todo} = action;

        return state.push(todo.id);
    },
});

export default combineReducers({
    byIds,
    allIds
});

export const getState = (state) => state.get('todo');
