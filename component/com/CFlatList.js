/**
 * @author Code4Android
 * @date  2017/11/12 20:51
 */
import React, {
    Component,
} from 'react'
import {
    FlatList,
    View,
    StyleSheet,
    ActivityIndicator,
    Text
} from 'react-native'
import PropTypes from 'prop-types';

export const FlatListState = {
    IDLE: 0,
    LoadMore: 1,
    Refreshing: 2
};
export default class Com extends Component {
    static propTypes = {
        refreshing: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
        onEndReached: PropTypes.func,
        onRefresh: PropTypes.func
    };
    state = {
        listHeight: 0,
    }

    render() {
        var {ListEmptyComponent, ItemSeparatorComponent} = this.props;
        var refreshing = false;
        var emptyContent = null;
        var separatorComponent = null
        if (ListEmptyComponent) {
            emptyContent = React.isValidElement(ListEmptyComponent) ? ListEmptyComponent : <ListEmptyComponent/>
        } else {
            emptyContent = <Text style={styles.emptyText}>暂无数据下拉刷新</Text>;
        }
        if (ItemSeparatorComponent) {
            separatorComponent = React.isValidElement(ItemSeparatorComponent) ? ItemSeparatorComponent :
                <ItemSeparatorComponent/>
        } else {
            separatorComponent = <View style={{height: 1, backgroundColor: '#D6D6D6'}}/>;
        }
        if (typeof this.props.refreshing === "number") {
            if (this.props.refreshing === FlatListState.Refreshing) {
                refreshing = true
            }
        } else if (typeof this.props.refreshing === "boolean") {
            refreshing = this.props.refreshing
        } else if (typeof this.props.refreshing !== "undefined") {
            refreshing = false
        }
        return <FlatList
            {...this.props}
            onLayout={(e) => {
                let height = e.nativeEvent.layout.height;
                if (this.state.listHeight < height) {
                    this.setState({listHeight: height})
                }
            }
            }
            ListFooterComponent={this.renderFooter}
            onRefresh={this.onRefresh}
            onEndReached={this.onEndReached}
            refreshing={refreshing}
            onEndReachedThreshold={this.props.onEndReachedThreshold || 0.1}
            ItemSeparatorComponent={() => separatorComponent}
            keyExtractor={(item, index) => index}
            ListEmptyComponent={() => <View
                style={{
                    height: this.state.listHeight,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>{emptyContent}</View>}
        />
    }

    onRefresh = () => {
        console.log("FlatList:onRefresh");
        if ((typeof  this.props.refreshing === "boolean" && !this.props.refreshing) ||
            typeof  this.props.refreshing === "number" && this.props.refreshing !== FlatListState.LoadMore &&
            this.props.refreshing !== FlatListState.Refreshing
        ) {
            this.props.onRefresh && this.props.onRefresh()
        }

    };
    onEndReached = () => {
        console.log("FlatList:onEndReached");
        if (typeof  this.props.refreshing === "boolean" || this.props.data.length == 0) {
            return
        }
        if (!this.props.pageSize) {
            console.warn("pageSize must be set");
            return
        }
        if (this.props.data.length % this.props.pageSize !== 0) {
            return
        }
        if (this.props.refreshing === FlatListState.IDLE) {
            this.props.onEndReached && this.props.onEndReached()
        }
    };


    renderFooter = () => {
        let footer = null;
        if (typeof this.props.refreshing !== "boolean" && this.props.refreshing === FlatListState.LoadMore) {
            footer = (
                <View style={styles.footerStyle}>
                    <ActivityIndicator size="small" color="#888888"/>
                    <Text style={styles.footerText}>数据加载中…</Text>
                </View>
            )
        }
        return footer;
    }
}
const styles = StyleSheet.create({
    footerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 44,
    },
    footerText: {
        fontSize: 14,
        color: '#555555',
        marginLeft: 7
    },
    emptyText: {
        fontSize: 17,
        color: '#666666'
    }
})