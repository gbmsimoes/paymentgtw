import { TX_HASH_CHANGED } from "../globals/types";

const INITIAL_STATE = {
    txHash: ''

};

export default (state = INITIAL_STATE, action) => {

    console.log(action);

    switch (action.type) {
         case TX_HASH_CHANGED:
             return { ...state, error: '', txHash: action.payload };
               default:
            return state;
    }
}