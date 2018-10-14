import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { txHashChanged } from '../../actions/index';


class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };

        this.onTxHashTextChange = this.onTxHashTextChange.bind(this);
        this.onContactsPress = this.onContactsPress.bind(this);
    }



    onTxHashTextChange(text) {
        this.props.txHashChanged(text);
    }

    onContactsPress() {
        console.log("onContactsPress")
        Actions.phonecontacts();
    }





    render() {
        const {
            containerStyle,
            topContainerStyle,
            bottomContainerStyle,
            textInputStyle,
            textLabelStyle,
            textInputContainerStyle,
            contactsButtonStyle
        } = styles;

        return (
            <View style={ containerStyle }>
                <View style={ topContainerStyle }>
                    <View style={ textInputContainerStyle }>
                        <Text style={ textLabelStyle }>Enter the txHash</Text>
                        <TextInput
                            style={ textInputStyle }
                            onChangeText={this.onTxHashTextChange}
                            value={ this.props.txHash }
                        />
                        <TouchableOpacity
                            style={ contactsButtonStyle }
                            onPress={ this.onContactsPress }
                        >
                            <Text> Get Contact </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={ bottomContainerStyle }>

                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'blue',
        flex: 1,
        flexDirection: 'column'
    },
    topContainerStyle: {
        flex: 1,
        backgroundColor: 'green',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    bottomContainerStyle: {
        flex: 1,
        backgroundColor: 'yellow'
    },
    textInputContainerStyle: {
        backgroundColor: 'red',
        height: 160,
        flex: 1,
        padding: 10
    },
    textLabelStyle: {
        color: 'white',
        height: 40,
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
    },
    textInputStyle: {
        height: 80,
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
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
});

const mapStateToProps = ({ home }) => {
    const {txHash } = home;

    return {
        txHash,
    };
};

export default connect(mapStateToProps, { txHashChanged })(Home);