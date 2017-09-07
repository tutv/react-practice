import {ADD_TODO, COMPLETE_TODO, INCOMPLETE_TODO, UPDATE_LIST_TODOS} from "../actions/types";

const initState = {
    byIds: {},
    ids: []
};

const todo = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_LIST_TODOS: {
            const {data} = action;

            let byIds = {};
            let ids = [];
            for (let key in data) {
                ids.push(key);

                byIds[key] = {...data[key], id: key};
            }

            return {...state, byIds, ids};
        }

        case ADD_TODO: {
            const {data} = action;
            const {id} = data;
            const {byIds, ids} = state;
            byIds[id] = {...data};
            ids.push(id);

            return {...state, byIds, ids};
        }

        case COMPLETE_TODO: {
            const {id} = action;

            const {byIds, ids} = state;
            const todo = {...byIds[id]};
            todo['complete'] = true;
            byIds[id] = todo;

            return {...state, byIds, ids};
        }

        case INCOMPLETE_TODO: {
            const {id} = action;

            const {byIds, ids} = state;
            const todo = {...byIds[id]};
            todo['complete'] = false;
            byIds[id] = todo;

            return {...state, byIds, ids};
        }

        default:
            return state;
    }
};

export default todo;

export const listTodo = (state) => {
    return state.ids;
};

export const getTodoItem = (state, id) => {
    const {byIds} = state;

    return byIds[id];
};