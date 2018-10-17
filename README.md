# PAYMENTGTW

This application is a simple payment payment application that will get a contact from a contacts list, confirm transactions via the Etherscan API and confirm a payment as soon as the transactions are complete.

# Installation
1. Run "npm install" or "yarn install"
2. Run "react-native link"

# Notes
The application gets the contacts list from a JSON array. There's no device contacts support right now.
The application will not send a Push Notification on payment success, even though it is calling the corresponding action and reducer
