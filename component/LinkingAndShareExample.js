/**
 * https://facebook.github.io/react-native/docs/linking.html
 * https://facebook.github.io/react-native/docs/share.html
 */

import React, {Component} from 'react';
import {
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
    Share,
} from 'react-native';
import TestBlock from './TestBlock'
import PropTypes from 'prop-types';

class OpenURLButton extends Component {
    static propTypes = {
        url: PropTypes.string,
        title: PropTypes.string,
    };

    handleClick = () => {
        Linking.canOpenURL(this.props.url).then(supported => {
            if (supported) {
                Linking.openURL(this.props.url);
            } else {
                Alert.alert('不支持打开：' + this.props.url);
            }
        });
    };

    render() {
        return (
            <TouchableOpacity
                onPress={this.handleClick}>
                <View style={styles.button}>
                    <Text style={styles.text}>打开{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

class IntentExample extends Component {
    static title = 'Linking和Share';
    static description = '使用Linking打开一个超链接,使用Share分享';

    render() {
        return (
            <View style={styles.container}>
                <TestBlock title="打开一个链接">
                    <OpenURLButton url={'http://www.jianshu.com/u/d5b531888b2b'} title="打开一个网址"/>
                    <OpenURLButton url={'geo:39.917,116.403'} title="给定经纬度打开地图"/>
                    <OpenURLButton url={'tel:9876543210'} title="拨打电话"/>
                </TestBlock>
                <TestBlock title="分享Share">
                    <TouchableOpacity
                        onPress={this._shareMessage}>
                        <View style={styles.button}>
                            <Text style={styles.text}>点击分享一些文字</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._shareText}>
                        <View style={styles.button}>
                            <Text style={styles.text}>点击分享一些文字,url(仅支持iOS)，以及标题</Text>
                        </View>
                    </TouchableOpacity>
                </TestBlock>
            </View>
        );
    }

    //tintColor,excludedActivityTypes 仅支持iOS
    //dialogTitle:仅支持Android
    //title  没有看到效果?
    _shareText = () => {
        Share.share({
            message: '我是Code4android,很高兴认识你,可以访问我的简书!',
            url: 'http://www.jianshu.com/u/d5b531888b2b',
            title: 'Code4Android分享'
        }, {
            dialogTitle: 'Code4Android分享',
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ],
            tintColor: 'green'
        })
    }
    _shareMessage = () => {
        Share.share({
            message: '我是Code4Android，正在学习ReactNative分享功能，我的简书是http://www.jianshu.com/u/d5b531888b2b'
        })
            .then(this._showResult)
            .catch((error) => this.setState({result: 'error: ' + error.message}));
    }
    //dismissedAction取消分享，IOS
    //activityType(iOS)
    _showResult = (result) => {
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                this.setState({result: 'shared with an activityType: ' + result.activityType});
            } else {
                this.setState({result: 'shared'});
            }
        } else if (result.action === Share.dismissedAction) {
            this.setState({result: 'dismissed'});
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        paddingTop: 30,
    },
    button: {
        padding: 10,
        backgroundColor: '#3B5998',
        marginBottom: 10,
        borderRadius: 5,
    },
    text: {
        color: 'white',
    },
});
module.exports = IntentExample;