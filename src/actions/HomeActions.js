import { TX_HASH_CHANGED } from "../globals/types";

export const txHashChanged = (text) => {
    return {
        type: TX_HASH_CHANGED,
        payload: text
    }
};