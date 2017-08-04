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
    TouchableNativeFeedback,
    View,
    Platform
} from 'react-native'

var heartImage = {uri: 'https://facebook.github.io/react/img/logo_small_2x.png'};


class TouchableFeedbackEvents extends Component {
    state = {
        eventLog: []
    }
    _appendEvent = (eventName) => {
        var limit = 6;
        var eventLog = this.state.eventLog.slice(0, limit - 1);
        //unshift在数组头部添加一个元素
        var tempName = eventName
        if (eventName === 'pressIn' && this.props.delayPressIn !== undefined) {
            tempName = eventName + '--' + this.props.delayPressIn + 'ms 延迟';
        } else if (eventName === 'pressOut' && this.props.delayPressOut !== undefined) {
            tempName = eventName + '--' + this.props.delayPressOut + 'ms 延迟';
        } else if (eventName === 'longPress' && this.props.delayLongPress !== undefined) {
            tempName = eventName + '--' + this.props.delayLongPress + 'ms 延迟';
        }
        eventLog.unshift(tempName);
        this.setState({eventLog});
    }

    render() {
        return (
            <View>
                <View style={[styles.row, {justifyContent: 'center'}]}>
                    <TouchableOpacity
                        style={[styles.wrapper]}
                        activeOpacity={0.4}
                        {...this.props}
                        onPress={() => this._appendEvent('press')}
                        onPressIn={() => this._appendEvent('pressIn')}
                        onPressOut={() => this._appendEvent('pressOut')}
                        onLongPress={() => this._appendEvent('longPress')}>
                        <Text style={styles.button}>{this.props.buttonText}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.eventLogBox}>
                    {this.state.eventLog.map((e, ii) => <Text key={ii}>{e}</Text>)}
                </View>
            </View>
        )
    }
}

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
    {
        title: '触摸有动画效果',
        description: '支持单独的view作为子节点，利用原生来渲染触摸反馈(Android5.0 MD效果)',
        platform: 'android',
        render() {
            //TouchableNativeFeedback子节点必须是View，否则没有效果.我用Text,Image做字视图没点击反馈效果,onPress可以回调
            //useForeground:6.0及以上版本有效
            //background:设置反馈的背景类型,值如下
            //TouchableNativeFeedback.SelectableBackground()安卓主题默认的对于被选中对象的背景。(?android:attr/selectableItemBackground)
            //TouchableNativeFeedback.SelectableBackgroundBorderless() 安卓主题默认的对于被选中的无边框对象的背景。(?android:attr/selectableItemBackgroundBorderless)>21
            //TouchableNativeFeedback.Ripple(color, borderless) >21按下时涟漪效果,第一个参数为颜色，设置涟漪颜色，第二个参数设置涟漪是否扩展到视图之外
            const mScale = new Animated.Value(1);
            Animated.timing(mScale, {toValue: 0.3, duration: 1000}).start;
            const style = {
                backgroundColor: '#38adff',
                width: 200,
                height: 50,
                transform: [{scale: mScale}]
            }
            return (
                <View>
                    <TouchableNativeFeedback
                        onPress={() => console.log('onPress')}
                    >
                        <View style={{width: 200, height: 50, backgroundColor: '#38adff', marginBottom: 15}}>
                            <Text>点击我试试</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <View>
                        <Text>下面使用了background属性</Text>
                    </View>
                    <TouchableNativeFeedback
                        onPress={() => console.log('onPress')}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={{width: 200, height: 50, backgroundColor: '#38adff', marginBottom: 15}}>
                            <Text>SelectableBackground()有边框</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={() => console.log('onPress')}
                        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>
                        <View style={{width: 200, height: 50, backgroundColor: '#38adff', marginBottom: 15}}>
                            <Text>SelectableBackgroundBorderless()无边框</Text>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback
                        onPress={() => console.log('onPress')}
                        useForeground={true}
                        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>
                        <View style={{width: 200, height: 50, backgroundColor: '#38adff', marginBottom: 15}}>
                            <Text>useForeground设置了true,将使用父视图背景色</Text>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback
                        onPress={() => console.log('onPress')}
                        background={TouchableNativeFeedback.Ripple('#ff0000', false)}>
                        <Animated.View style={style}>
                            <Text>Ripple</Text>
                        </Animated.View>
                    </TouchableNativeFeedback>
                </View>
            )
        }
    },
    {
        title: '触摸事件',
        description: '<Touchable*>组件有属性onPress,onPressIn,onPressOut,onLongPress监听触摸响应回调',
        render() {
            return <TouchableFeedbackEvents
                buttonText="点击我查看事件回调"
            />
        }
    },
    {
        title: '设置触摸事件的延迟时间',
        description: 'delayPressIn,delayPressOut,delayLongPresss属性，指定对应事件延迟调用时间',
        render() {
            return <TouchableFeedbackEvents
                buttonText="点击我观察事件延迟时间"
                delayPressIn={400}
                delayPressOut={1000}
                delayLongPress={800}
            />
        }
    },
    {
        title: '设置disabled为true',
        render() {
            return (
                <View>
                    <TouchableOpacity disabled={true} style={[styles.row, {padding: 10}]}>
                        <Text style={styles.disabledButton}>Disabled TouchableOpacity</Text>
                    </TouchableOpacity>
                    <TouchableHighlight
                        activeOpacity={1}
                        disabled={true}
                        animationVelocity={0}
                        underlayColor="rgb(210, 230, 255)"
                        style={[styles.row, {padding: 10}]}
                        onPress={() => console.log('clicked')}>
                        <Text style={styles.disabledButton}>
                            Disabled TouchableHighlight
                        </Text>
                    </TouchableHighlight>
                    {Platform.OS === 'android' &&
                    <TouchableNativeFeedback
                        disabled={true}
                        onPress={() => console.log('clicked')}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={[styles.row, {padding: 10}]}>
                            <Text style={[styles.disabledButton, {padding: 10}]}>
                                Disabled TouchableNativeFeedback
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                    }
                </View>
            )
        }
    }

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
    eventLogBox: {
        padding: 10,
        margin: 10,
        height: 120,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#f0f0f0',
        backgroundColor: '#f9f9f9',
    },
    button: {
        color: '#007AFF',
    },
    disabledButton: {
        color: '#007AFF',
        opacity: 0.5,
    },
})