//https://facebook.github.io/react-native/docs/appstate.html
'use strict';
import React, {Component} from 'react';
import {
    AppState,
    Text,
    View,
    Platform

} from 'react-native';

class AppStateSubscription extends Component {
    state = {
        appState: AppState.currentState,
        previousAppStates: [],
        memoryWarings: 0,
    }

    //注册监听
    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange)
        AppState.addEventListener('memoryWarning', this._handleMemoryWarning);
    }
    //移除监听
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        AppState.removeEventListener('memoryWarning', this._handleMemoryWarning);
    }
    //存储警告监听
    _handleMemoryWarning = () => {
        this.setState({memoryWarnings: this.state.memoryWarnings + 1});
    };
    //App状态变化监听
    _handleAppStateChange = (appState) => {
        var previousAppStates = this.state.previousAppStates.slice();
        previousAppStates.push(this.state.appState);
        this.setState({
            appState,
            previousAppStates
        })
    };

    render() {
        return (<View>
            {Platform.OS == 'ios' && <Text>{this.state.memoryWarnings}</Text>}
            <Text>最后一次状态:{this.state.appState}</Text>
            <Text>状态历史：{JSON.stringify(this.state.previousAppStates)}</Text>
        </View>)
    }
}

export const title = 'AppState';
export const description = '获取App运行状态，如前台运行，后台运行';
export const examples = [
    {
        title: 'AppState.currentState',
        description: '初始化的时候该值可能为null(应用程序启动过程),有三种值:active:应用在前台，background：应用程序在后台运行，inactive：该状态表示应用正在前台和后台切换过程，或者出库系统多任务，来电.',
        render() {
            return <Text>{AppState.currentState}</Text>
        }
    }, {
        title: "",
        render() {
            return <AppStateSubscription/>
        }
    }

]