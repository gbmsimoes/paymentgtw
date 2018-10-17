import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ListView } from 'react-native';
import { getMyContactsList, phoneNumberWasSelected } from "../../actions";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';

class PhoneContactsList extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };

        this.onBackPressed = this.onBackPressed.bind(this);
        this.onPhoneNumberPressed = this.onPhoneNumberPressed.bind(this);
    }

    componentWillMount(){
        this.props.getMyContactsList();
        this.createDataSource(this.props);
    }

    createDataSource({ contactsList }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state.dataSource = ds.cloneWithRows(contactsList);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    renderRow(contact) {
        const { givenName, familyName } = contact;
            return (
                <View style={ styles.tableCellStyle }>

                        <TouchableOpacity
                            style={ styles.tableCellButtonStyle }
                            onPress={  () => this.onPhoneNumberPressed(contact)   }
                        >
                            <Text style={ styles.tableCellTextStyle }> { givenName + ' ' + familyName }</Text>
                        </TouchableOpacity>
                    <View style={ styles.tableCellBottomLineStyle }/>
                </View>
            );

    }

    onBackPressed() {
        Actions.pop();
    }

    onPhoneNumberPressed(contact) {
        this.props.phoneNumberWasSelected(contact.phoneNumbers[0].number);
        Actions.pop();

    }

    render () {
        const {
            containerStyle,
            backButtonStyle,
            backButtonTextStyle,
            navBarStyle,
            tableContainerStyle
        } = styles;

        return (
            <View style={ containerStyle }>
                <View style={ navBarStyle }>
                    <TouchableOpacity
                        style={ backButtonStyle }
                        onPress={ this.onBackPressed }
                    >
                        <Text style={ backButtonTextStyle }>back</Text>
                    </TouchableOpacity>
                </View>
                <View style={ tableContainerStyle }>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        enableEmptySections={true}
                    />
                </View>
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
    navBarStyle: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center'
    },
    backButtonStyle: {
        alignItems: 'center',
        padding: 10,
        height: 40,
        width: 80
    },
    backButtonTextStyle: {
        color: 'white'
    },
    tableContainerStyle: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10
    },
    tableCellButtonStyle: {
        backgroundColor: 'rgba(0,0,0,0.25)',
        alignSelf: 'stretch',
        height: 48
    },
    tableCellStyle: {
        height: 50,
        alignSelf: 'stretch',
        marginBottom: 2
    },
    tableCellTextStyle: {
        alignSelf: 'center',
        marginTop: 12,
        color: 'white',
        fontSize: 18
    },
    tableCellBottomLineStyle: {
        marginBottom: 0,
        alignSelf: 'stretch',
        height: 2,
        backgroundColor: '#555'
    }
});

const mapStateToProps = ({ phoneContacts }) => {
    const { loading, error, contactsList } = phoneContacts;
    return {
        loading,
        error,
        contactsList
    };
};

export default connect(mapStateToProps, { getMyContactsList, phoneNumberWasSelected })(PhoneContactsList);
