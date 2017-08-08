'use strict'
import React, {Component} from 'react'
import {
    Image,
    LayoutAnimation,
    ListView,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    UIManager
} from 'react-native'

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
const textString = ''
const NUM_SECTIONS = 6;
const NUM_ROWS_PER_SECTION = 10;

class ListViewItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            thumbIndex: this._getThumbIdx(),
            dir: 'row'
        }
    }

    _getThumbIdx = () => {
        return Math.floor(Math.random() * URLS.length);
    };

    componentWillMount() {
        UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this._onPressThumb}
                style={[styles.buttonContents, {flexDirection: this.state.dir}]}>
                <Image style={styles.img} source={URLS[this.state.thumbIndex]}/>
                <Image style={styles.img} source={URLS[this.state.thumbIndex]}/>
                <Image style={styles.img} source={URLS[this.state.thumbIndex]}/>
                {this.state.dir === 'column' ?
                    <Text>
                        {this.props.text} 我是一个文本.
                    </Text> :null
                }
            </TouchableOpacity>
        )
    }

    _onPressThumb = () => {
        var config = layoutAnimationConfigs[this.state.thumbIndex % layoutAnimationConfigs.length]
        LayoutAnimation.configureNext(config)
        this.setState({
            thumbIndex: this._getThumbIdx(),
            dir: this.state.dir === 'row' ? 'column' : 'row',
        })
    }
}

//stickySectionHeadersEnabled设置了没有效果？没找到原因,
class ListViewPagingExample extends Component {
    static title = '<ListView> - Paging';
    static description = '给列表增加Header和Footer以及section，实现layout动画';

    constructor(props) {
        super(props)
        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };
        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[rowID];
        };
        var dataSource = new ListView.DataSource({
            getRowData: getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        })
        var dataBlob = {};
        var sectionIDs = [];
        var rowIDs = [];
        for (var ii = 0; ii < NUM_SECTIONS; ii++) {
            var sectionName = 'Section ' + ii;
            sectionIDs.push(sectionName);
            dataBlob[sectionName] = sectionName;
            rowIDs[ii] = [];

            for (var jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
                var rowName = 'S' + ii + ', R' + jj;
                rowIDs[ii].push(rowName);
                dataBlob[rowName] = rowName;
            }
        }

        this.state = {
            dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
            headerPressCount: 0,
        };
    }

    render() {
        return (
            <ListView
                style={styles.listView}
                dataSource={this.state.dataSource}
                onChangeVisibleRows={(visibleRows, changedRows) => console.log({visibleRows, changedRows})}
                renderRow={this._renderRow}
                renderFooter={this._renderFooter}
                initialListSize={10}
                pageSize={1}
                renderSectionHeader={this._renderSectionHeader}
                renderHeader={this._renderHeader}
                scrollRenderAheadDistance={500}
                stickySectionHeadersEnabled
            />
        )
    }

    //定义foorer
    _renderFooter = () => {
        return (
            <View style={styles.header}>
                <Text onPress={() => console.log('Footer!')} style={styles.text}>
                    我是Footer
                </Text>
            </View>
        )
    }
    //自定义header
    _renderHeader = () => {
        var headerLikeText = this.state.headerPressCount % 2 ?
            <View><Text style={styles.text}>点击次数{this.state.headerPressCount}</Text></View> :
            null;
        return (
            <TouchableOpacity onPress={this._onPressHeader} style={styles.header}>
                {headerLikeText}
                <View>
                    <Text style={styles.text}>
                        Header (可以点击)
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
    //header点击回调
    _onPressHeader = () => {
        var config = layoutAnimationConfigs[Math.floor(this.state.headerPressCount / 2) % layoutAnimationConfigs.length];
        LayoutAnimation.configureNext(config);
        this.setState({headerPressCount: this.state.headerPressCount + 1});
    };
    //自定义section
    _renderSectionHeader = (sectionData, sectionID) => {
        return (<View style={styles.section}>
            <Text style={styles.text}>
                {sectionData},{sectionID}
            </Text>
        </View>)
    }
    //每一个item
    _renderRow = (rowData, sectionID, rowID) => {
        return (
            <ListViewItem
                text={rowData}
            />
        )
    }
}

const styles = StyleSheet.create({
    listView: {
        backgroundColor: '#B0C4DE'
    },
    header: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3b5998',
        flexDirection: 'row',
    },
    text: {
        color: '#ffffff',
        paddingHorizontal: 8,
    },
    rowText: {
        color: '#888888'
    },
    thumbText: {
        fontSize: 20,
        color: '#888888',
    },
    buttonContents: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 3,
        padding: 5,
        backgroundColor: '#eaeaea',
        borderRadius: 3,
        paddingVertical: 10,
    },
    img: {
        width: 64,
        height: 64,
        marginHorizontal: 10,
        backgroundColor: 'transparent',
    },
    section: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 6,
        backgroundColor: '#5890ff',
    }
});
const animations = {
    layout: {
        spring: {
            duration: 750,
            create: {
                duration: 300,
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
                type: LayoutAnimation.Types.spring,
                springDamping: 0.4,
            },
        },
        easeInEaseOut: {
            duration: 300,
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.scaleXY,
            },
            update: {
                delay: 100,
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        }
    }
}
var layoutAnimationConfigs = [
    animations.layout.spring,
    animations.layout.easeInEaseOut,
];
module.exports = ListViewPagingExample