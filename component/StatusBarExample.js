/**
 * 官方文档对应地址:https://facebook.github.io/react-native/docs/statusbar.html
 *
 * Code4Android
 * 我的简书:http://www.jianshu.com/u/d5b531888b2b
 * 新浪微博:http://weibo.com/745687294
 * CSDN:http://blog.csdn.net/xiehuimx?viewmode=contents
 */
'use strict'
import React, {Component} from 'react'
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native'


const colors = [
    '#38adff',
    '#ff0000',
    '#00ff00',
    '#0000ff',
];
//StatusBarStyle:状态栏样式
// default - 默认的样式（IOS为白底黑字、Android为黑底白字）
//light-content - 黑底白字
//dark-content - 白底黑字
const barStyles = [
    'default',
    'light-content',
    'dark-content'
];
//StatusBarAnimation:状态栏动画
//none - 没有动画
//fade - 渐变效果
//slide - 滑动效果
const showHideTransitions = [
    'fade',
    'slide',
];
const getValue = (values: Array<T>, index: number): T => {
    return values[index % values.length]
}

class StatusBarHiddenExample extends Component {
    state = {
        animated: true,
        hidden: false,
        showHideTransitions: getValue(showHideTransitions, 0)
    }
    _showHideTransitionIndex = 0;
    _onChangeAnimated = () => {
        this.setState({animated: !this.state.animated});
    };
    _onChangeHidden = () => {
        this.setState({hidden: !this.state.hidden});
    };
    _onChangeTransition = () => {
        this._showHideTransitionIndex++;
        this.setState({
            showHideTransition: getValue(showHideTransitions, this._showHideTransitionIndex),
        });
    };
    //hidden：状态栏是否隐藏
    //showHideTranstion:状态栏动画(ios)
    //animated：是否显示动画
    render() {
        return (
            <View>
                <StatusBar
                    hidden={this.state.hidden}
                    showHideTranstion={this.state.showHideTransitions}
                    animated={this.state.animated}
                />
                <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor="#1e966c"
                    style={styles.wrapper}
                    onPress={this._onChangeHidden}>
                    <View>
                        <Text>状态栏是否隐藏:{this.state.hidden ? 'true' : 'false'}</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor="#1e966c"
                    style={styles.wrapper}
                    onPress={this._onChangeTransition}>
                    <View style={styles.button}>
                        <Text>showHideTransition (ios
                            only):{getValue(showHideTransitions, this._showHideTransitionIndex)}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

//barStyle:设置状态栏样式，官方文档中没说明只能ios使用，官方demo中有限制ios平台。测试android无效果
class StatusBarStyleExample extends Component {
    _barStyleIndex = 0;

    _onChangeBarStyle = () => {
        this._barStyleIndex++;
        this.setState({barStyle: getValue(barStyles, this._barStyleIndex)});
    };

    _onChangeAnimated = () => {
        this.setState({animated: !this.state.animated});
    };

    state = {
        animated: true,
        barStyle: getValue(barStyles, this._barStyleIndex),
    };

    render() {
        return (
            <View>
                <StatusBar
                    animated={this.state.animated}
                    barStyle={this.state.barStyle}
                />
                <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor="#1e966c"
                    style={styles.wrapper}
                    onPress={this._onChangeBarStyle}>
                    <View style={styles.button}>
                        <Text>样式: '{getValue(barStyles, this._barStyleIndex)}'</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor="#1e966c"
                    style={styles.wrapper}
                    onPress={this._onChangeAnimated}>
                    <View style={styles.button}>
                        <Text>是否有动画: {this.state.animated ? 'true' : 'false'}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

//networkActivityIndicatorVisible网络活动指示器是否显示(ios)
class StatusBarNetworkActivityExample extends React.Component {
    state = {
        networkActivityIndicatorVisible: false,
    };

    _onChangeNetworkIndicatorVisible = () => {
        this.setState({
            networkActivityIndicatorVisible: !this.state.networkActivityIndicatorVisible,
        });
    };

    render() {
        return (
            <View>
                <StatusBar
                    networkActivityIndicatorVisible={this.state.networkActivityIndicatorVisible}
                />
                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={this._onChangeNetworkIndicatorVisible}>
                    <View style={styles.button}>
                        <Text>
                            网络活动指示器是否显示:
                            {this.state.networkActivityIndicatorVisible ? 'true' : 'false'}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}
//backgroundColor:状态栏背景色,
//translucent:指定状态栏是否透明。设置为true时，
// 应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用
class StatusBarBackgroundColorExample extends Component {
    state = {
        animated: true,
        translucent: false,
        backgroundColor: getValue(colors, 0),
    };
    _colorIndex = 0;
    _onChangeBackgroundColor = () => {
        this._colorIndex++;
        this.setState({backgroundColor: getValue(colors, this._colorIndex)});
    };
    _onChangeAnimated = () => {
        this.setState({animated: !this.state.animated});
    };
    _onChangeTranslucent = () => {
        this.setState({
            translucent: !this.state.translucent,
        });
    };
    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor={this.state.backgroundColor}
                    animated={this.state.animated}
                    translucent={this.state.translucent}
                />
                <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor="#1e966c"
                    style={styles.wrapper}
                    onPress={this._onChangeBackgroundColor}>
                    <View style={styles.button}>
                        <Text>背景色: '{getValue(colors, this._colorIndex)}'</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor="#1e966c"
                    style={styles.wrapper}
                    onPress={this._onChangeAnimated}>
                    <View style={styles.button}>
                        <Text>是否有动画: {this.state.animated ? 'true' : 'false'}</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={this._onChangeTranslucent}>
                    <View style={styles.button}>
                        <Text>是否透明: {this.state.translucent ? 'true' : 'false'}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}
class  StatusBarStaticAndroidExample extends Component{
    render() {
        return (
            <View>
                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={() => {
                        StatusBar.setHidden(true);
                    }}>
                    <View style={styles.button}>
                        <Text>setHidden(true)</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={() => {
                        StatusBar.setHidden(false);
                    }}>
                    <View style={styles.button}>
                        <Text>setHidden(false)</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={() => {
                        StatusBar.setBackgroundColor('#ff00ff', true);
                    }}>
                    <View style={styles.button}>
                        <Text>setBackgroundColor('#ff00ff', true)</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={() => {
                        StatusBar.setBackgroundColor('#00ff00', true);
                    }}>
                    <View style={styles.button}>
                        <Text>setBackgroundColor('#00ff00', true)</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={() => {
                        StatusBar.setTranslucent(true);
                        StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.4)', true);
                    }}>
                    <View style={styles.button}>
                        <Text>setTranslucent(true) and setBackgroundColor('rgba(0, 0, 0, 0.4)', true)</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={() => {
                        //设置状态栏是否透明
                        StatusBar.setTranslucent(false);
                        //设置状态栏背景色
                        StatusBar.setBackgroundColor('black', true);
                    }}>
                    <View style={styles.button}>
                        <Text>setTranslucent(false) and setBackgroundColor('black', true)</Text>
                    </View>
                </TouchableHighlight>
                <View>
                    <Text>Height (Android only): {StatusBar.currentHeight} pts</Text>
                </View>
            </View>
        );
    }
}
class StatusBarStaticIOSExample extends React.Component {
    render() {
        return (
            <View>
                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={() => {
                        StatusBar.setHidden(true, 'slide');
                    }}>
                    <View style={styles.button}>
                        <Text>setHidden(true, 'slide')</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={() => {
                        //显示／隐藏状态栏(是否隐藏状态栏,状态栏显示状态的动画过渡效果)
                        StatusBar.setHidden(false, 'fade');
                    }}>
                    <View style={styles.button}>
                        <Text>setHidden(false, 'fade')</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={() => {
                        //设置状态栏样式，(参数（将要设置的状态栏样式，改变状态栏显示状态的动画过渡效果）)，对应属性barStyle,nimated
                        StatusBar.setBarStyle('default', true);
                    }}>
                    <View style={styles.button}>
                        <Text>setBarStyle('default', true)</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={() => {
                        StatusBar.setBarStyle('light-content', true);
                    }}>
                    <View style={styles.button}>
                        <Text>setBarStyle('light-content', true)</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={() => {
                        //
                        StatusBar.setNetworkActivityIndicatorVisible(true);
                    }}>
                    <View style={styles.button}>
                        <Text>setNetworkActivityIndicatorVisible(true)</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={() => {
                        StatusBar.setNetworkActivityIndicatorVisible(false);
                    }}>
                    <View style={styles.button}>
                        <Text>setNetworkActivityIndicatorVisible(false)</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}
export const framework = 'React';
export const title = '<StatusBar>';
export const description = 'status bar组件';
export const examples = [
    {
        title: '状态栏隐藏',
        render() {
            return <StatusBarHiddenExample/>
        }
    },
    {
        title: '状态栏样式',
        render() {
            return <StatusBarStyleExample/>
        },
        platform: 'ios'
    },
    {
        title: '状态栏网络活动指示器',
        render() {
            return <StatusBarNetworkActivityExample/>
        },
        platform: 'ios'
    },
    {
        title: '状态栏背景色',
        render() {
            return <StatusBarBackgroundColorExample/>;
        },
        platform: 'android',
    },
    {
        title: '状态栏API使用',
        render() {
            return <StatusBarStaticIOSExample/>;
        },
        platform: 'ios',
    },

    {
        title: '状态栏API使用',
        render() {
            return <StatusBarStaticAndroidExample/>;
        },
        platform: 'android',
    }

]

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 5,
        marginBottom: 5,
    },
    button: {
        borderRadius: 5,
        backgroundColor: '#cccccc',
        padding: 10,
    },
    title: {
        marginTop: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    }
});