import jwtDecode from 'jwt-decode';

import httpService from "./httpService";

const userURL = "/api/auth/";

const authToken = "authToken";
const typeToken = "typeToken";

export async function authenticate(credentials) {
    const { data: { employee, employeeType } } = await httpService.post(userURL, credentials);

    localStorage.setItem(authToken, employee);
    localStorage.setItem(typeToken, employeeType);
}

export function getCurrentEmployee() {
    try {
        const jwt = localStorage.getItem(authToken);
        return jwtDecode(jwt);
    } catch (error) { }
}

export function getCurrentEmployeeType() {
    try {
        const jwt = localStorage.getItem(typeToken);
        return jwtDecode(jwt);
    } catch (error) { }
}

export function logout() {
    localStorage.removeItem(authToken);
    localStorage.removeItem(typeToken);
}

httpService.setJWT(getAuthJwt());
function getAuthJwt() {
    return localStorage.getItem(authToken);
}

export default {
    authenticate,
    getCurrentEmployee,
    getCurrentEmployeeType,
    logout,
}