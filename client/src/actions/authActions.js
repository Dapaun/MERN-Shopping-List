import axios from "axios";
import {returnErrors} from './errorActions';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from "./types";

// CHeck token and load user

export const login = ({email, password}) => (dispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password});
    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL,
            })
        })  
};

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS,
    })
};

export const register = ({name, email, password}) => (dispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password});
    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL,
            })
        })
}

export const loadUser = () => (dispatch, getState) => {
    //User loading
    dispatch({ type: USER_LOADING});
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
};

// Setup config/headers

export const tokenConfig = getState => {
        // get token
        const token = getState().auth.token;
        const config = {
            headers: {
                "Content-type": "application",
            }
        }
        console.log('In here ', token);

        if(token) {
            console.log('Foes this')
            config.headers['x-auth.token'] = token;
        }
        return config;
}