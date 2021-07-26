import Axios from 'axios';
import {
    LIST_ARRAY,
    DELETE_DATA,
    CREATE_DATA
} from './types';

export function listArray(dataToSubmit) {
    const request = Axios.post('/list',dataToSubmit)
    .then(response =>  response.data);
    
    return {
        type : LIST_ARRAY,
        payload: request
    }
} 

export function deleteData(dataToSubmit) {
    const request = Axios.post('/list/delete',dataToSubmit)
    .then(response =>  response.data);
    
    return {
        type : DELETE_DATA,
        payload: request
    }
}

export function createData(dataToSubmit) {
    const request = Axios.post('/list/create',dataToSubmit)
    .then(response =>  response.data);
    
    return {
        type : CREATE_DATA,
        payload: request
    }
    
}