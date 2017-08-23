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
    TouchableOpacity,
    LayoutAnimation,
    Slider,
    TouchableWithoutFeedback
} from 'react-native';

var AnimatedSlider = Animated.createAnimatedComponent(Slider);

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

class LoopExample extends Component {
    state = {
        value: new Animated.Value(0),
        progress: 0,
    };

    componentDidMount() {
        Animated.loop(
            Animated.timing(this.state.value, {
                toValue: 1,
                duration: 5000,
                useNativeDriver: true,
            }),
        ).start();
        this.state.value.addListener(e => this.setState({progress: e.value}));
    }

    componentWillUnmount() {
        this.state.value.removeAllListeners();
    }

    render() {
        return (
            <View>
                <Animated.View
                    style={[
                        styles.view,
                        {
                            opacity: this.state.value.interpolate({
                                inputRange: [0, 0.5, 1],
                                outputRange: [0, 1, 0],
                            }),
                        },
                    ]}
                />
                <Text>Value: {this.state.progress}</Text>
            </View>
        );
    }
}

class NativeAndJsAnimated extends Component {
    state = {
        native: new Animated.Value(0),
        js: new Animated.Value(0),
    }
    current = 0;

    render() {
        return (
            <TouchableWithoutFeedback onPress={this._onPress}>
                <View>
                    <View>
                        <Text>Native:</Text>
                    </View>
                    <View style={{padding: 10}}>
                        {this.props.children(this.state.native)}
                    </View>
                    <View>
                        <Text>JavaScript:</Text>
                    </View>
                    <View style={{padding: 10}}>
                        {this.props.children(this.state.js)}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _onPress = () => {
        const animConfig = this.current && this.props.reverseConfig ? this.props.reverseConfig : this.props.config;
        this.current = this.current ? 0 : 1;
        const config = {
            ...animConfig,
            toValue: this.current,
        }
        console.log(animConfig)
        console.log(config)
        Animated[this.props.type](this.state.native, {
            ...config,
            useNativeDriver: true,
        }).start();
        Animated[this.props.type](this.state.js, {
            ...config,
            useNativeDriver: false,
        }).start();
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
 * decay(value: AnimatedValue | AnimatedValueXY, config: DecayAnimationConfig:
 *Config:velocity: 初始速度。必填。deceleration: 衰减系数。默认值0.997,useNativeDriver: 使用原生动画驱动。默认不启用(false)。
 *
 *
 * 一些合成动画值:可以使用加减乘除以及取余运算吧两个动画值合成一个新的动画值
 *Animated.multiply:将两个动画值相乘计算
 * Animated.add()将两个动画值相加计算，得出一个新的动画值
 * Animated.divide()将两个动画值相除计算
 * Animated.modulo()将两个动画值做取模（取余数）计算
 *
 *delay(time: number)在指定的延迟之后开始动画
 *sequence(animations: Array<CompositeAnimation>)按顺序执行一个动画数组里的动画，等待一个完成后再执行下一个。如果当前的动画被中止，后面的动画则不会继续执行。
 * parallel(animations: Array<CompositeAnimation>, config?: ParallelConfig同时开始一个动画数组里的全部动画。默认情况下，如果有任何一个动画停止了，其余的也会被停止
 * stagger(time: number, animations: Array<CompositeAnimation>)一个动画数组，里面的动画有可能会同时执行（重叠），不过会以指定的延迟来开始。
 *
 *
 */
export const title = 'Animated - LayoutAnimation动画';
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
        title: 'translateX => Animated.decay',
        render: function () {
            return (
                <NativeAndJsAnimated
                    type="decay"
                    config={{velocity: 0.5}}
                    reverseConfig={{velocity: -0.5}}>
                    {anim => (
                        <Animated.View
                            style={[
                                styles.view,
                                {
                                    transform: [
                                        {
                                            translateX: anim,
                                        },
                                    ],
                                },
                            ]}
                        />
                    )}
                </NativeAndJsAnimated>
            );
        },
    }, {
        title: '循环loop(透明度),并添加监听',
        render() {
            return <LoopExample/>
        }
    }, {
        title: '旋转平移透明度',
        render() {
            return <NativeAndJsAnimated type="timing" config={{duration: 1000}}>
                {anim => (
                    <Animated.View
                        style={[styles.view, {
                            transform: [
                                {
                                    translateX: anim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 200],
                                    }),
                                }, {
                                    translateY: anim.interpolate({
                                        inputRange: [0, 0.5, 1],
                                        outputRange: [0, 50, 0],
                                    })
                                }, {
                                    rotate: anim.interpolate({
                                        inputRange: [0, 0.5, 1],
                                        outputRange: ['0deg', '90deg', '0deg'],
                                    }),
                                },
                            ],
                            opacity: Animated.multiply(
                                anim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 0]
                                }),
                                anim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.25, 1]
                                })
                            )
                        }]}
                    >

                    </Animated.View>
                )}

            </NativeAndJsAnimated>
        }
    }, {
        title: '使用createAnimatedComponent（Slider）',
        render() {
            return (
                <NativeAndJsAnimated type="timing" config={{duration: 1000}}>
                    {anim => <AnimatedSlider style={{}} value={anim}/>}
                </NativeAndJsAnimated>
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
    }, {
        title: 'LayoutAnimation动画',
        render() {
            return <AddOrRemoveAnimated/>
        }
    },
    {
        title: 'View切换时渐隐动画',
        render() {
            return <CrossFadeExample/>
        }
    }];

class AddOrRemoveAnimated extends Component {
    state = {
        views: []
    }

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    render() {
        const views = this.state.views.map((view, i) => <View key={i} style={styles.view}>
            <Text>{i}</Text>
        </View>);
        return (
            <View>
                <TouchableOpacity
                    onPress={this._onPressAddView}>
                    <View style={styles.content}>
                        <Text>添加一个View</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this._onPressRemoveView}>
                    <View style={styles.content}>
                        <Text>添加一个View</Text>
                    </View>
                </TouchableOpacity>
                <View style={[styles.flexWrap]}>
                    {views}
                </View>
            </View>
        );
    }

    _onPressAddView = () => {
        this.setState((state) => ({
            views: [...state.views, {}]
        }))
    };
    _onPressRemoveView = () => {
        //-1表示最后一个元素的位置slice（start,end）比包含end元素
        this.setState((state) => ({views: state.views.slice(0, -1)}))
    }
}

class CrossFadeExample extends Component {
    state = {
        toggled: true,
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this._onPressToggle}>
                    <View style={styles.content}>
                        <Text>切换</Text>
                    </View>
                </TouchableOpacity>
                {this.state.toggled ? <View style={styles.view}><Text>View1</Text></View> :
                    <View style={[styles.view, {backgroundColor: 'green'}]}><Text>View2</Text></View>}
            </View>
        )
    }

    _onPressToggle = () => {
        this.setState((state) => ({toggled: !state.toggled}))
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#38ADFF',
        padding: 10,
        margin: 10,
        borderRadius: 7,
        alignItems: 'center',
    },
    flexWrap: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    view: {
        height: 50,
        width: 56,
        backgroundColor: 'red',
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
