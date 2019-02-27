import React, {Component} from 'react';
import {Provider} from 'react-redux';

import Navigator from './Navigation/Navigator';
import Store from './Store/configureStore';

export default class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <Navigator />
            </Provider>
        );
    }
}
