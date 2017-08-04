import React, {Component} from 'react'
import {
    View,
    TouchableHighlight,
    SwipeableListView,
    StyleSheet,
    Image,
    Text,
    Alert
} from 'react-native'
import TestPage from './TestPage'

var images_url = [
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
var text = 'maxSwipDistance:滑动的最大距离renderQuickActions:滑动后要显示的内容renderRow:定义每一行的布局renderSeparator定义分割线';
//maxSwipDistance:滑动的最大距离，必须设置，如果不设置默认为0，将无侧滑效果
//renderQuickActions:滑动（侧滑）后要显示的内容
//renderRow:行的item
//renderSeparator定义分割线
class SwipeableListViewSimpleExample extends Component {
    constructor(props) {
        super(props)
        console.log('constructor')
        this.state = {
            dataSource: SwipeableListView.getNewDataSource().cloneWithRowsAndSections(...this._genDataSource())
        }
        console.log(this.state.dataSource)
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    render() {
        return (<TestPage
            noScroll={true}
            noSpacer={true}>
            <SwipeableListView
                dataSource={this.state.dataSource}
                maxSwipeDistance={100}
                renderQuickActions={
                    (rowData: Object, sectionID: String, rowId: String) => {
                        return (
                            <View style={styles.actionsContainer}>
                                <TouchableHighlight
                                    underlayColor="#ff0000"
                                    onPress={() => {
                                        console.log(sectionID)
                                        console.log(rowId)
                                        Alert.alert('提醒', '操作了数据' + rowData.text)
                                    }}>
                                    <Text style={{padding: 10}}>
                                        删除
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        )
                    }
                }
                renderRow={this._renderRow}
                renderSeparator={this._renderSeperator}
            />
        </TestPage>)
    }

    _renderRow = (rowData: Object,sectionID: number, rowID:number, highlightRow: (sectionID: number, rowID: number) => void) => {
        var imgSource = images_url[rowData.id % images_url.length];
        return (
            <TouchableHighlight
                onPress={() => {
                }}>
                <View>
                    <View style={styles.row}>
                        <Image style={styles.thumb} source={imgSource}/>
                        <Text style={styles.text}>
                            数据:{rowData.id + ' - ' + text.substr(0, Math.floor(Math.random() * text.length) + 10)}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    _renderSeperator = (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#333998' : '#6B6998',
                }}
            />
        );
    }
    _genDataSource = (): Array<any> => {
        var dataBlob = {};
        var sectionIDs = ['Section 0'];
        /**
         * dataBlob example below:
         {
           'Section 0': {
             'Row 0': {
               id: '0',
               text: 'row 0 text'
             },
             'Row 1': {
               id: '1',
               text: 'row 1 text'
             }
           }
         }
         */
        // only one section in this example
        dataBlob['Section 0'] = {};
        for (var ii = 0; ii < 30; ii++) {
            dataBlob[sectionIDs[0]]['Row ' + ii] = {id: ii, text: 'Row ' + ii};
        }
        return [dataBlob];
    }
}

export const title = '<SwipeableListView>';
export const description = '组件SwipeableListView的使用'
export const examples = [{
    title: '可滑动,滚动的加载数据列表组件',
    render() {
        return <SwipeableListViewSimpleExample/>
    }
}]

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
    },
    actionsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});