import {PUSH_NOTIFICATION_SEND} from "../globals/types";

export const firePushNotification = (phoneNumber) => {
    return {
        type: PUSH_NOTIFICATION_SEND,
    }
};