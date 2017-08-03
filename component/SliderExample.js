/**
 * 官方文档对应地址:https://facebook.github.io/react-native/docs/slider.html
 *
 * Code4Android
 * 我的简书:http://www.jianshu.com/u/d5b531888b2b
 * 新浪微博:http://weibo.com/745687294
 * CSDN:http://blog.csdn.net/xiehuimx?viewmode=contents
 */
'use strict'
import React, {Component} from 'react'
import {
    Slider,
    Text,
    StyleSheet,
    View
} from 'react-native'

class SliderDefault extends Component {
    static  defaultProps = {
        value: 0
    }

    constructor(props) {
        super(props)
        this.state = {value: props.value}
    }

    //toFixed用于舍入一个数字数参数为保留的小数位数
    render() {
        return (
            <View>
                <Text style={styles.text}>
                    {this.state.value.toFixed(3)}
                </Text>
                <Slider
                    {...this.props}
                    onValueChange={(value) => this.setState({value: value})}
                />
            </View>
        )
    }
}

class SlidingCompleteExample extends Component {
    state = {
        slideCompleteCount: 0,
        slideCompleteValue: 0,
    }

    render() {
        return (
            <View>
                <SliderDefault
                    {...this.props}
                    onSlidingComplete={(value) => this.setState({
                        slideCompleteCount: this.state.slideCompleteCount + 1,
                        slideCompleteValue: value,
                    })}
                />
                <Text>
                    滑动次数:{this.state.slideCompleteCount} value值:{this.state.slideCompleteValue}
                </Text>
            </View>
        )
    }
}

export const title = '<Slider>';
export const displayName = 'SliderExample';
export const description = '滑块组件';
export const examples = [
    {
        title: '默认的设置',
        render() {
            return <View>
                <Text> onValueChange当拖动时函数回调，并有一个参数表示滑块当时的值,默认情况下0-1之间的值,下面对值进行保留三位小数</Text>
                <SliderDefault/>
            </View>
        }
    },
    {
        title: '给定初始值为0.5',
        render() {
            return <SliderDefault value={0.5}/>
        }
    },
    {
        title: '设置滑块的最小值和最大值(最小minimumValue-1,最大maximumValue2)',
        render() {
            return <View>
                <SliderDefault
                    minimumValue={-1}
                    value={1}
                    maximumValue={2}/>
            </View>

        }
    },
    {
        title: '设置step：0.25,当拖动距离大于0.25时才会触发更新,值应该在0-（maximumValue-minimumValue）之间',
        render() {
            return <SliderDefault step={0.25}/>
        }
    },
    {
        title: 'onSlidingComplete回调,每次滑动松手后回调',
        render() {
            return <SlidingCompleteExample/>
        }
    },
    {
        title: '设置滑块滑过(minimumTrackTintColor)和未滑过(maximumTrackTintColor)颜色',
        render() {
            return (
                <SliderDefault
                    minimumTrackTintColor={'blue'}
                    maximumTrackTintColor={'red'}
                    value={0.5}
                />
            )
        }
    },
    {
        title: '定义滑块颜色',
        platform: 'android',
        render() {
            return <SliderDefault thumbTintColor={'blue'}/>;
        }
    },
    {
        title: '给滑块设置一张图片',
        platform: 'ios',
        render() {
            return <SliderDefault thumbImage={require('./file/uie_thumb_big.png')}/>;
        }
    },
    {
        title: '给轨道设置一张背景图。只支持静态图片。图片最中央的像素会被平铺直至填满轨道',
        platform: 'ios',
        render() {
            return <SliderDefault trackImage={require('./file/slider.png')}/>;
        }
    },
    {
        title: '指定一个滑块左侧(minimumTrackImage)和右侧(maximumTrackImage)轨道背景图',
        platform: 'ios',
        render() {
            return <SliderDefault
                minimumTrackImage={require('./file/slider-left.png')}
                maximumTrackImage={require('./file/slider-right.png')}/>;
        }
    }
]

const styles = StyleSheet.create({
    slider: {
        height: 10,
        margin: 10,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
        margin: 10,
    }
})