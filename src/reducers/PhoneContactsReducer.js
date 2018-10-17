import {
    MY_CONTACTS_FETCH_FAIL,
    MY_CONTACTS_FETCH_SUCCESS,
    MY_CONTACTS_FETCHING, PHONE_NUMBER_RESET,
    PHONE_NUMBER_SELECTED
} from "../globals/types";

const INITIAL_STATE = {
    loading: false,
    contactsList: {},
    error: '',
    phoneNumber: ''

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MY_CONTACTS_FETCH_SUCCESS:
            return { ...state, error: '', contactsList: action.payload, loading: false };
        case MY_CONTACTS_FETCH_FAIL:
            return { ...state, error: action.payload, contactsList: {}, loading: false };
        case MY_CONTACTS_FETCHING:
            return { ...state, error: '', contactsList: {}, loading: true };
        case PHONE_NUMBER_SELECTED:
            return { ...state, error: '', contactsList: {}, loading: false, phoneNumber: action.payload };
        case PHONE_NUMBER_RESET:
            return { ...state, error: '', contactsList: {}, loading: false, phoneNumber: '' };
        default:
            return state;
    }
}