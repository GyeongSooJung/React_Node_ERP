import {
    LIST_ARRAY
} from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LIST_ARRAY :
            return { ...state, data : action.payload }
            break;
        default :
            return state;
    }
}