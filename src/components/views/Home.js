import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { createNewPayment, createNewTransactionList } from '../../actions/index';


class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };

        this.onNewPaymentPress = this.onNewPaymentPress.bind(this);
    }

    componentWillMount() {

    }

     onNewPaymentPress() {
        this.props.createNewPayment();
        this.props.createNewTransactionList();
        Actions.payment();
    }


    render() {
        const {
            containerStyle,
            newPaymentButtonStyle,
        } = styles;

        return (
            <View style={ containerStyle }>
                    <TouchableOpacity
                        style={ newPaymentButtonStyle }
                        onPress={ this.onNewPaymentPress }
                    >
                        <Text> New Payment </Text>
                    </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#2e3375',
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    newPaymentButtonStyle: {
        marginTop: 16,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        height: 40
    }

});

const mapStateToProps = ({ payment }) => {
    const { currentPayment } = payment;

    return {
        currentPayment
    };
};

export default connect(mapStateToProps, { createNewPayment, createNewTransactionList })(Home);