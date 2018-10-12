import React from 'react';
import { Scene, Router} from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';
import Home from './components/views/Home';

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
            </Scene>
        </Router>
    );
};

export default RouterComponent;