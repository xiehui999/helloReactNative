/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import HelloComponent from './HelloComponent';
import LifecycleComponent from './LifecycleComponent';
export default class helloReactNative extends Component {
    constructor(props){
        super(props)
        this.state={
            remove:false,
        }
    }
    render() {
        var view=this.state.remove?null:<LifecycleComponent></LifecycleComponent>
        return (
            <View style={styles.container}>
                <HelloComponent
                    name='Android()'
                />
                <Text
                    onPress={() => {
                        this.setState({
                            remove: !this.state.remove
                        })
                    }}
                >模拟组件卸载</Text>
                {view}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('helloReactNative', () => helloReactNative);
