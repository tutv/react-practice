import db from "../services/api";

import {
    ADD_TODO, ADD_TODO_FAILURE, ADD_TODO_SUCCESS, COMPLETE_TODO, EDIT_TITLE_TODO, INCOMPLETE_TODO, REMOVE_TODO,
    REMOVE_TODO_FAILURE,
    REMOVE_TODO_SUCCESS,
    REQUEST_ADD_TODO,
    REQUEST_REMOVE_TODO, SAVE_TODO,
    UPDATE_LIST_TODOS
} from "../constants/actionTypes";

export const fetchListTodo = () => {
    return (dispatch) => {
        db.ref('todos').once('value', function (snapshot) {
            const todos = snapshot.val();

            dispatch({
                type: UPDATE_LIST_TODOS,
                data: todos
            });
        });
    }
};

export const addTodo = (title) => {
    return (dispatch) => {
        dispatch({
            type: REQUEST_ADD_TODO
        });

        let todo = {
            title,
            complete: false
        };

        let id = db.ref().child('todos').push().key;

        db.ref()
            .update({
                ['todos/' + id]: todo
            })
            .then(() => {
                dispatch({
                    type: ADD_TODO,
                    todo: {
                        ...todo,
                        id
                    }
                });

                dispatch({
                    type: ADD_TODO_SUCCESS
                });
            })
            .catch(() => {
                dispatch({
                    type: ADD_TODO_FAILURE
                });
            });
    }
};

export const toggleTodo = (todo) => {
    return (dispatch) => {
        const {id, complete} = todo.toJS();

        db.ref('todos/' + id).update({complete: !complete})
            .then(function () {
                if (complete) {
                    dispatch({
                        type: INCOMPLETE_TODO,
                        id
                    });
                } else {
                    dispatch({
                        type: COMPLETE_TODO,
                        id
                    });
                }
            });
    };
};

export const removeTodo = (todo) => {
    return (dispatch) => {
        const {id} = todo.toJS();

        dispatch({
            type: REQUEST_REMOVE_TODO
        });

        db.ref('todos/' + id).remove()
            .then(() => {
                dispatch({
                    type: REMOVE_TODO_SUCCESS
                });

                dispatch({
                    type: REMOVE_TODO,
                    id
                });
            })
            .catch(() => {
                dispatch({
                    type: REMOVE_TODO_FAILURE,
                    id
                });
            });
    }
};

export const editTitle = (todo, title) => {
    return (dispatch) => {
        const {id} = todo.toJS();

        dispatch({
            type: EDIT_TITLE_TODO,
            id,
            title
        });
    }
};

export const saveTodo = (todo) => {
    return (dispatch) => {
        const todoObject = todo.toJS();
        const {id} = todoObject;

        db.ref()
            .update({
                ['todos/' + id]: todoObject
            })
            .then(() => {
                dispatch({
                    type: SAVE_TODO,
                    id
                });
            });
    };
};