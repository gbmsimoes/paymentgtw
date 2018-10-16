import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
    txHashChanged,
    phoneNumberWasSelected,
    getTransactionStatus,
    updatePayment,
    resetPhoneNumbers,
    createNewPayment,
    addTransactionToList
} from '../../actions/index';


class Payment extends Component{
    constructor(props) {
        super(props);
        this.state = {
            checkTransactionStatus: false

        };

        this.onTxHashTextChange = this.onTxHashTextChange.bind(this);
        this.onContactsPress = this.onContactsPress.bind(this);
        this.onCheckTransactionStatusPress = this.onCheckTransactionStatusPress.bind(this);
        this.onPaymentResetPress = this.onPaymentResetPress.bind(this);
    }

    checkTransactionStatus() {
        if(this.state.checkTransactionStatus === false)
            return;

        if(this.props.tx.data === undefined)
            return;

        if(this.props.tx.data.result.status === "1") {
            this.props.updatePayment(this.props.txHash, this.props.phoneNumber);
            this.props.addTransactionToList(this.props.txHash, 1);
            this.refs.toast.show('Success! Transaction Complete!');
        }
        else if(this.props.tx.data.result.status === "0") {
            this.refs.toast.show('The transaction failed!.');
            this.props.addTransactionToList(this.props.txHash, 0);
        }
        else
            this.refs.toast.show('There was an error! Please check the txHash.');

        this.setState({ checkTransactionStatus: false });
    }

    checkPaymentStatus(){
        if(this.props.currentPayment.status === 0) {
            return (
                <TouchableOpacity
                    style={ styles.checkTransactionStatusButtonStyle }
                    onPress={ this.onCheckTransactionStatusPress }
                >
                    <Text style={ styles.transactionButtonText }> Check Transaction Status </Text>
                </TouchableOpacity>
            );
        }else{
            return (
                <View style={{ alignSelf: 'center' }}>
                    <Text style={{ alignSelf: 'center' }}>The Payment was successful!</Text>

                    <TouchableOpacity
                        style={ styles.checkTransactionStatusButtonStyle }
                        onPress={ this.onPaymentResetPress }
                    >
                        <Text style={ styles.transactionButtonText }> Perform a new payment </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    onPaymentResetPress() {
        this.props.createNewPayment();
        this.props.resetPhoneNumbers();
        this.props.txHashChanged("");
    }

    onTxHashTextChange(text) {
        this.props.txHashChanged(text);
    }

    onContactsPress() {
        console.log('onContactsPress');
        Actions.phonecontacts();
    }

    onCheckTransactionStatusPress() {
        console.log('onCheckTransactionStatusPress');

        if(this.props.phoneNumber === undefined || this.props.phoneNumber === ''){
            this.refs.toast.show('You need a phone number to complete a payment!');
            return;
        }

        this.props.getTransactionStatus(this.props.txHash);
        this.setState({ checkTransactionStatus: true });
    }


    render() {
        const {
            containerStyle,
            topContainerStyle,
            bottomContainerStyle,
            textInputStyle,
            textLabelStyle,
            textInputContainerStyle,
            contactsButtonStyle,
            toastStyle,
            phoneNumberStyle,
            transactionListButton,
            transactionListButtonText
        } = styles;

        return (
            <View style={ containerStyle }>
                <View style={{ height: 64 }}>
                        <TouchableOpacity
                        style={ transactionListButton }
                        onPress={ () => Actions.transactionslist() }
                        >
                        <Text style={ transactionListButtonText }> tx List -> </Text>
                    </TouchableOpacity>
                </View>
                <View style={ topContainerStyle }>
                    <View style={ textInputContainerStyle }>

                        <Text style={ phoneNumberStyle }>{ this.props.phoneNumber !== undefined && this.props.phoneNumber !== '' ? this.props.phoneNumber : 'Seller\'s contact' }</Text>
                        <TouchableOpacity
                            style={ contactsButtonStyle }
                            onPress={ this.onContactsPress }
                        >
                            <Text> Get a Phone Number from the list </Text>
                        </TouchableOpacity>



                        <Text style={ textLabelStyle }>Enter the txHash</Text>
                        <TextInput
                            style={ textInputStyle }
                            onChangeText={this.onTxHashTextChange}
                            value={ this.props.txHash }
                        />

                    </View>




                </View>
                <View style={ bottomContainerStyle }>
                    { this.checkPaymentStatus() }
                </View>

                { this.checkTransactionStatus() }

                <Toast
                    style={ toastStyle }
                    position="top"
                    positionValue={ 20 }
                    ref="toast"/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#2e3375',
        flex: 1,
        flexDirection: 'column'
    },
    topContainerStyle: {
        flex: 3,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    },
    bottomContainerStyle: {
        flex: 2,
    },
    textInputContainerStyle: {
        alignSelf: 'center',
        height: 240,
        width: '90%'
    },
    textLabelStyle: {
        fontSize: 22,
        marginTop: 30,
        color: 'white',
        height: 40,
        marginBottom: 10
    },
    textInputStyle: {
        height: 60,
        //flex: 1,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1
    },
    contactsButtonStyle: {
        marginTop: 16,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        height: 40
    },
    checkTransactionStatusButtonStyle: {
        marginTop: 16,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        height: 40,
        width: '90%',
        alignSelf: 'center',

    },
    transactionStatusContainer: {
        marginTop: 16,
        alignItems: 'center',
        height: 40
    },
    successStatusStyle: {
        color: 'green'
    },
    failStatusStyle: {
        color: 'red'
    },
    errorStatusStyle: {
        color: 'yellow'
    },
    toastStyle: {
        backgroundColor: 'orange',
    },
    phoneNumberStyle: {
        fontSize: 26,
        height: 40,
        color: 'white',
        alignSelf: 'center'
    },
    transactionButtonText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    transactionListButton: {
        width: 80,
        height: 40,
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: 12
    },
    transactionListButtonText: {
        alignSelf: 'center',
        color: 'white',
        height: 40,
        fontWeight: 'bold',
        fontSize: 18
    }
});

const mapStateToProps = ({ phoneContacts, transaction, payment }) => {
    const { currentPayment } = payment;
    const { phoneNumber } = phoneContacts;
    const { loading, tx, error, txHash, transactions } = transaction;


    return {
        txHash,
        phoneNumber,
        loading,
        tx,
        error,
        currentPayment,
        transactions
    };
};

export default connect(mapStateToProps, {
    txHashChanged,
    phoneNumberWasSelected,
    getTransactionStatus,
    updatePayment,
    resetPhoneNumbers,
    createNewPayment,
    addTransactionToList
})(Payment);