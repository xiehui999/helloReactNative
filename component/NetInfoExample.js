'use strict';
import React, {Component} from 'react';
import {
    NetInfo,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

//<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
class IsConnected extends Component {
    state = {
        isConnected: null,
    };

    componentDidMount() {
        NetInfo.isConnected.addEventListener('change', this._handleConnectivityChange)
        NetInfo.isConnected.fetch().done(
            (isConnected) => {
                this.setState({isConnected});
            }
        );
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('change', this._handleConnectivityChange)
    }

    _handleConnectivityChange = (isConnected) => {
        this.setState({isConnected})
    }

    render() {
        return (
            <View>
                <Text>{this.state.isConnected ? '当前有网络' : '当前无网络'}</Text>
            </View>
        )
    }
}

/**
 *Android的联网类型：
 *NONE - 设备处于离线状态
 *BLUETOOTH - 蓝牙数据连接
 *DUMMY - 模拟数据连接
 *ETHERNET - 以太网数据连接
 *MOBILE - 移动网络数据连接
 *MOBILE_DUN - 拨号移动网络数据连接
 *MOBILE_HIPRI - 高优先级移动网络数据连接
 *MOBILE_MMS - 彩信移动网络数据连接
 *MOBILE_SUPL - 安全用户面定位（SUPL）数据连接
 *VPN - 虚拟网络连接。需要Android5.0以上
 *WIFI - WIFI数据连接
 *WIMAX - WiMAX数据连接
 *UNKNOWN - 未知数据连接
 *
 * iOS:
 * none,wifi,cell,unknown
 *
 * addEventListener:在网络状况/类型发生变化时调用此监听函数。回调的参数为上面列出的网络状况/类型
 * removeEventListener
 * fetch():返回一个promise，用于获取当前的网络状况/类型。
 * isConnectionExpensive:是否计费
 * isConnected:仅仅关心是否是否联通
 * */
class ConnectionInfoSubscription extends Component {
    state = {
        connectionInfoHistory: [],
        connectionInfo: ''
    };

    componentDidMount() {
        NetInfo.addEventListener('change', this._handleConnectionInfoChange)
        NetInfo.fetch().done(
            (connectionInfo) => {
                const connectionInfoHistory = this.state.connectionInfoHistory;
                connectionInfoHistory.push(connectionInfo)
                this.setState((state) => ({
                    connectionInfo,
                    connectionInfoHistory,
                }));
            }
        );
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('change', this._handleConnectionInfoChange)
    }

    _handleConnectionInfoChange = (connectionInfo) => {
        const connectionInfoHistory = this.state.connectionInfoHistory;
        connectionInfoHistory.push(connectionInfo)
        this.setState({
            connectionInfoHistory,
            connectionInfo,
        });
    }

    render() {
        return (
            <View>
                <Text>当前数据连接类型：{this.state.connectionInfo}</Text>
                <Text>历史连接:{JSON.stringify(this.state.connectionInfoHistory)}</Text>
            </View>
        );
    }
}

class IsConnectionExpensive extends Component {
    state = {
        isConnectionExpensive: null,
    }

    render() {
        return <View>
            <TouchableOpacity
                onPress={() => {
                    NetInfo.isConnectionExpensive().then(
                        isConnectionExpensive => {
                            this.setState({isConnectionExpensive});
                        }
                    );
                }}>
                <View>
                    <Text style={{backgroundColor: '#38adff', padding: 7, borderRadius: 5}}>点击查看数据连接是否收费</Text>
                </View>
            </TouchableOpacity>
            <Text>{this.state.isConnectionExpensive === true ? '收费' :
                this.state.isConnectionExpensive === false ? '不收费'
                    : '未知'}</Text>
        </View>
    }
}

export const title = 'NetInfo';
export const description = '监听网络状态';
export const examples = [{
    title: 'NetInfo.isConnected.addEventListener判断当前是否有网络，参数传change，网络变化是会回调',
    render() {
        return <IsConnected/>
    }
}, {
    title: 'NetInfo.addEventListener获取网络数据连接类型，如WIFI',
    render() {
        return <ConnectionInfoSubscription/>
    }
}, {
    title: 'isConnectionExpensive检测网络是否收费',
    platform: 'android',
    render() {
        return <IsConnectionExpensive/>
    }
}]