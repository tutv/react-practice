import db from "../services/api";

import {
    ADD_TODO, ADD_TODO_FAILURE, ADD_TODO_SUCCESS, COMPLETE_TODO, INCOMPLETE_TODO, REQUEST_ADD_TODO,
    UPDATE_LIST_TODOS
} from "./types";

export const fetchListTodo = () => {
    return (dispatch) => {
        db.ref('todos').once('value', function (snapshot) {
            const todos = snapshot.val();

            dispatch({
                type: UPDATE_LIST_TODOS,
                data: todos
            })
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
                    data: {
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
        const {id, complete} = todo;

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