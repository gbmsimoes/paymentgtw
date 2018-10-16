import {PAYMENT_CREATED, PAYMENT_UPDATED} from "../globals/types";

export const createNewPayment = () => {
    const payment = {};
    payment.txHash = '';
    payment.transactionCount = 0;
    payment.status = 0;
    payment.receiver = '';

    return {
        type: PAYMENT_CREATED,
        payload: payment
    }
};

export const updatePayment = (txHash, phoneNumber) => {

    const payload = {
        txHash: txHash,
        phoneNumber: phoneNumber
    };

    return {
        type: PAYMENT_UPDATED,
        payload: payload
    }
};
