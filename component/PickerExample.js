import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Picker,
    Text,

} from 'react-native'
import TestPage from './TestPage'
import TestBlock from './TestBlock'

class PickerExample extends Component {
    static title = '<Picker>'
    static description = '使用多种方式展示Picker功能'

    constructor(props) {
        super(props)
        this.state = {
            selected1: 'key1',
            selected2: 'key2',
            selected3: 'key3',
            color: 'red',
            node: Picker.MODE_DIALOG
        }
    }

    render() {
        return (
            <TestPage title="<Picker>">
                <TestBlock title="Basic Picker">
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.selected1}
                        onValueChange={this.onValueChange.bind(this, 'selected1')}
                    >
                        <Picker.Item label="Android" value="key0"/>
                        <Picker.Item label="iOS" value="key1"/>
                        <Picker.Item label="Web" value="key2"/>
                    </Picker>
                </TestBlock>
                <TestBlock title="Disabled Picker">
                    <Picker style={styles.picker} enabled={false} selectedValue={this.state.selected1}>
                        <Picker.Item label="Android" value="key0"/>
                        <Picker.Item label="iOS" value="key1"/>
                        <Picker.Item label="Web" value="key2"/>
                    </Picker>
                </TestBlock>
                <TestBlock title="下拉picker">
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.selected2}
                        onValueChange={this.onValueChange.bind(this, 'selected2')}
                        mode="dropdown"
                    >
                        <Picker.Item label="Android" value="key0"/>
                        <Picker.Item label="iOS" value="key1"/>
                        <Picker.Item label="Web" value="key2"/>
                    </Picker>
                </TestBlock>
                <TestBlock title="带提示消息的picker">
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.selected3}
                        onValueChange={this.onValueChange.bind(this, 'selected3')}
                        prompt="请选择平台"
                    >
                        <Picker.Item label="Android" value="key0"/>
                        <Picker.Item label="iOS" value="key1"/>
                        <Picker.Item label="Web" value="key2"/>
                    </Picker>
                </TestBlock>
                <TestBlock title="Picker 没有选择监听">
                    <Picker style={styles.picker}>
                        <Picker.Item label="Android" value="key0"/>
                        <Picker.Item label="iOS" value="key1"/>
                        <Picker.Item label="Web" value="key2"/>
                    </Picker>
                    <Text>
                        不能改变选择值，因为没有更新selectedValue属性
                    </Text>
                </TestBlock>

                <TestBlock title="定义颜色">
                    <Picker style={[styles.picker, {color: '#ee00bb'}]}
                            selectedValue={this.state.color}
                            onValueChange={this.onValueChange.bind(this, 'color')}
                            mode="dropdown"
                    >
                        <Picker.Item label="red" color="red" value="red"/>
                        <Picker.Item label="green" color="green" value="green"/>
                        <Picker.Item label="blue" color="blue" value="blue"/>
                    </Picker>
                    <Picker style={[styles.picker]}
                            selectedValue={this.state.color}
                            onValueChange={this.onValueChange.bind(this, 'color')}
                            mode="dialog"
                    >
                        <Picker.Item label="red" color="red" value="red"/>
                        <Picker.Item label="green" color="green" value="green"/>
                        <Picker.Item label="blue" color="blue" value="blue"/>
                    </Picker>
                </TestBlock>
            </TestPage>
        )
    }

    onValueChange = (key: String, value: String) => {
        const newState = {}
        newState[key] = value;
        this.setState(newState)
    }
}

const styles = StyleSheet.create({
    picker: {
        width: 100,
    }
})
//此时使用export default为什么进入页面报错？
module.exports = PickerExample