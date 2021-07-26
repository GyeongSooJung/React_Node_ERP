import {
    LIST_ARRAY,
    DELETE_DATA,
    CREATE_DATA
} from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LIST_ARRAY :
            return { ...state, data : action.payload }
            break;
        case DELETE_DATA :
            return { ...state, data : action.payload }
            break;
        case CREATE_DATA :
            return { ...state, data : action.payload }
            break;
        default :
            return state;
    }
}