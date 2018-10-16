import {PAYMENT_CREATED, PAYMENT_UPDATED} from "../globals/types";

const INITIAL_STATE = {
    currentPayment: {},
};

export default (state = INITIAL_STATE, action) => {

    console.log(action);

    switch (action.type) {
        case PAYMENT_CREATED:
        {
            return { ...state, currentPayment: action.payload };
        }
        case PAYMENT_UPDATED:
        {
            const transactionCount = state.currentPayment.transactionCount + 1;
            const paymentStatus = transactionCount === 2 ? 1 : 0;
            const updatePayment = {...state.currentPayment, txHash: action.payload.txHash, transactionCount:transactionCount, receiver: action.payload.phoneNumber, status: paymentStatus };
            return { ...state, currentPayment: updatePayment };
        }

        default:
            return state;

    }
}