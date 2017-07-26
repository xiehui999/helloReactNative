/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule
 */
'use strict';

const React = require('react');
const {
    Platform,
} = require('react-native');
const RNTesterBlock = require('./RNTesterBlock');
const RNTesterPage = require('./RNTesterPage');

class TestExampleContainer extends React.Component {
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

    render(): React.Element<any> {
        console.log(this.props)
        console.log(this.props.module.examples)
        console.log(!this.props.module.examples)
        if (!this.props.module.examples) {
            return <this.props.module/>;
        }

        return (
            <RNTesterPage title={this.props.title}>
                {this.props.module.examples.map(this.renderExample)}
            </RNTesterPage>
        );
    }
}

module.exports = TestExampleContainer;
