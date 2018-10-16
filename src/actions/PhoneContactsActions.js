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
        //
        // Contacts.getAll((err, contacts) => {
        //     if (err){
        //         dispatch({ type: MY_CONTACTS_FETCH_FAIL, payload: err });
        //     }
        //
        //
        //
        //
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
        company: "",
        emailAddresses: [{
            label: "work",
            email: "carl-jung@example.com",
        }],
        familyName: "Jung",
        givenName: "Carl",
        jobTitle: "",
        note: 'some text',
        urlAddresses: [{
            label: "home",
            url: "www.jung.com",
        }],
        middleName: "",
        phoneNumbers: [{
            label: "mobile",
            number: "(555) 555-5555",
        }],
        hasThumbnail: true,
        thumbnailPath: 'content://com.android.contacts/display_photo/3',
        postalAddresses: [
            {
                street: '123 Fake Street',
                city: 'Sample City',
                state: 'CA',
                region: 'CA',
                postCode: '90210',
                country: 'USA',
                label: 'home'
            }
        ],
        birthday: {"year": 1988, "month": 0, "day": 1 }
    },
        {
            recordID: '6xxxxxee0df85980',
            company: "",
            emailAddresses: [{
                label: "work",
                email: "carl-jung@example2.com",
            }],
            familyName: "Jung2",
            givenName: "Carl2",
            jobTitle: "",
            note: 'some text2',
            urlAddresses: [{
                label: "home",
                url: "www.jung2.com",
            }],
            middleName: "",
            phoneNumbers: [{
                label: "mobile",
                number: "(555) 555-4242",
            }],
            hasThumbnail: true,
            thumbnailPath: 'content://com.android.contacts/display_photo/3',
            postalAddresses: [
                {
                    street: '123 Fake Street',
                    city: 'Sample City',
                    state: 'CA',
                    region: 'CA',
                    postCode: '90210',
                    country: 'USA',
                    label: 'home'
                }
            ],
            birthday: {"year": 1988, "month": 0, "day": 1 }
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
