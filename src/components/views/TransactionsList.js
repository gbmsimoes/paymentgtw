import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ListView } from 'react-native';
import { getMyContactsList, phoneNumberWasSelected } from "../../actions";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';

class TransactionsList extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };

        this.onBackPressed = this.onBackPressed.bind(this);

    }

    componentWillMount(){
        this.createDataSource(this.props);
    }

    createDataSource({ transactions }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });


        this.state.dataSource = ds.cloneWithRows(transactions);

        //console.log("createDataSource: ", this.state.dataSource);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    renderRow(transaction) {
        const { txHash, status } = transaction;


            return (
                <View style={{ height: 40, backgroundColor: 'green', alignSelf: 'stretch' }}>


                            <Text > { txHash + ' - Status: ' + status }</Text>
                    <View style={{ marginBottom: 0, alignSelf: 'stretch', height: 5, backgroundColor: 'pink' }}/>
                </View>
            );

    }

    onBackPressed() {
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
                        onPress={ this.onBackPressed }
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

const mapStateToProps = ({ transaction }) => {
    const { transactions } = transaction;

    debugger;
    return {
        transactions,
    };
};

export default connect(mapStateToProps, { getMyContactsList, phoneNumberWasSelected })(TransactionsList);
