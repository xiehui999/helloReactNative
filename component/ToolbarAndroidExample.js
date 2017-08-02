/**
 * 官方文档对应地址:https://facebook.github.io/react-native/docs/toolbarandroid.html
 *
 * Code4Android
 * 我的简书:http://www.jianshu.com/u/d5b531888b2b
 * 新浪微博:http://weibo.com/745687294
 * CSDN:http://blog.csdn.net/xiehuimx?viewmode=contents
 */
'use strict'
import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    Switch
} from 'react-native'
import nativeImageSource from 'nativeImageSource'
import TestPage from './TestPage'
import TestBlock from './TestBlock'

var toolbarActions = [
    {
        title: '创建', icon: nativeImageSource({
        android: 'ic_create_black_48dp',
        width: 96,
        height: 96
    }), show: 'always'
    },
    {title: '删除'},
    {
        title: '设置', icon: nativeImageSource({
        android: 'ic_settings_black_48dp',
        width: 96,
        height: 96
    }), show: 'always'
    },
];

/**
 * ToolbarAndroid：Android平台特有组件
 * title:标题
 * subtitle:子标题
 * actions:设置功能菜单中可用的功能.显示在组件右侧，如果放不下，会放进一个弹出菜单，
 * 值为一个数组，每一个item可以设置title（必须设置）,icon，
 * show:有几种值：always：该item总是显示，ifRoom:如果放的下就显示，never:从不显示(隐藏在弹出菜单内)
 * logo,navIcon,(nativeImageSource对象)
 * onIconClicked:事件监听，监听点击icon
 * onActionSelected：事件监听，监听点击右侧菜单(参数值是点击项position)
 *contentInsetStart和contentInsetEnd设置边距无效果？
 *
 */
class ToolbarAndroidExample extends Component {
    static title = '<ToolbarAndroid>(android)';
    static description = 'Android toolbar使用实例.';
    state = {
        actionText: 'toolbar组件实例',
        toolbarSwitch: false,
        colorProps: {
            titleColor: '#3b5998',
            subtitleColor: '#d4237a',
        }
    }

    render() {
        return (
            <TestPage title="<ToolbarAndroid>">
                <TestBlock title="使用ToolBar的标题/子标题和actions">
                    <ToolbarAndroid
                        actions={toolbarActions}
                        navIcon={
                            nativeImageSource({
                                android: 'ic_menu_black_24dp',
                                width: 48,
                                height: 48
                            })}
                        onActionSelected={this._onActionSelected}
                        onIconClicked={() => this.setState({actionText: 'Icon被点击'})}
                        style={styles.toolbar}
                        subtitle={this.state.actionText}
                        title="Toolbar"
                    />
                    <Text>{this.state.actionText}</Text>
                </TestBlock>
                <TestBlock title="增加logo，自定义标题view(Switch,Text)">
                    <ToolbarAndroid
                        logo={nativeImageSource({
                            android: 'launcher_icon',
                            width: 132,
                            height: 144
                        })}
                        style={styles.toolbar}
                    >
                        <View style={{height: 56, flexDirection: 'row', alignItems: 'center'}}>
                            <Switch
                                value={this.state.toolbarSwitch}
                                onValueChange={(value) => this.setState({'toolbarSwitch': value})}
                            />
                            <Text>我是文本，左边是开关</Text>
                        </View>
                    </ToolbarAndroid>
                </TestBlock>
                <TestBlock title="Toolbar没有icon">
                    <ToolbarAndroid
                        actions={toolbarActions}
                        style={styles.toolbar}
                        subtitle="我是子标题,无Icon"
                    />
                </TestBlock>
                <TestBlock title="有navIcon 和logo,没有title">
                    <ToolbarAndroid
                        actions={toolbarActions}
                        logo={nativeImageSource({
                            android: 'launcher_icon',
                            width: 132,
                            height: 144
                        })}
                        navIcon={nativeImageSource({
                            android: 'ic_menu_black_24dp',
                            width: 48,
                            height: 48
                        })}
                        style={styles.toolbar}
                    />
                </TestBlock>
                <TestBlock title="自定义toolbar标题颜色">
                    <ToolbarAndroid
                        navIcon={nativeImageSource({
                            android: 'ic_menu_black_24dp',
                            width: 48,
                            height: 48
                        })}
                        onIconClicked={() => this.setState({colorProps: {}})}
                        title="我是标题"
                        style={styles.toolbar}
                        subtitle="我是子标题"
                        {...this.state.colorProps} />
                    <Text>
                        点击icon设置标题为默认颜色.
                    </Text>
                </TestBlock>
                <TestBlock title="设置远程图片资源">
                    <ToolbarAndroid
                        actions={[{title: 'Bunny', icon: require('./file/bunny.png'), show: 'always'}]}
                        logo={require('./file/star.png')}
                        navIcon={require('./file/bunny.png')}
                        title="我是标题"
                        style={styles.toolbar}/>
                </TestBlock>
                <TestBlock title="设置功能列表的弹出菜单的图标">
                    <ToolbarAndroid
                        actions={toolbarActions}
                        title="我是标题"
                        overflowIcon={require('./file/uie_thumb_selected.png')}
                        style={styles.toolbar} />
                </TestBlock>
            </TestPage>
        );
    }

    _onActionSelected = (position) => {
        this.setState({
            actionText: '选择了: ' + toolbarActions[position].title,
        });
    };
}

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#e9eaed',
        height: 56,
    },
})

module.exports = ToolbarAndroidExample