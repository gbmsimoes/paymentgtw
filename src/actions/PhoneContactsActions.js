import Contacts from 'react-native-contacts';
import {
    MY_CONTACTS_FETCH_FAIL,
    MY_CONTACTS_FETCH_SUCCESS,
    MY_CONTACTS_FETCHING, PHONE_NUMBER_RESET,
    PHONE_NUMBER_SELECTED,
} from "../globals/types";

export const getMyContactsList = () => {
    return (dispatch) => {
        const contactsList = alternateGetContacts();
        dispatch({ type: MY_CONTACTS_FETCH_SUCCESS, payload: contactsList });

        // dispatch({type: MY_CONTACTS_FETCHING});

        // Contacts.getAll((err, contacts) => {
        //     if (err){
        //         dispatch({ type: MY_CONTACTS_FETCH_FAIL, payload: err });
        //     }

        //     // contacts returned
        //     console.log(contacts)
        //     dispatch({ type: MY_CONTACTS_FETCH_SUCCESS, payload: contacts });
        //
        // });
    };

};

const alternateGetContacts = () => {
    return [{
        recordID: '6b2237ee0df85980',
        familyName: "Doe",
        givenName: "John",
        phoneNumbers: [{
            label: "mobile",
            number: "(555) 555-5555",
        }],
    },
        {
            recordID: '6xxxxxee0df85980',
            familyName: "Michael",
            givenName: "Knight",
            phoneNumbers: [{
                label: "mobile",
                number: "(555) 555-4242",
            }],
        },
        {
            recordID: '6xxxxxe454585980',
            familyName: "James",
            givenName: "Lebron",
            phoneNumbers: [{
                label: "mobile",
                number: "(555) 555-2737",
            }],
        }
    ];


};

export const phoneNumberWasSelected = (text) => {
    return {
        type: PHONE_NUMBER_SELECTED,
        payload: text
    }
};

export const resetPhoneNumbers = () => {
    return {
        type: PHONE_NUMBER_RESET
    }
};
