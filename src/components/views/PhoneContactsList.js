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

        PhoneContactsList.onBackPressed = PhoneContactsList.onBackPressed.bind(this);
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

        //console.log("createDataSource: ", this.state.dataSource);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    renderRow(contact) {
        const { givenName, familyName } = contact;


            return (
                <View style={{ height: 40, backgroundColor: 'green', alignSelf: 'stretch' }}>

                        <TouchableOpacity
                            style={{ backgroundColor: 'rgba(0,0,0,0.25)', alignSelf: 'stretch', height: 38 }}
                            onPress={  () => this.onPhoneNumberPressed(contact)   }
                        >
                            <Text > { givenName + ' ' + familyName }</Text>
                        </TouchableOpacity>
                    <View style={{ marginBottom: 0, alignSelf: 'stretch', height: 5, backgroundColor: 'pink' }}/>
                </View>
            );

    }

    static onBackPressed() {
        console.log("onBackPressed");

        Actions.pop();
    }

    onPhoneNumberPressed(contact) {
        console.log(contact);
        this.props.phoneNumberWasSelected(contact.phoneNumbers[0].number);
        Actions.pop();

    }

    render () {
        const {
            containerStyle,
            backButtonStyle,
            backButtonTextStyle
        } = styles;

        return (
            <View style={ containerStyle }>
                <View style={ { height: 64, backgroundColor: 'red', flexDirection: 'row', alignItems: 'center' } }>
                    <TouchableOpacity
                        style={ backButtonStyle }
                        onPress={ PhoneContactsList.onBackPressed }
                    >
                        <Text style={ backButtonTextStyle }>back</Text>
                    </TouchableOpacity>
                </View>
                <View style={ { flex: 1, backgroundColor: 'yellow', marginLeft: 10, marginRight: 10 } }>
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
        backgroundColor: 'blue',
        flex: 1,
        flexDirection: 'column'
    },
    backButtonStyle: {
        alignItems: 'center',
        padding: 10,
        height: 40,
        width: 80
    },
    backButtonTextStyle: {
        color: 'white'
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
