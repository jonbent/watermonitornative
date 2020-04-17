export function setAuthToken(token: any): void;
export function signupRequest(userData: any): Promise<Response>;
export function loginRequest(userData: any): Promise<Response>;
export function login(sessionResponse: any): Promise<any>;
export function logout(): Promise<null>;
export function getJwtToken(): Promise<any>;
