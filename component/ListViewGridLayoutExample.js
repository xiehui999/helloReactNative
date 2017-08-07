'use strict'
import React, {Component} from 'react'
import {
    Image,
    ListView,
    TouchableOpacity,
    StyleSheet,
    Text,
    View
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
const textString = 'contentContainerStyle:式会应用到一个内层的内容容器上，所有的子视图都会包裹在内容容器内,initialListSize:在组件刚挂载的时候渲染多少行数据。用这个属性来确保首屏显示合适数量的数据' +
    'pageSize :每次事件循环（每帧）渲染的行数,scrollRenderAheadDistance:当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行'
var lastPosition = -1;
var size = 0;
//contentContainerStyle:式会应用到一个内层的内容容器上，所有的子视图都会包裹在内容容器内,
//initialListSize:在组件刚挂载的时候渲染多少行数据。用这个属性来确保首屏显示合适数量的数据
//pageSize :每次事件循环（每帧）渲染的行数,
//scrollRenderAheadDistance:当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行'


class ListViewGridLayoutExample extends Component {
    static title = '<ListView> - Grid Layout';
    static description = 'Flexbox grid layout';
    _pressData = ({}: { [key: number]: boolean })

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
        var dataBlob = [];
        for (var i = 0; i < 30; i++) {
            var pressedText = pressData[i] ? 'pressed' : '';
            dataBlob.push('Cell' + i + pressedText);
        }
        return dataBlob;
    }

    render() {
        return (
            <ListView
                contentContainerStyle={styles.list}
                dataSource={this.state.dataSource}
                initialListSize={21}
                onEndReachedThreshold={30}
                pageSize={3}
                scrollRenderAheadDistance={500}
                onEndReached={this._onEndReached}
                onChangeVisibleRows={this._onChangeVisibleRows}
                renderRow={this._renderRow}
            />
        )
    }

    _onEndReached = () => {
        console.log('_onEndReached');
    }
    _onChangeVisibleRows = (visibleRows, changedRows) => {
        console.log('visibleRows:' + visibleRows + '  changedRows:' + changedRows);
    }
    _renderRow = (rowData, sectionID, rowID) => {
        var imageSource = URLS[rowID % URLS.length];
        if (rowID === lastPosition) {
            imageSource = URLS[Math.floor(Math.random() * 20) % URLS.length]
        }
        console.log()
        if (rowID == this.state.dataSource.getRowCount() - 1) {
            lastPosition = -1;
        }
        return (
            <TouchableOpacity
                onPress={() => this._pressRow(rowID)}
                activeOpacity={0.5}>
                <View style={styles.row}>
                    <Image
                        style={styles.thumb}
                        source={imageSource}
                    />
                    <Text style={styles.text}>
                        {rowData}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    _pressRow = (rowId) => {
        this._pressData[rowId] = !this._pressData[rowId];
        lastPosition = rowId;
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this._genRows(this._pressData))
        })
    }
}

const styles = StyleSheet.create({
    list: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    row: {
        justifyContent: 'center',
        padding: 5,
        margin: 3,
        width: 100,
        height: 100,
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
        marginTop: 5,
        fontWeight: 'bold'
    }
})
module.exports = ListViewGridLayoutExample