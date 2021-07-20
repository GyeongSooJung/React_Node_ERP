import {
    LOGIN_USER,
    SIGNUP_COMPANY,
    ID_CHECK,
    CNU_CHECK,
    EMAIL_SEND,
    EMAIL_CERT
} from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case EMAIL_SEND :
            return { ...state, data : action.payload }
            break;
        case EMAIL_CERT :
            return { ...state, data : action.payload }
            break;
        default :
            return state;
    }
}