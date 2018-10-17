# PAYMENTGTW

This application is a simple payment payment application that will get a contact from a contacts list, confirm transactions via the Etherscan API and confirm a payment as soon as the transactions are complete.

# Libraries used
1. axios
2. react-native-contacts (I was unable to get it to work, even on a device)
3. react-native-easy-toast (for on-screen notifications)
4. react-native-router-flux (for routing)
5. react-redux (state management)
6. redux (state management)
6. redux-thunk (redux middleware)


# Installation
1. Run "npm install" or "yarn install"
2. Run "react-native link"

# Notes
The application gets the contacts list from a JSON array. There's no device contacts support right now.
The application will not send a Push Notification on payment success, even though it is calling the corresponding action and reducer (push notifications would require the installation of the application on two devices and a notification server
