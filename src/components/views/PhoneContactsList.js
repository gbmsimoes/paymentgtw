import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ListView } from 'react-native';
import { getMyContactsList } from "../../actions";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';

class PhoneContactsList extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };

        this.onBackPressed = this.onBackPressed.bind(this);


    }

    componentWillMount(){
        this.props.getMyContactsList();
        this.createDataSource(this.props);
    }

    createDataSource({ contacts }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });


        this.state.dataSource = ds.cloneWithRows(contacts);

        //console.log("createDataSource: ", this.state.dataSource);
    }

    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component
        // will be rendered with
        // this.props is still the old set of props

        this.createDataSource(nextProps);
    }

    onBackPressed() {
        console.log("onBackPressed");
        console.log(this.state.contactsList)

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
                <View style={ { flex: 1, height: 64, backgroundColor: 'red' } }>
                    <TouchableOpacity
                        style={ backButtonStyle }
                        onPress={ this.onBackPressed }
                    >
                        <Text style={ backButtonTextStyle }>back</Text>
                    </TouchableOpacity>
                </View>
                <View style={ { flex: 1, backgroundColor: 'yellow' } }>
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
        marginTop: 32,
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

export default connect(mapStateToProps, { getMyContactsList })(PhoneContactsList);
