
/**
 * 官方文档对应地址:https://facebook.github.io/react-native/docs/flatlist.html
 *
 * Code4Android
 * 我的简书:http://www.jianshu.com/u/d5b531888b2b
 * 新浪微博:http://weibo.com/745687294
 * CSDN:http://blog.csdn.net/xiehuimx?viewmode=contents
 */
'use strict'
import React, {PureComponent} from 'react';
import {
    Animated,
    FlatList,
    StyleSheet,
    View,
    Alert
} from 'react-native';
import TestPage from './TestPage'
import {
    FooterComponent,
    HeaderComponent,
    ItemComponent, ItemSeparatorComponent,
    PlainInput,
    SeparatorComponent,
    Spindicator,
    genItemData,
    getItemLayout,
    pressItem,
    renderSmallSwitchOption
} from './ListExampleShared'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

//numColumns:设置列数
//onEndReached:滑动到底部调用
//horizontal:设置垂直还是水平.不写时垂直
//ItemSeparatorComponent:定义item分隔
//ListHeaderComponent头
//ListFooterComponent尾
//legacyImplementation:设置为true则使用旧的ListView实现
class FlatListExample extends PureComponent {
    static title = '<FlatList>';
    static description = '高性能可滚动的数据列表.';
    state = {
        data: genItemData(20),
        horizontal: false,
        filterText: '',
        fixedHeight: true
    }
    _scrollPos = new Animated.Value(0);

    render() {
        const filterRegex = new RegExp(String(this.state.filterText), 'i');
        const filter = (item) => {
            return filterRegex.test(item.text) || filterRegex.test(item.title)
        }
        const filteredData = this.state.data.filter(filter);
        console.log(this.state)
        console.log(filteredData)
        return (
            <TestPage noSpacer={true} noScroll={true}>
                <View style={styles.container}>
                    <View style={styles.searchRow}>
                        <View style={styles.options}>
                            <PlainInput
                                onChangeText={this._onChangeFilterText}
                                placeholder="搜索..."
                                value={this.state.filterText}/>
                            <PlainInput
                                onChangeText={this._onChangeScrollToIndex}
                                placeholder="输入滑动目标位置"/>
                        </View>
                        <View style={styles.options}>
                            {renderSmallSwitchOption(this, 'horizontal')}
                            {renderSmallSwitchOption(this, 'fixedHeight')}
                            <Spindicator value={this._scrollPos}/>
                        </View>
                    </View>
                    <SeparatorComponent/>
                    <AnimatedFlatList
                        ref={(ref) => this._listRef = ref}
                        renderItem={this._renderItemComponent}
                        horizontal={this.state.horizontal}
                        data={filteredData}
                        ItemSeparatorComponent={ItemSeparatorComponent}
                        ListHeaderComponent={HeaderComponent}
                        ListFooterComponent={FooterComponent}
                        refreshing={false}
                        onRefresh={() => Alert.alert("执行了刷新")}
                        numColumns={1}
                        onEndReached={this._onEndReached}
                        keyboardDismissMode="on-drag"
                        contentContainerStyle={styles.list}
                    />
                </View>
            </TestPage>
        )
    }

//keyboardDismissMode="on-drag"当拖拽时隐藏软键盘
    //滑动到底部时触发
    _onEndReached = () => {
        if (this.state.data.length >= 200) {
            return;
        }
        this.setState((state) => ({
            data: state.data.concat(genItemData(20, state.data.length))
        }))
    }
    _renderItemComponent = ({item, separators}) => {
        return (
            <ItemComponent
                item={item}
                onPress={(key) => {
                    this._listRef.getNode().recordInteraction();
                    pressItem(this, key);
                }}
                horizontal={this.state.horizontal}
                fixedHeight={this.state.fixedHeight}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}
            />
        );
    };
    _onChangeFilterText = (text) => {
        this.setState({
            filterText: text,
        })
    };
    _onChangeScrollToIndex = (text) => {
        const position = Number(text);
        if (isNaN(position) || position>=this.state.data.length-1  ) {
            return;
        }
        this._listRef.getNode().scrollToIndex({viewPosition: 0.5, index: Number(text)})
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E9EAED',
        flex: 1,
    },
    list: {
        backgroundColor: 'white',
    },
    options: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    searchRow: {
        paddingHorizontal: 10,
    },
})

module.exports = FlatListExample;