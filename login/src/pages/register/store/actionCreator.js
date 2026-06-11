import axios from '../../../utils/request';

const generateKey = length => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < length; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
}

export const registerAc = (data) =>{
    const payload = {
        user_name: data.username,
        password: data.password,
        key: generateKey(16)
    };

    return dispatch =>{
        return axios.post('/api/v1/user/register', payload);
    }
}