import Axios from 'axios';
import {
    LOGIN_USER,
    SIGNUP_COMPANY,
    ID_CHECK,
    CNU_CHECK,
    EMAIL_SEND
} from './types';

export function loginUser(dataToSubmit) {
    const request = Axios.post('/users',dataToSubmit)
    .then(response =>  response.data);
    
    return {
        type : LOGIN_USER,
        payload: request
    }
} 

export function signupCompany(dataToSubmit) {
    const request = Axios.post('/auth/signup',dataToSubmit)
    .then(response =>  response.data);
    return {
        type : SIGNUP_COMPANY,
        payload: request
    }
} 

export function idDupleCheck(dataToSubmit) {
    const request = Axios.post('/auth/idcheck',dataToSubmit)
    .then(response =>  response.data);
    return {
        type : ID_CHECK,
        payload: request
    }
}


export function cnuCheck(dataToSubmit) {
    const request = Axios.post('/auth/cnucheck',dataToSubmit)
    .then(response =>  response.data);
    return {
        type : ID_CHECK,
        payload: request
    }
}