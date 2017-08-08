'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    UIManager,
    BackHandler,
} from 'react-native'
//nativeImageSource用import？
const nativeImageSource =require('nativeImageSource')
import TestExamplesList from './module'
import ExampleList from './ExampleList'
import TestActions from './TestActions'

import type {TestNavigationState} from './TestNavigationReducer'
import TestNavigationReducer from './TestNavigationReducer'
import TestExampleContainer from './TestExampleContainer'
import TitleBarComponent from './TitleBarComponent'
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
UIManager.setLayoutAnimationEnabledExperimental(true);

export default class ComponentTest extends Component {
    constructor(props) {
        super(props)
        console.log(TestExamplesList)
    }

    state: TestNavigationState;

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this._handleBackButtonPress);
    }

    componentDidMount() {
        this.setState(TestNavigationReducer(null, {type: 'InitialAction'}));
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
        const {
            openExample,
        } = this.state;
        if (openExample) {
            const ExampleModule=TestExamplesList.Modules[openExample]
            console.log(ExampleModule)
            if (ExampleModule) {
                return (
                    <View style={styles.container}>
                        {/*                        <ToolbarAndroid
                            logo={HEADER_LOGO_ICON}
                            navIcon={HEADER_NAV_ICON}
                            style={styles.toolbar}
                            al
                            onIconClicked={() => console.log('onIconClicked')}
                            title={ExampleModule.title}
                        />*/}
                        <TitleBarComponent
                            isShow={true}
                            title={ExampleModule.title}
                            onPress={this._handleBackButtonPress}

                        />
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
        console.log('return')
        return (
            <View style={styles.container}>
                <TitleBarComponent
                    title="学习记录"
                />
                <ExampleList
                    onNavigate={this._handleAction}
                    list={TestExamplesList}
                />
            </View>
        );
    }

    _handleAction = (action: Object): boolean => {
        console.log('_handleAction')
        const newState = TestNavigationReducer(this.state, action);
        console.log(newState)
        this.setState(
            newState
        );
        return true;
        return false;
    };
    _handleBackButtonPress = () => {
        if (
            this._exampleRef &&
            this._exampleRef.handleBackAction &&
            this._exampleRef.handleBackAction()
        ) {
            return true;
        }
        return this._handleAction(TestActions.Back());
    };
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
AppRegistry.registerComponent('helloReactNative', () => ComponentTest)