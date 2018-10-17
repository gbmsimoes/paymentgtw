import { combineReducers } from 'redux';
import HomeReducer from './HomeReducer';
import PaymentReducer from './PaymentReducer';
import PhoneContactsReducer from './PhoneContactsReducer';
import TransactionReducer from './TransactionReducer';
import PushNotificationReducer from './PushNotificationReducer';

export default combineReducers({
    home: HomeReducer,
    payment: PaymentReducer,
    phoneContacts: PhoneContactsReducer,
    transaction: TransactionReducer,
    pushNotification: PushNotificationReducer
});