import Axios from 'axios';
import {
    LIST_ARRAY,
} from './types';

export function listArray(dataToSubmit) {
    const request = Axios.post('/list',dataToSubmit)
    .then(response =>  response.data);
    
    return {
        type : LIST_ARRAY,
        payload: request
    }
} 
