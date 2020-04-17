import {getJwtToken} from "./SessionApiUtil";

export const addBottle = async () => {
    const jwtToken = await getJwtToken();
    if (!jwtToken) return null;
    return fetch('http://192.168.86.161:5000/api/users/addBottle', {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: jwtToken
        }
    });
};

export const fetchUserFills = async () => {
    const jwtToken = await getJwtToken();
    if (!jwtToken) return null;
    return fetch('http://192.168.86.161:5000/api/users/fills', {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: jwtToken
        }
    });
}