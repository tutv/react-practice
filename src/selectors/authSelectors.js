import {createSelector} from "reselect";

import * as auth from "../reducers/auth";

export const getProfile = createSelector([auth.getState], (state) => {
    return state.get('profile');
});

export const isAuthenticated = createSelector([auth.getState], (state) => {
    const expiresAt = state.get('expiresAt');

    if (!expiresAt) {
        return false;
    }

    return new Date().getTime() < expiresAt;
});