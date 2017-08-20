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
    Text,
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
    static defaultProps = {
        indicator: '',
    }
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
//onPageScroll:当在页间切换时（不论是由于动画还是由于用户在页间滑动/拖拽）执行,event.nativeEvent中当前页数position（0开始）offset：偏移量
//onPageSelected:滚动到新页面成功回调
//onPageScrollStateChanged:页面滑动状态变化时调用此回调函数，idle：空闲，dragging ：正在拖动 settling:处理中
//scrollEnabled 是否能滚动
class ViewPagerAndroidExample extends Component {
    static title = '<ViewPagerAndroid>';
    static description = '一个允许字视图左右翻转滑动的组件.';
    state = {
        page: 0,
        animationsAreEnabled: true,
        scrollEnabled: true,
        progress: {
            position: 0,
            offset: 0,
        }
    }
    _onPageScroll = (e) => {
        console.log(e.nativeEvent)
        this.setState({progress: e.nativeEvent})
    }
    _onPageSelected = (e) => {
        console.log('_onPageSelected')
        this.setState({page: e.nativeEvent.position});
    }
    _onPageScrollStateChanged = (state: ViewPagerScrollState) => {
        console.log('_onPageScrollStateChanged')
        this.setState({scrollState: state});
    };

    render() {
        var pages = []
        var style={
            backgroundColor:BGCOLOR[this.state.page % BGCOLOR.length]
        }
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
        return (
            <View style={styles.container}>
                <ViewPagerAndroid
                    style={styles.viewPager}
                    scrollEnabled={this.state.scrollEnabled}
                    initialPage={0}
                    ref={(viewPage) => {
                        this.viewPage = viewPage;
                    }}
                    onPageScroll={this._onPageScroll}
                    onPageSelected={this._onPageSelected}
                    onPageScrollStateChanged={this._onPageScrollStateChanged}
                    pageMargin={10}>
                    {pages}
                </ViewPagerAndroid>
                <Text style={[style,{textAlign: 'center'}]}>{this.state.page+1}/{pages.length}</Text>

                <View>
                    <Text>当前状态：{this.state.scrollState + '   '}
                        offset: {this.state.progress.offset.toFixed(6) + ' position:' + this.state.progress.position}</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => this.setState({scrollEnabled: !this.state.scrollEnabled})}
                        style={styles.button}>
                        <Text
                            style={styles.buttonText}> {this.state.scrollEnabled ? '当前可滚动翻页，点击设置禁用' : '当前不可滚动,设置启用'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => this.setState({animationsAreEnabled: !this.state.animationsAreEnabled})}
                        style={styles.button}>
                        <Text
                            style={styles.buttonText}>{this.state.animationsAreEnabled ? '当前页面跳转有动画,点击设置无动画' : '当前页面跳转无动画,点击设置有动画'}</Text>
                    </TouchableOpacity>
                    <View style={{
                        flexDirection: 'row',
                        marginHorizontal: 20,
                        marginVertical: 10,
                        justifyContent: 'space-between'
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => this._onPress(-1)}
                            style={[styles.button, {width: '40%', marginHorizontal: 0, alignItems: 'center'}]}>
                            <Text style={styles.buttonText}>上一页</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => this._onPress(1)}
                            style={[styles.button, {width: '40%', marginHorizontal: 0, alignItems: 'center'}]}>
                            <Text style={styles.buttonText}>下一页</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    _onPress = (offset) => {

        var goPage = (this.state.page + offset + PAGES) % PAGES
        if (this.state.animationsAreEnabled) {
            this.viewPage.setPage(goPage)
        } else {
            this.viewPage.setPageWithoutAnimation(goPage)
        }
        this.setState({page: goPage})
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2196f3',
        borderRadius: 5,
        marginHorizontal: 20,
        marginTop: 10,
        padding: 10,
    },
    buttonText: {
        color: 'white',
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
    viewPager: {
        flex: 1,
    },
});

module.exports = ViewPagerAndroidExample;
