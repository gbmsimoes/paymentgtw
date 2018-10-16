import {
    NEW_TX_LIST,
    TRANSACTION_CHECK_FAIL,
    TRANSACTION_CHECK_SUCCESS,
    TRANSACTION_CHECKING, TX_ADDED_TO_LIST,
    TX_HASH_CHANGED
} from "../globals/types";
import axios from 'axios';

export const txHashChanged = (text) => {
    return {
        type: TX_HASH_CHANGED,
        payload: text
    }
};

export const getTransactionStatus = (txHash) => {

    return (dispatch) => {

        dispatch({type: TRANSACTION_CHECKING});

        axios.get('https://api.etherscan.io/api', {
            params: {
                module: 'transaction',
                action: 'gettxreceiptstatus',
                apikey: 'VWDJN72UCMRANFZ2TCNJE6X649PAUP44C7',
                txhash: txHash
            }
        })
            .then(function (response) {
                console.log(response);
                dispatch({ type: TRANSACTION_CHECK_SUCCESS, payload: response });
            })
            .catch(function (error) {
                console.log(error);
                dispatch({ type: TRANSACTION_CHECK_FAIL, payload: error });
            })
            .then(function () {
                // always executed
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