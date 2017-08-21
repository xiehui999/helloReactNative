/**
 * 官方文档对应地址:
 * https://facebook.github.io/react-native/docs/animated.html
 *
 * Code4Android
 * 我的简书:http://www.jianshu.com/u/d5b531888b2b
 * 新浪微博:http://weibo.com/745687294
 * CSDN:http://blog.csdn.net/xiehuimx?viewmode=contents
 */
'use strict';
import React, {Component} from 'react';
import {
    Animated,
    View,
    StyleSheet,
    Text,
    Easing,
    TouchableOpacity
} from 'react-native';

class FadeInView extends Component {
    state = {
        fadeAnim: new Animated.Value(0), // opacity 0
    }

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 2000,
            },
        ).start();
    }

    render() {
        return (
            <Animated.View   // Special animatable View
                style={{
                    opacity: this.state.fadeAnim,  // Binds
                }}>
                {this.props.children}
            </Animated.View>
        )
    }
}

class FadeInExample extends Component {
    state = {
        show: true,
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={this._onPress}>
                    <Text>点击{this.state.show ? ' 隐藏' : '显示'}</Text>
                </TouchableOpacity>
                {this.state.show && <FadeInView>
                    <View style={styles.content}>
                        <Text>FadeInView</Text>
                    </View>
                </FadeInView>}
            </View>
        )
    }

    _onPress = () => {
        var currentShow = this.state.show;
        this.setState({show: !currentShow})
    }
}

/**
 * timing:
 * duration: 动画的持续时间（毫秒）。默认值为500.
 *easing: Easing function to define curve。默认值为Easing.inOut(Easing.ease).
 *delay: 开始动画前的延迟时间（毫秒）。默认为0.
 *useNativeDriver: 使用原生动画驱动。默认不启用(false)。
 * spring:
 *
 */
export const title = 'Animated - Examples';
export const description = 'Animated可以让我们更容易的实现动画，使动画更流畅更强大,提升用户体验';
export const examples = [
    {
        title: 'FadeInView',
        description: '显示时透明度0到1动画渐变',
        render() {
            return <FadeInExample/>
        }
    }, {
        title: 'spring效果',
        description: 'spring动画能定义一系列常量映射到一组有序的变换,每个变化可以指定一个转换的范围',
        render() {
            this.anim = this.anim || new Animated.Value(0);
            return (
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            Animated.spring(this.anim, {
                                toValue: 0,   // Returns to the start
                                velocity: 3,  // Velocity makes it move
                                tension: -10, // Slow
                                friction: 1,  // Oscillate a lot
                            }).start();
                        }}>
                        <Text>点击</Text>
                    </TouchableOpacity>
                    <Animated.View
                        style={[styles.content, {
                            transform: [   // Array order matters
                                {
                                    scale: this.anim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1, 4],
                                    })
                                },
                                {
                                    translateX: this.anim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 500],
                                    })
                                },
                                {
                                    rotate: this.anim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [
                                            '0deg', '360deg' // 'deg' or 'rad'
                                        ],
                                    })
                                },
                            ]
                        }
                        ]}>
                        <Text>Transforms!</Text>
                    </Animated.View>
                </View>
            )
        }
    }, {
        title: '复合动画',
        render() {
            this.anims = this.anims || [1, 2, 3].map(
                () => new Animated.Value(0)
            );
            return (
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            var timing = Animated.timing;
                            Animated.sequence([ // One after the other
                                timing(this.anims[0], {
                                    toValue: 200,
                                    easing: Easing.linear,
                                }),
                                Animated.delay(400), // Use with sequence
                                timing(this.anims[0], {
                                    toValue: 0,
                                    easing: Easing.elastic(2), // Springy
                                }),
                                Animated.delay(400),
                                Animated.stagger(200,
                                    this.anims.map((anim) => timing(
                                        anim, {toValue: 200}
                                    )).concat(
                                        this.anims.map((anim) => timing(
                                            anim, {toValue: 0}
                                        ))),
                                ),
                                Animated.delay(400),
                                Animated.parallel([
                                    Easing.inOut(Easing.quad), // Symmetric
                                    Easing.back(1.5),  // Goes backwards first
                                    Easing.ease        // Default bezier
                                ].map((easing, ii) => (
                                    timing(this.anims[ii], {
                                        toValue: 320, easing, duration: 3000,
                                    })
                                ))),
                                Animated.delay(400),
                                Animated.stagger(200,
                                    this.anims.map((anim) => timing(anim, {
                                        toValue: 0,
                                        easing: Easing.bounce, // Like a ball
                                        duration: 2000,
                                    })),
                                ),
                            ]).start();
                        }}>
                        <Text>点击</Text>
                    </TouchableOpacity>
                    {['Composite', 'Easing', 'Animations!'].map(
                        (text, ii) => (
                            <Animated.View
                                key={text}
                                style={[styles.content, {
                                    left: this.anims[ii]
                                }]}>
                                <Text>{text}</Text>
                            </Animated.View>
                        )
                    )}
                </View>
            )
        }
    }]
const styles = StyleSheet.create({
    content: {
        backgroundColor: 'deepskyblue',
        borderWidth: 1,
        borderColor: 'dodgerblue',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
});
