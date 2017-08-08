/**
 * 官方文档对应地址:https://facebook.github.io/react-native/docs/scrollview.html
 *
 * Code4Android
 * 我的简书:http://www.jianshu.com/u/d5b531888b2b
 * 新浪微博:http://weibo.com/745687294
 * CSDN:http://blog.csdn.net/xiehuimx?viewmode=contents
 */
'use strict'
import React, {Component} from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

const ITEMS_SIZE = 10;
//horizontal true表示水平排列,横向滑动,false为垂直排列
//contentContainerStyle:设置内层的内容容器样式，所有的子视图都会包裹在内容容器内
//keyboardDismissMode :用户拖拽滚动视图的时候，是否要隐藏软键盘
// none（默认值），拖拽时不隐藏软键盘。
//on-drag 当拖拽开始的时候隐藏软键盘。
//interactive 软键盘伴随拖拽操作同步地消失，并且如果往上滑动会恢复键盘。安卓设备上不支持这个选项，会表现的和none一样。
//keyboardShouldPersistTaps :当前界面有软键盘，那么点击scrollview后是否收起键盘，取决于本属性的设置
//scrollEnabled:bool是否允许滚动，默认true
//pagingEnabled:为true时，滚动条会停在滚动视图的尺寸的整数倍位置。这个可以用在水平分页上(将item宽度设置为width:Dimensions.get('window').width)
//onScroll:在滚动时调用,默认每一帧调用一次,(通过scrollEventThrottle可改变调用次数，但是只支持ios)
//scrollToEnd:(方法)滚动到最后，参数是animatedtrue表示有动画，false直接跳转
//scrollTo(方法)
//onMomentumScrollStart:滚动动画开始时调用此函数
//onMomentumScrollEnd:滚动动画结束时调用此函数
//showsVerticalScrollIndicator/showsHorizontalScrollIndicator 设置是否显示滚动条,默认true，如果想要隐藏设置false.
//endFillColor (android)
//flashScrollIndicators  (方法)显示滚动指示器
//scrollsToTop,默认true，点击状态栏滑动到顶部（ios）
class ScrollViewExample extends Component {
    static title = '<ScrollView>';
    static description = '允许子组件滚动的ScrollView';
    createItems = (size, styles): Array<any> => {
        var items = [];
        for (var i = 0; i < size; i++) {
            items[i] = (
                <TouchableOpacity
                    activeOpacity={0.5}
                    key={i} style={styles}>
                    <Text>{'item' + i}</Text>
                </TouchableOpacity>
            );
        }
        return items;
    }

    render() {
        var items = this.createItems(ITEMS_SIZE, styles.itemWrapper)
        items[5] = (
            <ScrollView
                key={'scrollView'}
                horizontal={true}>

                {this.createItems(ITEMS_SIZE, [styles.itemWrapper, styles.horizontalItemWrapper])}
            </ScrollView>
        )
        return (
            <ScrollView
                ref={(scrollView) => {
                    this._scrollView = scrollView;
                }}
                style={styles.verticalScrollView}
                onScroll={() => console.log('onScroll')}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={(event) => console.log('onContentSizeChange')}>
                <View>
                    <Text onPress={() => this._scrollView.scrollToEnd({animated: true})}>点击滚动到最后</Text>
                </View>
                {items}
                <View>
                    <Text onPress={() => this._scrollView.scrollTo({x: 0, y: 0, animated: true})}>点击滚动到开始处</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    verticalScrollView: {
        margin: 10,
    },
    itemWrapper: {
        backgroundColor: '#dddddd',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#a52a2a',
        padding: 30,
        margin: 5
    },
    horizontalItemWrapper: {
        padding: 50
    }
});
module.exports = ScrollViewExample;