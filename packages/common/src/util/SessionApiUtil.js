// import axios from 'axios';
// axios.defaults.baseURL = "http://localhost";
//
// axios.defaults.proxy = {
//     host: "http://localhost",
//     port: 5000
// };
// console.log(axios);
// axios.defaults.proxy.port = 5000;
import jwt_decode from 'jwt-decode';
import Storage from "./Storage";
export const setAuthToken = token => {
    // if (token) {
    //     axios.defaults.headers.common['Authorization'] = token;
    // } else {
    //     delete axios.defaults.headers.common['Authorization'];
    // }
};

export const signupRequest = (userData) => {
    return fetch('http://192.168.86.161:5000/api/users/register', {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

export const loginRequest = (userData) => {

    return fetch('http://192.168.86.161:5000/api/users/login', {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

export const login = async (sessionResponse) => {
    if (!sessionResponse.success) return 'login unsuccessful';
    else {
        const { token } = sessionResponse;
        await Storage.set('jwtToken', token);
        return jwt_decode(token);
    }

};

export const logout = async () => {
    await Storage.remove('jwtToken');
    return null;
};

export const getJwtToken = async () => {
    const jwtToken = await Storage.get('jwtToken');
    if (!jwtToken) {
        console.log('jwt token not found');
        return null;
    }
    return jwtToken;
};