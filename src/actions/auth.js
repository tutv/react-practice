import AuthService from "../services/Auth";
import StorageService from "../services/Storage";

import {
    AUTH_CHECK_STARTUP,
    AUTH_GET_PROFILE, AUTH_GET_PROFILE_FAILURE, AUTH_GET_PROFILE_SUCCESS,
    AUTH_LOGIN,
    AUTH_VERIFY_CALLBACK, AUTH_VERIFY_CALLBACK_FAILURE,
    AUTH_VERIFY_CALLBACK_SUCCESS, AUTH_VERIFY_SET_DATA
} from "../constants/actionTypes";

export const startupCheck = () => {
    return (dispatch) => {
        dispatch({
            type: AUTH_CHECK_STARTUP
        });

        const data = StorageService.get('auth');
        if (data && data.access_token) {
            dispatch({
                type: AUTH_VERIFY_SET_DATA,
                data
            });
        }
    }
};

export const authVerifyCallback = () => {
    return (dispatch) => {
        dispatch({
            type: AUTH_VERIFY_CALLBACK
        });

        AuthService.handleAuthentication()
            .then(
                (result) => {
                    dispatch({
                        type: AUTH_VERIFY_CALLBACK_SUCCESS,
                        result
                    });

                    dispatch({
                        type: AUTH_VERIFY_SET_DATA,
                        data: result
                    });
                }
            )
            .catch((error) => {
                dispatch({
                    type: AUTH_VERIFY_CALLBACK_FAILURE,
                    error
                });
            });
    }
};

// eslint-disable-next-line
const getProfile = () => {
    return (dispatch) => {
        dispatch({
            type: AUTH_GET_PROFILE,
        });

        AuthService.getProfile()
            .then(profile => {
                dispatch({
                    type: AUTH_GET_PROFILE_SUCCESS,
                    profile
                });
            })
            .catch(error => {
                dispatch({
                    type: AUTH_GET_PROFILE_FAILURE,
                    error
                });
            });
    }
};

export const login = () => {
    return (dispatch) => {
        dispatch({
            type: AUTH_LOGIN
        });

        AuthService.login();
    }
};