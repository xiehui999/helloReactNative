/**
 * 官方文档对应地址:https://facebook.github.io/react-native/docs/refreshcontrol.html
 *
 * Code4Android
 * 我的简书:http://www.jianshu.com/u/d5b531888b2b
 * 新浪微博:http://weibo.com/745687294
 * CSDN:http://blog.csdn.net/xiehuimx?viewmode=contents
 */
'use strict'
import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

class Row extends React.Component {
    _onClick = () => {
        this.props.onClick(this.props.data);
    };

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={this._onClick}>
                <View style={styles.row}>
                    <Text style={styles.text}>
                        {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
//onRefresh刷新时回调
//refreshing bool，再刷新是是否显示指示器
//colors :刷新时指示器的颜色数组(android)。如果是ios使用tintColor 设置颜色
//progressBackgroundColor设置指示器的背景色（android）
//progressViewOffset 设置指示器的垂直起始位置(android React.PropTypes.number)
//size 指定大小（android）RefreshLayoutConsts.SIZE.DEFAULT
//title 给指示器下面设置文字（ios）
class RefreshControlExample extends Component {
    static title = '<RefreshControl>';
    static description = 'scrollview添加下拉刷新功能.';

    constructor(props) {
        super(props)
        this.state = {
            isRefreshing: false,
            loaded: 0,
            rowData: Array.from(new Array(20)).map((val, i) => ({text: 'Initial row ' + i, clicks: 0})),
        };
    }
    _onClick = (row) => {
        row.clicks++;
        this.setState({
            rowData: this.state.rowData,
        });
    };
    render() {
        const rows = this.state.rowData.map((row, ii) => {
            return <Row key={ii} data={row} onClick={this._onClick}/>;
        })
        return (
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                        tintColor="#ff0000"
                        title="Loading..."
                        titleColor="#00ff00"
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="#38adff"
                    />
                }>
                {rows}
            </ScrollView>
        )
    }

    _onRefresh = () => {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            // prepend 10 items
            const rowData = Array.from(new Array(10))
                .map((val, i) => ({
                    text: 'Loaded row ' + (+this.state.loaded + i),
                    clicks: 0,
                }))
                .concat(this.state.rowData);

            this.setState({
                loaded: this.state.loaded + 10,
                isRefreshing: false,
                rowData: rowData,
            });
        }, 3000);
    };
}

const styles = StyleSheet.create({
    row: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 20,
        backgroundColor: '#3a5795',
        margin: 5,
    },
    text: {
        alignSelf: 'center',
        color: '#fff',
    },
    scrollView: {
        flex: 1,
    },
});

module.exports = RefreshControlExample