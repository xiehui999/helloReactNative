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

import HelloComponent from './learn/HelloComponent';
import LifecycleComponent from './learn/LifecycleComponent';
export default class helloReactNative extends Component {
    constructor(props){
        super(props)
        this.state={
            remove:false,
            count:0
        }
    }
    render() {
        var view=this.state.remove?null:<LifecycleComponent {...this.state}></LifecycleComponent>
        var text=this.state.remove?'模拟组件装载':'模拟组件卸载'
        return (
            <View style={styles.container}>
                <HelloComponent
                    name='PROPS'
                />
                <Text
                    onPress={() => {
                        this.setState({
                            remove: !this.state.remove
                        })
                    }}
                >{text}</Text>
                <Text
                    onPress={()=>{
                        this.setState({
                            count:this.state.count+1
                        })
                    }}
                >点击更改props</Text>
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
