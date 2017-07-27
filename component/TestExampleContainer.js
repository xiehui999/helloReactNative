'use strict';
import React, {Component} from 'react';
import {Platform} from 'react-native'
import RNTesterBlock from './RNTesterBlock';
import TestPage from './TestPage';

export  default  class TestExampleContainer extends Component {
    renderExample(example, i) {
        // Filter platform-specific examples
        var {title, description, platform} = example;
        if (platform) {
            if (Platform.OS !== platform) {
                return null;
            }
            title += ' (' + platform + ' only)';
        }
        return (
            <RNTesterBlock
                key={i}
                title={title}
                description={description}>
                {example.render()}
            </RNTesterBlock>
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
