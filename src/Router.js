import React from 'react';
import { Scene, Router} from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';
import Home from './components/views/Home';
import Payment from './components/views/Payment';
import PhoneContactsList from './components/views/PhoneContactsList';
import TransactionsList from './components/views/TransactionsList';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene
                    key="home"
                    component={Home}
                    hideNavBar={true}
                    title="Home"
                    panHandlers = { null }
                    initial
                />
                <Scene
                    key="payment"
                    component={Payment}
                    hideNavBar={true}
                    title="Payment"
                    panHandlers = { null }
                />
                <Scene
                    key="phonecontacts"
                    component={PhoneContactsList}
                    hideNavBar={true}
                    title="PhoneContactsList"
                    panHandlers = { null }
                />
                <Scene
                    key="transactionslist"
                    component={TransactionsList}
                    hideNavBar={true}
                    title="TransactionsList"
                    panHandlers = { null }
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;