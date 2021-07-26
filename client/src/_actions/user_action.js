import Axios from 'axios';
import {
    LOGIN_USER,
    SIGNUP_COMPANY,
    ID_CHECK,
    CNU_CHECK,
    CNU_FIND,
    EMAIL_SEND,
    SIGNIN_USER
} from './types';

export function loginUser(dataToSubmit) {
    const request = Axios.post('/users',dataToSubmit)
    .then(response =>  response.data);
    
    return {
        type : SIGNIN_USER,
        payload: request
    }
} 

export function signinUser(dataTosubmit) {
    const request = Axios.post('/auth/signin',dataTosubmit)
    .then(response =>  response.data);
    
    return {
        type : SIGNIN_USER,
        payload: request
    }
}

export function signupCompany(dataToSubmit, urlQuery) {
    const request = Axios.post('/auth/signup?kind='+urlQuery,dataToSubmit)
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
        type : CNU_CHECK,
        payload: request
    }
}

export function cnuFind(dataToSubmit) {
    const request = Axios.post('/auth/cnufind', dataToSubmit)
    .then(response => response.data);
    return {
        type : CNU_FIND,
        payload: request
    }
}