/**
 * Code4Android
 * 我的简书:http://www.jianshu.com/u/d5b531888b2b
 * 新浪微博:http://weibo.com/745687294
 * CSDN:http://blog.csdn.net/xiehuimx?viewmode=contents
 */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Vibration,
    Platform,
    DeviceEventEmitter
} from 'react-native';

class OrientationChangeExample extends Component {
    _orientationSubscription: EmitterSubscription;
    state = {
        currentOrientation: '',
        orientationDegrees: 0,
        isLandscape: false,
    }

    componentDidMount() {
        this._orientationSubscription = DeviceEventEmitter.addListener('namedOrientationDidChange', this._orientationChange)
    }

    _orientationChange = (orientation) => {
        this.setState({
            currentOrientation: orientation.name,
            orientationDegrees: orientation.rotationDegrees,
            isLandscape: orientation.isLandscape,
        })
    }

    componentWillUnmount() {
        this._orientationSubscription.remove();
    }

    render() {
        return <Text>当前方向：{this.state.currentOrientation} 角度：{this.state.orientationDegrees+'   '}
                  isLandscape:{this.state.isLandscape?'true':'false'}</Text>
    }
}

var pattern = Platform.OS === 'android' ? [0, 500, 200, 500, 200, 500, 200] : [0, 1000, 2000, 3000];
export const title = 'Vibration,DeviceEventEmitter';
export const description = '震动效果和使用DeviceEventEmitter监听手机屏幕';
export const examples = [
    {
        title: 'DeviceEventEmitter(翻转手机观察变化)',
        description: '使用该API的addListener函数监听屏幕方向.(namedOrientationDidChange)',
        render() {
            return <OrientationChangeExample/>
        }
    },
    {
        title: 'Vibration.vibrate()最基本使用',
        description: ' vibrate(pattern, repeat) pattern参数是一个数组，' +
        '在Android(需要在清单文件添加震动权限)上第一个元素表示第一次(开始)震动等待时间,然后是震动持续时间和等待下次震动时间交替.' +
        '如[0, 500, 1000, 500]表示立刻开始震动500ms，然后等待1000ms，再震动500ms,在iOS上，震动时间是固定的，' +
        '则第二个参数开始都表示震动的间隔时间.\n repeat:指定是否循环震动 \n cancel()取消震动',
        render() {
            return (
                <TouchableOpacity
                    onPress={() => Vibration.vibrate()}>
                    <View>
                        <Text style={styles.button}>点击震动</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }, {
        title: `Vibration.vibrate(${pattern})`,
        render() {
            return (
                <TouchableOpacity
                    onPress={() => Vibration.vibrate(pattern)}>
                    <View>
                        <Text style={styles.button}>点击震动一次</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }, {
        title: `Vibration.vibrate(${pattern})`,
        render() {
            return (
                <TouchableOpacity
                    onPress={() => Vibration.vibrate(pattern, true)}>
                    <View>
                        <Text style={styles.button}>循环震动</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }, {
        title: 'Vibration.cancel()',
        render() {
            return (
                <TouchableOpacity
                    onPress={() => Vibration.cancel()}>
                    <View>
                        <Text style={styles.button}>取消震动</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }]

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#38ADFF',
        padding: 7,
        borderRadius: 5,
        color: '#fff',
    }
})