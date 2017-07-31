'use strict';
import React, {Component} from 'react';
import {Platform} from 'react-native'
import TestBlock from './TestBlock';
import TestPage from './TestPage';

export default class TestExampleContainer extends Component {
    //展示当前页面每一个demo
    renderExample(example, i) {
        var {title, description, platform} = example;
        //过滤指定平台显示的例子
        if (platform) {
            if (Platform.OS !== platform) {
                return null;
            }
            title += ' (' + platform + ' only)';
        }
        return (
            <TestBlock
                key={i}
                title={title}
                description={description}>
                {example.render()}
            </TestBlock>
        );
    }

    //  render(): React.Element<any> 区别
    render() {
        if (!this.props.module.examples) {

            return <this.props.module/>;
        }

        return (
            <TestPage title={this.props.title}>
                {this.props.module.examples.map(this.renderExample)}
            </TestPage>
        );
    }
}
