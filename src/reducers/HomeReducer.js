import {PAYMENTS_LIST_CREATED} from "../globals/types";

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {

    console.log("HomeReducer: " + action);

    switch (action.type) {

        default:
            return state;

    }
}