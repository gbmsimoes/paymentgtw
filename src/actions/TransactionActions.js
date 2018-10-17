import {
    NEW_TX_LIST,
    TRANSACTION_CHECK_FAIL,
    TRANSACTION_CHECK_SUCCESS,
    TRANSACTION_CHECKING, TX_ADDED_TO_LIST,
    TX_HASH_CHANGED
} from "../globals/types";
import axios from 'axios';
import {
    API_KEY,
    API_URL
} from '../config/Config';

export const txHashChanged = (text) => {
    return {
        type: TX_HASH_CHANGED,
        payload: text
    }
};

export const getTransactionStatus = (txHash) => {

    return (dispatch) => {
        dispatch({type: TRANSACTION_CHECKING});

        axios.get(API_URL, {
            params: {
                module: 'transaction',
                action: 'gettxreceiptstatus',
                apikey: API_KEY,
                txhash: txHash
            }
        })
            .then(function (response) {
                //console.log(response);
                dispatch({ type: TRANSACTION_CHECK_SUCCESS, payload: response });
            })
            .catch(function (error) {
                //console.log(error);
                dispatch({ type: TRANSACTION_CHECK_FAIL, payload: error });
            })
            .then(function () {
            });
    };

};

export const createNewTransactionList = () => {
    return {
        type: NEW_TX_LIST
    }
};

export const addTransactionToList = (txHash, status) => {
    const payload = {
        txHash: txHash,
        status: status
    };

    return {
        type: TX_ADDED_TO_LIST,
        payload: payload
    }
};