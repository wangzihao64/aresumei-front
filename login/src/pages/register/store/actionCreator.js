import axios from '../../../utils/request';

const generateKey = length => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < length; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
}

export const registerAc = (data) => {
    const payload = {
        user_name: data.username,
        password: data.password,
        email: data.email,
        code: data.verificationCode,
        key: generateKey(16)
    };

    return dispatch => {
        return axios.post('/api/v1/user/register', payload);
    }
}

export const sendVerificationCodeAc = (email) => {
    const form = new URLSearchParams();
    form.append('email', email);

    return dispatch => {
        return axios.post('/api/v1/user/vaild-email', form, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
}