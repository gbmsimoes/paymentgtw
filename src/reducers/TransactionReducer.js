import {
    NEW_TX_LIST,
    PAYMENT_UPDATE_TX_HASH,
    TRANSACTION_CHECK_FAIL,
    TRANSACTION_CHECK_SUCCESS,
    TRANSACTION_CHECKING, TX_ADDED_TO_LIST,
    TX_HASH_CHANGED
} from "../globals/types";

const INITIAL_STATE = {
    txHash: '',
    loading: false,
    tx: {},
    error: '',
    transactions: []

};

export default (state = INITIAL_STATE, action) => {

    console.log(action);

    switch (action.type) {
        case NEW_TX_LIST:
            return { ...state, transactions: [] };
        case TX_ADDED_TO_LIST:
            const txList = [...state.transactions, action.payload]
            return { ...state, transactions: txList };
        case TX_HASH_CHANGED:
            return { ...state, error: '', tx: {}, txHash: action.payload, loading: false };
        case TRANSACTION_CHECK_SUCCESS:
            return { ...state, error: '', tx: action.payload, loading: false };
        case TRANSACTION_CHECK_FAIL:
            return { ...state, error: action.payload, tx: {}, loading: false };
        case TRANSACTION_CHECKING:
            return { ...state, error: '', tx: {}, loading: true };
        default:
            return state;
    }
}