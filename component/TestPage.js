'use strict';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import React, {Component} from "react"
import PropTypes from 'prop-types';
import TestTitle from './TestTitle';
//PropTypes引入方式不要用import React, {PropTypes} from "react",这种方式要不支持了，在debug时chrome控制台会有错误提示
export default class TestPage extends Component {
    props: {
        noScroll?: boolean,
        noSpacer?: boolean,
    };

    static propTypes = {
        noScroll: PropTypes.bool,
        noSpacer: PropTypes.bool,
    };

    render() {
        var ContentWrapper;
        var wrapperProps = {};
        if (this.props.noScroll) {
            ContentWrapper = ((View: any): ReactClass<any>);
        } else {
            ContentWrapper = (ScrollView: ReactClass<any>);
            // $FlowFixMe found when converting React.createClass to ES6
            //  ScrollView插入标题,显示在最上面
            wrapperProps.automaticallyAdjustContentInsets = !this.props.title;
            //never（默认值）:点击TextInput以外的子组件会使当前的软键盘收起。此时子元素不会收到点击事件。
            //always:键盘不会自动收起，ScrollView也不会捕捉点击事件，但子组件可以捕获。
            //handled:当点击事件被子组件捕获时，键盘不会自动收起。这样切换TextInput时键盘可以保持状态。多数带有TextInput的情况下你应该选择此项。
            //false:已过期，请使用’never’代替。
            // true:已过期，请使用’always’代替
            wrapperProps.keyboardShouldPersistTaps = 'handled';

            //用户拖拽滚动视图的时候，是否要隐藏软键盘。
            //none: 滑动ScrollView对键盘没有影响
            // interactive: 软键盘伴随拖拽操作同步地消失，并且如果往上滑动会恢复键盘。安卓设备上 不支持这个选项，会表现的和none一样。
            //on-drag: 滑动ScrollView时，键盘收回
            wrapperProps.keyboardDismissMode = 'interactive';
        }
        var title = this.props.title ?
            <TestTitle title={this.props.title}/> :
            null;
        var spacer = this.props.noSpacer ? null : <View style={styles.spacer}/>;
        return (
            <View style={styles.container}>
                {title}
                <ContentWrapper
                    style={styles.wrapper}
                    {...wrapperProps}>
                    {
                        this.props.children}
                    {spacer}
                </ContentWrapper>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#e9eaed',
        flex: 1,
    },
    spacer: {
        height: 270,
    },
    wrapper: {
        flex: 1,
        paddingTop: 10,
    },
});
