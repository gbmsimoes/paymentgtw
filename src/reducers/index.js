import { combineReducers } from 'redux';
import HomeReducer from './HomeReducer';
import PhoneContactsReducer from './PhoneContactsReducer';

export default combineReducers({
    home: HomeReducer,
    phoneContacts: PhoneContactsReducer
});