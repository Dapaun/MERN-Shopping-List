import { GET_ERRORS, CLEAR_ERRORS } from "./types";

// Return ERRORS
export const returnErrors = (msg, status, id=null) => {
    return {
        type: GET_ERRORS,
        payload: {msg, status, id}
    };
};

// CLear errors
export const clearErros = () => {
    return {
        type: CLEAR_ERRORS
    };
};
