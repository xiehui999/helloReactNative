'use strict';
import React, {Component} from 'react'
import {
    ProgressBarAndroid,
    View,
    Text
} from 'react-native'
import TestBlock from './TestBlock'
import TestPage from './TestPage'

class MovingBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progress: 0
        }
    }

    componentDidMount() {
        this.interval = setInterval(
            () => {
                var progress = (this.state.progress + 0.02) % 1;
                this.setState({progress: progress});
            }, 50
        );
    }

    componentWillUnmount() {
        this.interval && clearInterval(this.interval)
    }

    render() {
        var percent=Math.floor(this.state.progress*100)
        return <View>
            <ProgressBarAndroid progress={this.state.progress} {...this.props}/>
            <Text>当前进度值:{percent}%</Text>
        </View>


    }
}

class ProgressBarAndroidExample extends Component {
    static title = '<ProgressBarAndroid>';
    static description = '水平进度条显示一些操作进度.';

    render() {
        return (
            <TestPage title="ProgressBar 例子">
                <TestBlock title="不确定进度的水平进度条">
                    <ProgressBarAndroid styleAttr="Horizontal"/>
                </TestBlock>
                <TestBlock title="不确定进度的水平进度条,自定义颜色(red)">
                    <ProgressBarAndroid styleAttr="Horizontal" color="red"/>
                </TestBlock>
                <TestBlock title="水平蓝色进度条,有进度值,默认颜色">
                    <MovingBar styleAttr="Horizontal" indeterminate={false}/>
                </TestBlock>
                <TestBlock title="水平蓝色进度条,有进度值,自定义颜色">
                    <MovingBar styleAttr="Horizontal" indeterminate={false} color="blue"/>
                </TestBlock>
            </TestPage>
        )
    }
}

module.exports = ProgressBarAndroidExample