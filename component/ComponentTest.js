'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    BackHandler,
} from 'react-native'
//nativeImageSource用import？
const nativeImageSource = require('nativeImageSource')
import TestExamplesList from './module'
import TestActions from './TestActions'

import TestExampleContainer from './TestExampleContainer'

const HEADER_LOGO_ICON = nativeImageSource({
    android: 'launcher_icon',
    width: 132,
    height: 144
});

const HEADER_NAV_ICON = nativeImageSource({
    android: 'ic_menu_black_24dp',
    width: 48,
    height: 48
});

export default class ComponentTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ExampleKey: props.ExampleKey
        }
    }


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this._handleBackButtonPress);
    }

    render() {
        if (!this.state) {
            return null;
        }
        return <View style={styles.container}>
            {this._renderApp()}
        </View>
    }

    _renderApp() {
        const {ExampleKey} = this.state;
        const ExampleModule = TestExamplesList.Modules[ExampleKey]
        if (ExampleModule) {
            return (
                <View style={styles.container}>
                    <TestExampleContainer
                        module={ExampleModule}
                        ref={(example) => {
                            this._exampleRef = example;
                        }}
                    />
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        backgroundColor: '#E9EAED',
        height: 56,
    },
});
