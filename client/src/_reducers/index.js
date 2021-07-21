import { combineReducers } from 'redux';
import user from './user_reducer';
import email from './email_reducer';
import list from './list_reducer';

const rootReducer = combineReducers({
    user,
    email,
    list
})

export default rootReducer;