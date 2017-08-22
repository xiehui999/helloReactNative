import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity
} from 'react-native';
import TestBlock from './TestBlock'

export const title = 'Geolocation';
export const description = '使用该API定位';
export const examples = [{
    title: '获取的位置信息',
    render() {
        return <GeolocationExample/>
    }
}];

/**
 * getCurrentPosition(geo_success, geo_error?, geo_options?):获取位置
 * geo_success(position):成功回调
 * geo_error(error)：失败回调
 * timeout:设置定位超时时间
 * enableHighAccuracy:获取高精度位置。
 * maximumAge:指定最长有效期，重复获取位置时，可以指定多久获取一次位置.
 * watchPosition(success, error?, options?):挡位置发生变化时回调，
 * clearWatch：清楚监听，传入watchID
 *
 */
class GeolocationExample extends Component {
    state = {
        initialPosition: '点击获取位置',
        lastPosition: '暂时未获取位置',
    }
    watchID: ?number = null;

    componentWillUnmount() {
        this.watchID != null && navigator.geolocation.clearWatch(this.watchID)
    }

    render() {
        var description = "getCurrentPosition(geo_success, geo_error?, geo_options?):获取位置, geo_success(position):成功回调" +
            " geo_error(error)：失败回调timeout:设置定位超时时间enableHighAccuracy:获取高精度位置." +
            " maximumAge:指定最长有效期，重复获取位置时，可以指定多久获取一次位置.";
        return (<View>
            <TestBlock title="使用getCurrentPosition获取位置"
                       description={description}>
                <TouchableOpacity
                    onPress={this._getLocation}>
                    <Text style={styles.button}>获取位置</Text>
                </TouchableOpacity>
                <Text>获取的位置:{this.state.initialPosition}</Text>
            </TestBlock>
            <TestBlock title="使用watchPosition持续监听位置"
                       description="每当位置变化，会调用success">
                <TouchableOpacity
                    onPress={this._getWatchPosition}>
                    <Text style={styles.button}>监听位置</Text>
                </TouchableOpacity>
                <Text>获取的位置:{this.state.initialPosition}</Text>
            </TestBlock>
        </View>)
    }

    _getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
                var initialPosition = JSON.stringify(position);
                this.setState({initialPosition})
            }, (error) => Alert.alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 1000})
    }
    _getWatchPosition = () => {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lastPosition = JSON.stringify(position);
            this.setState({lastPosition})
        })
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#38ADFF',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: '#FFF',
        fontSize: 17,
    }
})