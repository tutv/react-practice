import {createReducer} from "redux-create-reducer";
import {Map, fromJS} from "immutable";

import {
    AUTH_GET_PROFILE_SUCCESS, AUTH_LOGOUT, AUTH_VERIFY_CALLBACK, AUTH_VERIFY_CALLBACK_FAILURE,
    AUTH_VERIFY_SET_DATA
} from "../constants/actionTypes";

export default createReducer(Map(), {
    [AUTH_VERIFY_CALLBACK](state, action) {
        return Map();
    },

    [AUTH_VERIFY_SET_DATA](state, action) {
        const {data} = action;

        return fromJS(data);
    },

    [AUTH_VERIFY_CALLBACK_FAILURE](state, action) {
        return Map();
    },

    [AUTH_GET_PROFILE_SUCCESS](state, action) {
        const {profile} = action;

        return state.set('profile', profile);
    },
    [AUTH_LOGOUT](state, action) {
        return Map();
    }
});

export const getState = (state) => state.get('auth');