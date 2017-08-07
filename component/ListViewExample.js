/**
 * 官方文档对应地址:https://facebook.github.io/react-native/docs/listview.html
 *
 * Code4Android
 * 我的简书:http://www.jianshu.com/u/d5b531888b2b
 * 新浪微博:http://weibo.com/745687294
 * CSDN:http://blog.csdn.net/xiehuimx?viewmode=contents
 */
'use strict'
import React, {Component} from 'react'
import {
    View,
    Image,
    StyleSheet,
    Text,
    ListView,
    TouchableOpacity,
} from 'react-native'
import TestPage from "./TestPage";

const URLS = [
    require('./Thumbnails/like.png'),
    require('./Thumbnails/dislike.png'),
    require('./Thumbnails/call.png'),
    require('./Thumbnails/fist.png'),
    require('./Thumbnails/bandaged.png'),
    require('./Thumbnails/flowers.png'),
    require('./Thumbnails/heart.png'),
    require('./Thumbnails/liking.png'),
    require('./Thumbnails/party.png'),
    require('./Thumbnails/poke.png'),
    require('./Thumbnails/superlike.png'),
    require('./Thumbnails/victory.png'),
];
const textString = 'ListView用于高效的显示一个可以垂直滚动的数据列表，ListView.DataSource的cloneWithRows进行初始化数据，' +
    'onEndReached 列表滚动到距离底部不足onEndReachedThreshold时调用,通过renderHeader设置头部，renderFooter 添加底部等等'

//ListView.DataSource的cloneWithRows进行初始化数据
//onEndReachedThreshold设置滑动到底部的阈值，触发onEndReached
//onEndReached 列表滚动到距离底部不足onEndReachedThreshold时调用
//renderHeader设置头部
//renderFooter 添加底部
//renderRow 渲染每一个item数据
//renderSeparator 分割线
//renderSectionHeader 为每一个section设置粘性标题
class ListViewExample extends Component {
    static title = '<ListView>'
    static description = '可滚动的数据别表'
    _pressData = ({}: { [key: number]: boolean });

    componentWillMount() {
        this._pressData = {};
    }

    constructor(props) {
        super(props)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this._genRows({}))
        }
    }

    _genRows = (pressData: { [key: number]: boolean }): Array<String> => {
        var dataBlob = []
        for (var i = 0; i < 30; i++) {
            var pressedText = pressData[i] ? '(pressed)' : '';
            dataBlob.push('Row ' + i + pressedText)
        }
        return dataBlob;
    }

    render() {
        return <TestPage
            title={this.props.navigator ? null : '<ListView>'}
            noSpacer={true}
            noScroll={true}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                renderSeparator={this._renderSeparator}
            />

        </TestPage>
    }

    _renderRow = (rowData, sectionId, rowId, highlightRow) => {
        var imageSource = URLS[rowId % URLS.length]
        return <TouchableOpacity
            onPress={() => {
                this._pressRow(rowId)
                highlightRow(sectionId,rowId)
            }}
            activeOpacity={0.5}>
            <View style={styles.row}>
                <Image
                    style={styles.thumb}
                    source={imageSource}
                />
                <Text style={styles.text}>
                    {rowData + '-' + textString.substr(0, Math.floor(Math.random() * textString.length) + 10)}
                </Text>
            </View>
        </TouchableOpacity>
    }
    _pressRow = (rowId) => {
        this._pressData[rowId] = !this._pressData[rowId]
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(
                this._genRows(this._pressData)
            )
        })
    }
    _renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#f6f6f6'
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
    }
})
module.exports = ListViewExample