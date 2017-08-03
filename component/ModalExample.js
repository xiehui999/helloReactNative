/**
 * 官方文档对应地址:https://facebook.github.io/react-native/docs/modal.html
 *
 * Code4Android
 * 我的简书:http://www.jianshu.com/u/d5b531888b2b
 * 新浪微博:http://weibo.com/745687294
 * CSDN:http://blog.csdn.net/xiehuimx?viewmode=contents
 */
'use strict'
import React, {Component} from 'react'
import {
    Modal,
    Picker,
    StyleSheet,
    Switch,
    Text,
    Button,
    View
} from 'react-native'

const supportedOrientationsPickerValues = [
    ['portrait'],
    ['landscape'],
    ['landscape-left'],
    ['portrait', 'landscape-right'],
    ['portrait', 'landscape'],
    [],
];

//onRequestClose:点击键盘返回键关闭modal(android)
//onShow:显示时回调
//hardwareAccelerated 硬件加速
//visible:是否显示
//animationType动画类型'none', 'slide', 'fade',默认none
//transparent是否设置透明
//onOrientationChange,presentationStyle,supportedOrientations  这三个ios特有

class ModalExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            transparent: false,
            animationType: 'none',
            currentOrientation: 'unknown',
            modalVisible: false,
            selectedSupportedOrientation: 0,
            presentationStyle: 'fullScreen',
        }
    }

    _setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    };
    _setAnimationType = (type) => {
        this.setState({animationType: type});
    };
    _getActiveButtonStyle = (type): String => {
        return this.state.animationType === type ? '#2196f3' : '#ddd'
    };
    _toggleTransparent = () => {
        this.setState({transparent: !this.state.transparent});
    };

    render() {
        var backgroundColor = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff'
        }
        var innerContainerTransparentStyle = this.state.transparent
            ? {backgroundColor: '#fff', padding: 20}
            : null;
        return (

            <View>
                <Modal
                    animationType={this.state.animationType}
                    presentationStyle={this.state.presentationStyle}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this._setModalVisible(false)}
                    transparent={this.state.transparent}
                    onShow={() => console.log('onShow')}
                    supportedOrientations={supportedOrientationsPickerValues[this.state.selectedSupportedOrientation]}
                    onOrientationChange={evt => this.setState({currentOrientation: evt.nativeEvent.orientation})}
                >
                    <View style={[styles.container, backgroundColor]}>
                        <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                            <Text>{this.state.animationType === 'none' ? '没有' : '有'}动画</Text>
                            <Text>当前显示方向模式{this.state.currentOrientation}</Text>
                            <Button
                                title="关闭"
                                onPress={this._setModalVisible.bind(this, false)}
                                style={styles.modalButton}>
                            </Button>
                        </View>
                    </View>
                </Modal>
                <View style={styles.row}>
                    <Text style={styles.rowTitle}>动画类型</Text>
                    <Button
                        title="none"
                        color={this._getActiveButtonStyle('none')}
                        onPress={this._setAnimationType.bind(this, 'none')}
                    />
                    <Button
                        title="slide"
                        color={this._getActiveButtonStyle('slide')}
                        onPress={this._setAnimationType.bind(this, 'slide')}
                    />
                    <Button
                        title="fade"
                        color={this._getActiveButtonStyle('fade')}
                        onPress={this._setAnimationType.bind(this, 'fade')}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowTitle}>透明属性transparent</Text>
                    <Switch value={this.state.transparent} onValueChange={this._toggleTransparent}/>
                </View>
                <View>
                    <Text style={styles.rowTitle}>(ios)呈现样式属性presentationStyle</Text>
                    <Picker
                        selectedValue={this.state.presentationStyle}
                        onValueChange={(presentationStyle) => this.setState({presentationStyle: presentationStyle})}
                        itemStyle={styles.pickerItem}
                    >
                        <Picker.Item label="fullScreen" value="fullScreen"/>
                        <Picker.Item label="pageSheet" value="pageSheet"/>
                        <Picker.Item label="formSheet" value="formSheet"/>
                        <Picker.Item label="overFullScreen" value="overFullScreen"/>
                        <Picker.Item label="Default presentationStyle" value={null}/>
                    </Picker>
                </View>
                <View>
                    <Text style={styles.rowTitle}>(ios)支持方向</Text>
                    <Picker
                        selectedValue={this.state.selectedSupportedOrientation}
                        onValueChange={(_, i) => this.setState({selectedSupportedOrientation: i})}
                        itemStyle={styles.pickerItem}
                    >
                        <Picker.Item label="Portrait" value={0}/>
                        <Picker.Item label="Landscape" value={1}/>
                        <Picker.Item label="Landscape left" value={2}/>
                        <Picker.Item label="Portrait and landscape right" value={3}/>
                        <Picker.Item label="Portrait and landscape" value={4}/>
                        <Picker.Item label="Default supportedOrientations" value={5}/>
                    </Picker>
                </View>
                <Button
                    title="显示"
                    onPress={this._setModalVisible.bind(this, true)}>
                </Button>
            </View>
        )
    }
}

export const framework = 'React';
export const title = '<Modal>';
export const description = '组件 modal的使用.';
export const examples = [
    {
        title: '弹出框',
        description: 'Modal可以在点击的时候是否显示动画',
        render() {
            return (
                <ModalExample/>
            )
        }
    }
]
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
    },
    row: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },
    rowTitle: {
        flex: 1,
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 5,
        flexGrow: 1,
        height: 44,
        alignSelf: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    buttonText: {
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },
    modalButton: {
        marginTop: 10,
    },
    pickerItem: {
        fontSize: 16,
    },
});
