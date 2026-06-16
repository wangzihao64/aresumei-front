import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './actionTypes';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null };
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};
