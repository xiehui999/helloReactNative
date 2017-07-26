import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    ToolbarAndroid,
} from 'react-native'
import ComponentExamplesList from './module'
import ExampleList from './ExampleList'
import TestActions from './TestActions'

import type {TestNavigationState} from './TestNavigationReducer'
import TestNavigationReducer from './TestNavigationReducer'
import TestExampleContainer from './TestExampleContainer'


const nativeImageSource = require('nativeImageSource');
const Linking = require('AsyncStorage');
const AsyncStorage = require('AsyncStorage');
const UIManager = require('UIManager');
const BackHandler = require('BackHandler');

type Props = {
    exampleFromAppetizeParams: string,
};
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
const APP_STATE_KEY = 'RNTesterAppState.v2';
UIManager.setLayoutAnimationEnabledExperimental(true);

export default class ComponentTest extends Component {
    constructor(props) {
        super(props)
        console.log(ComponentExamplesList)
    }

    props: Props;
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
            var ExampleModule;
            for (var i = 0; i < ComponentExamplesList.length; i++) {
                if (ComponentExamplesList[i].key == openExample) {
                    ExampleModule = ComponentExamplesList[i].module
                    break
                }
            }
            console.log(ComponentExamplesList)
            console.log(ExampleModule)
            if (ExampleModule) {
                return (
                    <View style={styles.container}>
                        <ToolbarAndroid
                            logo={HEADER_LOGO_ICON}
                            navIcon={HEADER_NAV_ICON}
                            style={styles.toolbar}
                            onIconClicked={() => console.log('onIconClicked')}
                            title={ExampleModule.title}
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
                <ToolbarAndroid
/*                    logo={HEADER_LOGO_ICON}
                    navIcon={HEADER_NAV_ICON}*/
                    onIconClicked={() => console.log('onIconClicked')}
                    style={styles.toolbar}
                    title="RNTester"
                />
                <ExampleList
                    onNavigate={this._handleAction}
                    list={ComponentExamplesList}
                />
            </View>
        );
    }

    _handleAction = (action: Object): boolean => {
        console.log('_handleAction')
        const newState = TestNavigationReducer(this.state, action);
        // if (this.state !== newState) {
        //     this.setState(
        //         newState
        //     );
        //     return true;
        // }
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
module.exports = ComponentTest;