/**
 * 官方文档对应地址:https://facebook.github.io/react-native/docs/viewpagerandroid.html
 *
 * Code4Android
 * 我的简书:http://www.jianshu.com/u/d5b531888b2b
 * 新浪微博:http://weibo.com/745687294
 * CSDN:http://blog.csdn.net/xiehuimx?viewmode=contents
 */
'use strict'
import React, {Component} from 'react'
import {
    Image,
    StyleSheet,
    Button,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,
    ViewPagerAndroid,
} from 'react-native'
import type {ViewPagerScrollState} from 'ViewPagerAndroid';

const PAGES = 5;
const BGCOLOR = ['#fdc08e', '#fff6b9', '#99d1b7', '#dde5fe', '#f79273'];
const IMAGE_URIS = [
    require('./Thumbnails/cat.png'),
    require('./Thumbnails/monkey.png'),
    require('./Thumbnails/rabbit.png'),
    require('./Thumbnails/tiger.png'),
    require('./Thumbnails/duck.png'),
];

class CustomCount extends Component {
    state = {
        count: 1,
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this.setState({count: this.state.count + 1})}
                    style={{backgroundColor: '#38adff', borderRadius: 5, marginTop: 20, padding: 10}}
                >
                    <Text>我是可点击的 {this.state.count}</Text>
                </TouchableOpacity>
            </View>)
    }
}
//pageMargin:设置每两页间距
//initialPage：初始化显示的页数(从0开始)。默认显示第一页(0)
class ViewPagerAndroidExample extends Component {
    static title = '<ViewPagerAndroid>';
    static description = '一个允许字视图左右翻转滑动的组件.';
    state = {
        page: 0,
        animationsAreEnabled: true,
        scrollEnabled:true,
    }

    render() {
        var pages = [];
        for (var i = 0; i < PAGES; i++) {
            var pageStyle = {
                backgroundColor: BGCOLOR[i % BGCOLOR.length],
                alignItems: 'center',
                padding: 20,
            }
            pages.push(
                <View key={i} style={pageStyle} collapsable={false}>
                    <Image
                        style={styles.image}
                        resizeMode={Image.resizeMode.contain}
                        source={IMAGE_URIS[i % BGCOLOR.length]}
                    />
                    <CustomCount/>
                </View>
            )
        }
        var {page, animationsAreEnabled} = this.state;
        return (
            <View style={styles.container}>
                <ViewPagerAndroid
                    style={styles.viewPager}
                    scrollEnabled={this.state.scrollEnabled}
                    initialPage={0}
                    pageMargin={10}
                >
                    {pages}
                </ViewPagerAndroid>
                <View>
                    <Button
                        title={this.state.scrollEnabled ? 'Scroll Enabled' : 'Scroll Disabled'}
                        onPress={()=>this.setState({scrollEnabled:!this.state.scrollEnabled})}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        height: 30,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        width: 0,
        margin: 5,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'gray',
    },
    buttonDisabled: {
        backgroundColor: 'black',
        opacity: 0.5,
    },
    buttonText: {
        color: 'white',
    },
    scrollStateText: {
        color: '#99d1b7',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: 300,
        height: 200,
        padding: 20,
    },
    progressBarContainer: {
        height: 10,
        margin: 10,
        borderColor: '#eeeeee',
        borderWidth: 2,
    },
    progressBar: {
        alignSelf: 'flex-start',
        flex: 1,
        backgroundColor: '#eeeeee',
    },
    viewPager: {
        flex: 1,
    },
});

module.exports = ViewPagerAndroidExample;
