import axios from '../../../utils/request';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './actionTypes';

export const loginAc = (data) => {
    const payload = {
        user_name: data.username,
        password: data.password,
    };

    return dispatch => {
        dispatch({ type: LOGIN_REQUEST });
        return axios.post('/api/v1/user/login', payload)
            .then(response => {
                dispatch({ type: LOGIN_SUCCESS, payload: response.data });
                return response;
            })
            .catch(error => {
                dispatch({ type: LOGIN_FAILURE, error });
                throw error;
            });
    }
}
