import {MY_CONTACTS_FETCH_FAIL, MY_CONTACTS_FETCH_SUCCESS, MY_CONTACTS_FETCHING} from "../globals/types";

const INITIAL_STATE = {
    loading: false,
    contactsList: {},
    error: ''

};

export default (state = INITIAL_STATE, action) => {

    console.log(action);

    switch (action.type) {
        case MY_CONTACTS_FETCH_SUCCESS:
            return { ...state, error: '', contactsList: action.payload, loading: false };
        case MY_CONTACTS_FETCH_FAIL:
            return { ...state, error: action.payload, contactsList: {}, loading: true };
        case MY_CONTACTS_FETCHING:
            return { ...state, error: '', contactsList: {}, loading: true };
        default:
            return state;
    }
}