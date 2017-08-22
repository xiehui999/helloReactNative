import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Picker,
    View,
    ToastAndroid,
    PermissionsAndroid,
    TouchableNativeFeedback
} from 'react-native';
import TestBlock from './TestBlock';
import TestPage from "./TestPage";

class PermissionsExampleAndroid extends Component {
    static title = 'Toast和PermissionsAndroid';
    static description = 'Android权限动态申请(API 23+)和Toast';
    state = {
        permission: PermissionsAndroid.PERMISSIONS.CAMERA,
        hasPermission: '没有检测',
    }

    render() {
        return (
            <TestPage>
                <TestBlock title="Toast">
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
                        onPress={() => {
                            ToastAndroid.show('我是Toast.show，持续的时间SHORT', ToastAndroid.SHORT)
                        }}>
                        <View style={styles.button}><Text style={styles.text}>点击我显示(SHORT)</Text></View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
                        onPress={() => {
                            ToastAndroid.show('我是Toast.show，持续的时间LONG', ToastAndroid.LONG)
                        }}>
                        <View style={styles.button}><Text style={styles.text}>点击我显示(LONG)</Text></View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
                        onPress={() => {
                            ToastAndroid.showWithGravity('我是Toast.show，持续的时间LONG', ToastAndroid.LONG, ToastAndroid.CENTER,)
                        }}>
                        <View style={styles.button}><Text style={styles.text}>showWithGravity,可以指定显示位置,此处指定CENTER,有TOP，BOTTOM</Text></View>
                    </TouchableNativeFeedback>
                </TestBlock>
                <TestBlock title="权限请求">
                    <Text>选择要申请的权限</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.permission}
                        onValueChange={this._onSelectPermission}>
                        <Picker.Item label='照相权限 CAMERA'
                                     value={PermissionsAndroid.PERMISSIONS.CAMERA}/>
                        <Picker.Item label='读取联系人权限 READ_CONTACTS'
                                     value={PermissionsAndroid.PERMISSIONS.READ_CONTACTS}/>
                        <Picker.Item label='写联系人权限 WRITE_CONTACTS'
                                     value={PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS}/>
                        <Picker.Item label='存储卡权限 WRITE_EXTERNAL_STORAGE'
                                     value={PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE}/>
                        <Picker.Item label="获取位置权限 ACCESS_FINE_LOCATION"
                                     value={PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION}/>
                        <Picker.Item label="录音权限 RECORD_AUDIO"
                                     value={PermissionsAndroid.PERMISSIONS.RECORD_AUDIO}/>
                    </Picker>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
                        onPress={this._checkPermission}
                    >
                        <View style={styles.button}><Text style={styles.text}>检测权限</Text></View>
                    </TouchableNativeFeedback>
                    <Text style={{marginTop: 10, fontSize: 15}}>Permission Status: {this.state.hasPermission}</Text>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
                        onPress={this._requestPermission}>
                        <View style={styles.button}><Text style={styles.text}>请求权限</Text></View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
                        onPress={this._requestMultiPermission}>
                        <View style={styles.button}><Text
                            style={styles.text}>一次请求多个权限(CAMERA,READ_CONTACTS)</Text></View>
                    </TouchableNativeFeedback>
                </TestBlock>
            </TestPage>
        )
    }

    _requestMultiPermission = async () => {
        const result = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.READ_CONTACTS])
        console.log(result)
    }
    _requestPermission = async () => {
        const result = await PermissionsAndroid.request(this.state.permission, {
            title: '权限说明',
            message: '该应用需要权限' + this.state.permission + '为了更好体验，请允许.'
        });
        console.log(result)
        this.setState({
            hasPermission: result ? '请求时允许了权限' : '请求时拒绝了权限',
        })
    }
    _checkPermission = async () => {
        //如果api小于23,返回true
        const result = await PermissionsAndroid.check(this.state.permission);
        console.log(result)
        this.setState({
            hasPermission: (result ? '具有权限：' : '不具有权限：') + this.state.permission,
        })
    }
    _onSelectPermission = (value) => {
        console.log(value)
        this.setState({
            permission: value,
            hasPermission: '没有检测',
        })
    }
}

const styles = StyleSheet.create({
    button: {
        padding: 7,
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: '#38ADFF',
    },
    text: {
        color: '#fff',
        fontSize: 17,
    }
})
module.exports = PermissionsExampleAndroid;