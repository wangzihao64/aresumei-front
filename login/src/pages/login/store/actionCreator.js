import axios, { setToken } from '../../../utils/request';
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
                const token = response.data?.token || response.data?.data?.token || response.data?.data?.accessToken;
                if (token) {
                    console.log('登录成功，后端返回 token：', token);
                    setToken(token);
                } else {
                    console.warn('登录成功，但未从后端响应中解析到 token：', response.data);
                }
                dispatch({ type: LOGIN_SUCCESS, payload: response.data });
                return response;
            })
            .catch(error => {
                dispatch({ type: LOGIN_FAILURE, error });
                throw error;
            });
    }
}
