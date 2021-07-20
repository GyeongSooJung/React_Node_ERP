import Axios from 'axios';
import {
    LOGIN_USER,
    SIGNUP_COMPANY,
    ID_CHECK,
    CNU_CHECK,
    EMAIL_SEND,
    EMAIL_CERT
} from './types';

export function emailSend(dataToSubmit) {
    const request = Axios.post('/email/send',dataToSubmit)
    .then(response =>  response.data);
    return {
        type : EMAIL_SEND,
        payload: request
    }
}

export function emailCert(dataToSubmit) {
    const request = Axios.post('/email/cert',dataToSubmit)
    .then(response =>  response.data);
    return {
        type : EMAIL_CERT,
        payload: request
    }
}