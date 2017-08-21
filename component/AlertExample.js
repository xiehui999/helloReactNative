/**
 * 官方文档对应地址:
 * https://facebook.github.io/react-native/docs/alert.html
 * https://facebook.github.io/react-native/docs/alertios.html
 *
 * Code4Android
 * 我的简书:http://www.jianshu.com/u/d5b531888b2b
 * 新浪微博:http://weibo.com/745687294
 * CSDN:http://blog.csdn.net/xiehuimx?viewmode=contents
 */
'use strict'
import React, {Component} from 'react';
import {
    Alert,
    AlertIOS,
    Platform,
    Text,
    TouchableHighlight,
    View,
    StyleSheet
} from 'react-native';
import TestBlock from './TestBlock'
import TestPage from "./TestPage";

class SimpleAlertExample extends Component {
    render() {
        return (
            <View>
                <TouchableHighlight
                    style={styles.wrapper}
                    activeOpacity={0.5}
                    underlayColor="#eee"
                    onPress={() => {
                        Alert.alert('我是标题', '我是提示消息');
                    }}>
                    <View style={styles.button}>
                        <Text style={styles.textColor}>有提示消息和标题以及默认的按钮</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    activeOpacity={0.5}
                    underlayColor="#eee"
                    onPress={() => {
                        Alert.alert('我是标题', '我是提示消息', [{text: '确定', onPress: () => console.log('确定')}]);
                    }}>
                    <View style={styles.button}>
                        <Text style={styles.textColor}>设置了一个按钮,能监听点击事件</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    activeOpacity={0.5}
                    underlayColor="#eee"
                    onPress={() => {
                        Alert.alert('我是标题', '点击提示框的外面，自动取消提示框，并调用onDismis函数', [
                            {text: '取消', onPress: () => console.log('取消')},
                            {text: '确定', onPress: () => console.log('确定')}
                        ], {
                            onDismiss: () => {
                                console.log('onDismiss')
                            }
                        });
                    }}>
                    <View style={styles.button}>
                        <Text style={styles.textColor}>设置了两个按钮,监听onDismiss</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    activeOpacity={0.5}
                    underlayColor="#eee"
                    onPress={() => {
                        Alert.alert('我是标题', '设置了cancelable：false,当点击提示框的外面,不取消对话框显示,默认true', [
                            {text: '忽略', onPress: () => console.log('忽略')},
                            {text: '取消', onPress: () => console.log('取消')},
                            {text: '确定', onPress: () => console.log('确定')}
                        ], {cancelable: false});
                    }}>
                    <View style={styles.button}>
                        <Text style={styles.textColor}>三个按钮,点提示框外部不会取消(cancelable)</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={() => Alert.alert(
                        '我是标题',
                        '在iOS上你可以指定任意数量的按钮,Android最多支持3个',
                        '..............'.split('').map((dot, index) => ({
                            text: 'Button ' + index,
                            onPress: () => console.log('Pressed ' + index)
                        }))
                    )}>
                    <View style={styles.button}>
                        <Text style={styles.textColor}>设置更多按钮（Android最多支持3个）</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

class AlertIOSExample extends Component {
    state = {
        promptValue: ''
    }

    render() {
        return (
            <View>
                <Text style={{marginBottom: 10}}>
                    <Text style={{fontWeight: 'bold'}}>输入值:</Text> {this.state.promptValue}
                </Text>
                <TouchableHighlight
                    style={styles.wrapper}
                    activeOpacity={0.5}
                    underlayColor="#eee"
                    onPress={() => {
                        AlertIOS.prompt('我是标题', '我是提示消息', (vaule) => {
                            this.setState({promptValue: JSON.stringify(vaule)})
                        });
                    }}>
                    <View style={styles.button}>
                        <Text style={styles.textColor}>有输入框,提示消息和标题和输入回调</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    activeOpacity={0.5}
                    underlayColor="#eee"
                    onPress={() => {
                        AlertIOS.prompt('我是标题', '我是提示消息', [
                            {
                                text: '确定',
                                onPress: (vaule) => {
                                    this.setState({promptValue: JSON.stringify(vaule)})
                                }
                            }, {
                                text: '取消',
                                style: 'cancel',
                            }]);
                    }}>
                    <View style={styles.button}>
                        <Text style={styles.textColor}>有确定取消按钮</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    activeOpacity={0.5}
                    underlayColor="#eee"
                    onPress={() => {
                        AlertIOS.prompt('我是标题', '我是提示消息', [
                            {
                                text: '确定',
                                onPress: (vaule) => {
                                    this.setState({promptValue: JSON.stringify(vaule)})
                                }
                            }, {
                                text: '取消',
                                style: 'cancel',
                            }], 'login-password', '默认值');
                    }}>
                    <View style={styles.button}>
                        <Text style={styles.textColor}>设置输入样式密码(黑点)，有默认值</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

class AlertExample extends Component {
    static title = "Alert<*>";
    static description = "显示一个提示对话框，可设置标题，提示信息以及按钮。AlertIOS可以提供输入";

    render() {
        return (
            <TestPage
                noscroll={true}
                nospacer={true}>
                <TestBlock title="Alert">
                    <SimpleAlertExample/>
                </TestBlock>
                {Platform.OS == 'ios' ?
                    <TestBlock title="AlertIOS" description="AlertIOS的alert方法和Alert的方法使用及作用相同.此处展示prompt方法">
                        <AlertIOSExample/>
                    </TestBlock> : null}
            </TestPage>

        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 5,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#38ADFF',
        padding: 10,
        borderRadius: 5,
    },
    textColor: {
        color: 'white'
    }
});
module.exports = AlertExample;