import {
    LOGIN_USER,
    SIGNUP_COMPANY,
    ID_CHECK,
    CNU_CHECK
} from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER :
            return { ...state, data : action.payload }
            break;
        case SIGNUP_COMPANY :
            return { ...state, data : action.payload }
            break;
        case ID_CHECK :
            return { ...state, data : action.payload }
            break;
        case CNU_CHECK :
            return { ...state, data : action.payload }
            break;
        default :
            return state;
    }
}