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
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    renderRow(transaction) {
        const { txHash, status } = transaction;
            return (
                <View style={ styles.tableCellStyle }>
                            <Text style={ styles.tableCellTextStyle }>txHash: { txHash }</Text>
                            <Text style={ styles.tableCellTextStyle }>Status: { status === 1 ? 'Complete' : 'Failed' }</Text>
                    <View style={ styles.tableCellBottomLineStyle }/>
                </View>
            );    }

    onBackPressed() {
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
    backButtonStyle: {
        alignItems: 'center',
        padding: 10,
        height: 40,
        width: 80
    },
    navBarStyle: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center'
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
        height: 100,
        backgroundColor: '#322c75',
        alignSelf: 'stretch',
        marginBottom: 2
    },
    tableCellTextStyle: {
        alignSelf: 'center',
        marginTop: 12,
        color: 'white',
        fontSize: 16
    },
    tableCellBottomLineStyle: {
        marginBottom: 0,
        alignSelf: 'stretch',
        height: 2,
        backgroundColor: '#555'
    }
});

const mapStateToProps = ({ transaction }) => {
    const { transactions } = transaction;

    return {
        transactions,
    };
};

export default connect(mapStateToProps, { getMyContactsList, phoneNumberWasSelected })(TransactionsList);
