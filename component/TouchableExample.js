/**
 * 官方文档对应地址:
 * https://facebook.github.io/react-native/docs/touchablehighlight.html
 * https://facebook.github.io/react-native/docs/touchablenativefeedback.html
 *https://facebook.github.io/react-native/docs/touchableopacity.html
 * https://facebook.github.io/react-native/docs/touchablewithoutfeedback.html
 *
 *
 * Code4Android
 * 我的简书:http://www.jianshu.com/u/d5b531888b2b
 * 新浪微博:http://weibo.com/745687294
 * CSDN:http://blog.csdn.net/xiehuimx?viewmode=contents
 */
'use strict'
import React, {Component} from 'react'
import {
    Animated,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
    View,
    Platform
} from 'react-native'

var heartImage = {uri: 'https://facebook.github.io/react/img/logo_small_2x.png'};

export const description = '可触摸按压系列组件例子';
export const title = '<Touchable*>系列组件';
export const examples = [
    {
        title: '<TouchableHighlight>',
        description: '该组件只能有一个子视图，默认点击时子视图透明度降低，并显示底层黑色背景，也可以通过属性activeOpacity设置透明度，underlayColor设置底层颜色',
        render() {
            //activeOpacity :指定封装的视图在被触摸操作激活时以多少不透明度显示
            //onHideUnderlay:当底层的颜色被隐藏的时候调用
            //onShowUnderlay:当底层的颜色被显示的时候调用
            //underlayColor :有触摸操作时显示出来的底层的颜色
            return (
                <View style={[styles.row, {justifyContent: 'space-around'}]}>
                    <TouchableHighlight
                        style={styles.wrapper}
                        onPress={() => console.log('highlight image onPress')}>
                        <Image
                            source={heartImage}
                            style={styles.image}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.wrapper}
                        activityOpacity={1}
                        animationVelocity={0}
                        underlayColor="rgb(210, 230, 255)"
                        onPress={() => console.log(' highlight text onPress')}
                        onShowUnderlay={() => console.log('onShowUnderlay')}
                        onHideUnderlay={() => console.log('onHideUnderlay')}>
                        <View style={styles.wrapperCustom}>
                            <Text style={{fontSize: 16}}>是嵌套的text,有显示隐藏底层回调函数</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            )
        }
    },
]
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    icon: {
        width: 24,
        height: 24,
    },
    image: {
        width: 50,
        height: 50,
    },
    wrapper: {
        borderRadius: 8
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6,
    },
})