import React, {Component} from 'react'
import {
    Alert,
    Animated,
    Button,
    SectionList,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    HeaderComponent,
    FooterComponent,
    ItemComponent,
    PlainInput,
    SeparatorComponent,
    Spindicator,
    genItemData,
    pressItem,
    renderStackedItem,
} from './ListExampleShared'
import TestPage from './TestPage'

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
const renderSectionHeader = (section) => {
    console.log(section.section)
    return <View style={styles.header}>
        <Text style={styles.headerText}>SECTION HEADER:{section.section.key}</Text>
        <SeparatorComponent/>
    </View>
}
const renderSectionFooter = (section) => {
    return <View style={styles.header}>
        <Text style={styles.headerText}>SECTION Footer:{section.section.key}</Text>
        <SeparatorComponent/>
    </View>
}
const CustomSeparatorComponent = ({highlighted, text}) => {
    return <View style={[styles.customSeparator, highlighted && {backgroundColor: 'rgb(217, 217, 217)'}]}>
        <Text style={styles.separatorText}>{text}</Text>
    </View>
}
//ItemSeparatorComponent:item之间的分割线
//ListEmptyComponent:数据为空时显示内容
//ListFooterComponent:设置尾部组件
//ListHeaderComponent:头部
//SectionSeparatorComponent:section分割线
//initialNumToRender:初始化渲染数据数量
//onEndReached:列表不足底部onEndReachedThreshol距离
//onViewableItemsChanged:可见行发生变化。viewabilityconfig
//viewabilityconfig
class SectionListExample extends Component {
    static title = '<SectionList>';
    static description = '高性能可滚动的数据列表';
    state = {
        data: genItemData(120),
        filter: false,
        filterText: '',
    }
    _scrollPos = new Animated.Value(0);
    _scrollSinkY = Animated.event(
        [{nativeEvent: {contentOffset: {y: this._scrollPos}}}],
        {useNativeDriver: true});
    _sectionListRef: any;
    _captureRef = (ref) => {
        this._sectionListRef = ref
    };
    _scrollToLocation = (sectionIndex, itemIndex) => {
        this._sectionListRef.getNode().scrollToLocation({sectionIndex, itemIndex})
    }

    render() {
        //i （忽略大小写） g （全文查找出现的所有 pattern）
        const filterRegex = new RegExp(String(this.state.filterText), 'i')
        const filter = (item) => (
            filterRegex.test(item.text) || filterRegex.test(item.title)
        )
        const filteredData = this.state.data.filter(filter);
        const filteredSectionData = [];
        let startIndex = 0;
        const endIndex = filteredData.length - 1;
        for (let ii = 10; ii <= endIndex + 10; ii += 10) {
            filteredSectionData.push({
                key: `${filteredData[startIndex].key} - ${filteredData[Math.min(ii - 1, endIndex)].key}`,
                data: filteredData.slice(startIndex, ii),
            });
            startIndex = ii;
        }
        console.log(filteredSectionData)
        return (

            <TestPage
                noScroll={true}
                noSpacer={true}>
                <View style={styles.searchRow}>
                    <PlainInput
                        onChangeText={filterText => {
                            this.setState({filterText})
                        }}
                        placeholder="搜索..."
                        value={this.state.filterText}/>
                    <View style={styles.scrollToRow}>
                        <Text>scroll to:</Text>
                        <Button title="Item A" onPress={() => this._scrollToLocation(2, 1)}/>
                        <Button title="Item B" onPress={() => this._scrollToLocation(3, 6)}/>
                        <Button title="Item C" onPress={() => this._scrollToLocation(6, 3)}/>
                        <Spindicator value={this._scrollPos}/>
                    </View>
                </View>
                <SeparatorComponent/>
                <AnimatedSectionList
                    ref={this._captureRef}
                    initialNumToRender={20}
                    ListHeaderComponent={HeaderComponent}
                    ListFooterComponent={FooterComponent}
                    SectionSeparatorComponent={(info) =>
                        <CustomSeparatorComponent {...info} text="SECTION 分隔"/>}
                    ItemSeparatorComponent={(info) =>
                        <CustomSeparatorComponent {...info} text="ITEM 分隔"/>}
                    onScroll={this._scrollSinkY}
                    refreshing={false}
                    onRefresh={() => Alert.alert("执行了onRefesh")}
                    renderItem={this._renderItemComponent}
                    renderSectionHeader={renderSectionHeader}
                    renderSectionFooter={renderSectionFooter}
                    stickySectionHeadersEnabled
                    sections={[
                        {
                            key: 'empty section',
                            data: [],
                        },
                        {
                            renderItem: renderStackedItem,
                            key: 's1',
                            data: [
                                {title: 'Item In Header Section', text: 'Section s1', key: 'header item'},
                            ],
                        },
                        {
                            key: 's2',
                            data: [
                                {noImage: true, title: '1st item', text: 'Section s2', key: 'noimage0'},
                                {noImage: true, title: '2nd item', text: 'Section s2', key: 'noimage1'},
                            ],
                        },
                        ...filteredSectionData,
                    ]}
                    style={styles.list}
                    onEndReachedThreshold={0.5}
                    onEndReached={()=>console.log("onEndReached")}
                    viewabilityConfig={{
                        minimumViewTime: 1000,
                        viewAreaCoveragePercentThreshold: 60,
                        waitForInteraction: true,
                    }}
                />
            </TestPage>
        )
    }

    _renderItemComponent = ({item, separators}) => (
        <ItemComponent
            item={item}
            onPress={this._pressItem}
            onHideUnderlay={separators.unhighlight}
            onShowUnderlay={separators.highlight}
        />
    );
    _pressItem = (key: string) => {
        !isNaN(key) && pressItem(this, key);
    };
}

const styles = StyleSheet.create({
    customSeparator: {
        backgroundColor: 'rgb(200, 199, 204)',
    },
    header: {
        backgroundColor: '#e9eaed',
    },
    headerText: {
        padding: 4,
        fontWeight: '600',
    },
    list: {
        backgroundColor: 'white',
    },

    searchRow: {
        paddingHorizontal: 10,
    },
    scrollToRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical:8,
    },
    separatorText: {
        color: 'gray',
        alignSelf: 'center',
        fontSize: 7,
    },
});

module.exports = SectionListExample;