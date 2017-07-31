import React, {Component} from 'react'
import {
    View,
    Switch,
    Text,
} from 'react-native'

class BasicSwitchExample extends Component {
    state = {
        trueSwitchIsOn: true,
        falseSwitchIsOn: false,
    }

    render() {
        return (
            <View>
                <Switch
                    onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
                    style={{marginBottom: 10}}
                    value={this.state.falseSwitchIsOn}
                />
                <Switch
                    onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
                    value={this.state.trueSwitchIsOn}
                />
            </View>
        )
    }
}

class DisabledSwitchExample extends Component {
    render() {
        return (
            <View>
                <Switch
                    disabled={true}
                    style={{marginBottom: 10}}
                    value={true}
                />
                <Switch
                    disabled={true}
                    value={false}/>
            </View>
        )
    }
}

class EventSwitchExample extends Component {
    state = {
        eventSwitchIsOn: false,
        eventSwitchRegressionIsOn: true,
    }

    render() {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View>
                    <Switch
                        onValueChange={(value) => this.setState({eventSwitchIsOn: value})}
                        style={{marginBottom: 10}}
                        value={this.state.eventSwitchIsOn}
                    />
                    <Switch
                        onValueChange={(value) => this.setState({eventSwitchIsOn: value})}
                        style={{marginBottom: 10}}
                        value={this.state.eventSwitchIsOn}/>
                    <Text>{this.state.eventSwitchIsOn ? 'On' : 'Off'}</Text>
                </View>
                <View>
                    <Switch
                        onValueChange={(value) => this.setState({eventSwitchRegressionIsOn: value})}
                        style={{marginBottom: 10}}
                        value={this.state.eventSwitchRegressionIsOn}/>
                    <Switch
                        onValueChange={(value) => this.setState({eventSwitchRegressionIsOn: value})}
                        style={{marginBottom: 10}}
                        value={this.state.eventSwitchRegressionIsOn}/>
                    <Text>{this.state.eventSwitchRegressionIsOn ? 'On' : 'Off'}</Text>
                </View>
            </View>
        )
    }
}

class ColorSwitchExample extends Component {
    state = {
        colorTrueSwitchIsOn: true,
        colorFalseSwitchIsOn: false,
    };

    render() {

        //thumbTintColr true时按钮前色
        //tintColor false没选中背景色.
        //onTintColor true 选中背景色
        return (
            <View>
                <Switch
                    onValueChange={(value) => this.setState({colorFalseSwitchIsOn: value})}
                    onTintColor="#00ff00"
                    style={{marginBottom: 10}}
                    thumbTintColor="#0000ff"
                    tintColor="#ff0000"
                    value={this.state.colorFalseSwitchIsOn}/>
                <Switch
                    onValueChange={(value) => this.setState({colorTrueSwitchIsOn: value})}
                    onTintColor="#00ff00"
                    thumbTintColor="#0000ff"
                    tintColor="#ff0000"
                    value={this.state.colorTrueSwitchIsOn}/>
            </View>
        )
    }
}

export const title = '<Switch>';
export const displayName = 'SwitchExample';
export const description = 'Native boolean input';
export const examples = [
    {
        title: '默认开关',
        render() {
            return <Switch/>
        }
    },
    {
        title: '开关按钮设置true 或者false',
        render() {
            return <BasicSwitchExample/>
        }
    }, {
        title: '开关按钮不可点击',
        render() {
            return <DisabledSwitchExample/>
        }
    }, {
        title: '能检测开关事件',
        render() {
            return <EventSwitchExample/>
        }
    }, {
        title: '自定义开关颜色',
        render() {
            return <ColorSwitchExample/>
        }
    }];