/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Child from "./Child";

export const title = "SetState";
export const description = "React.setState之state批处理的机制";
export default class Parent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            remove: false,
            count: 0,
            refCount: 0
        }
    }


    changeA() {
        this.setState({a: true})
    }

    render() {
        console.log("--------------Parent:render")
        return (
            <View style={styles.container}>
                <Child changeA={this.changeA.bind(this)}/>
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
        flexWrap: 'nowrap',
    },
});